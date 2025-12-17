#!/usr/bin/env python3
"""
Notion to GitHub Sync
Syncs published posts from Notion Content Pipeline database to Jekyll-compatible markdown.

Uses requests directly to avoid notion-client version issues.

Database ID: b04bfdf3-554e-4a56-bdb9-25ec1f414334
Repository: CRMinarian/FieldService
"""

import os
import re
import requests
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

# Repository root (parent of tools/)
REPO_ROOT = Path(__file__).resolve().parents[1]

# Notion API configuration
NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
DATABASE_ID = os.environ.get("NOTION_DATABASE_ID", "b04bfdf3-554e-4a56-bdb9-25ec1f414334")
NOTION_API_URL = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"

if not NOTION_TOKEN:
    print("Error: NOTION_TOKEN environment variable not set")
    raise SystemExit(1)

# Headers for Notion API
HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": NOTION_VERSION
}

# Output directory mapping by content type
OUTPUT_DIRS = {
    "Blog": "_posts",
    "Presentation": "decks",
    "Resource": "references",
    "Book Summary": "references",
    "Framework": "frameworks",
}


def slugify(text: str) -> str:
    """Convert title to URL-safe slug"""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def extract_text(rich_text_array: List[Dict]) -> str:
    """Extract plain text from Notion rich text array"""
    if not rich_text_array:
        return ""
    return ''.join([text.get('plain_text', '') for text in rich_text_array])


def get_property_value(properties: Dict, prop_name: str, prop_type: str) -> Any:
    """Safely extract property value from Notion properties"""
    prop = properties.get(prop_name, {})
    
    if prop_type == 'title':
        return extract_text(prop.get('title', []))
    elif prop_type == 'rich_text':
        return extract_text(prop.get('rich_text', []))
    elif prop_type == 'select':
        select = prop.get('select')
        return select.get('name', '') if select else ''
    elif prop_type == 'multi_select':
        return [item.get('name', '') for item in prop.get('multi_select', [])]
    elif prop_type == 'date':
        date = prop.get('date')
        return date.get('start', '') if date else ''
    elif prop_type == 'checkbox':
        return prop.get('checkbox', False)
    elif prop_type == 'url':
        return prop.get('url', '')
    return ''


def get_block_children(block_id: str) -> List[Dict]:
    """Get children blocks of a block/page"""
    url = f"{NOTION_API_URL}/blocks/{block_id}/children"
    response = requests.get(url, headers=HEADERS)
    
    if response.status_code != 200:
        print(f"  ⚠️ Failed to get blocks: {response.status_code}")
        return []
    
    return response.json().get('results', [])


def notion_blocks_to_markdown(blocks: List[Dict]) -> str:
    """Convert Notion blocks to Markdown"""
    markdown_lines = []
    
    for block in blocks:
        block_type = block.get('type')
        
        if block_type == 'paragraph':
            text = extract_text(block['paragraph'].get('rich_text', []))
            if text:
                markdown_lines.append(f"{text}\n")
            else:
                markdown_lines.append("\n")
        
        elif block_type == 'heading_1':
            text = extract_text(block['heading_1'].get('rich_text', []))
            markdown_lines.append(f"# {text}\n")
        
        elif block_type == 'heading_2':
            text = extract_text(block['heading_2'].get('rich_text', []))
            markdown_lines.append(f"## {text}\n")
        
        elif block_type == 'heading_3':
            text = extract_text(block['heading_3'].get('rich_text', []))
            markdown_lines.append(f"### {text}\n")
        
        elif block_type == 'bulleted_list_item':
            text = extract_text(block['bulleted_list_item'].get('rich_text', []))
            markdown_lines.append(f"- {text}")
        
        elif block_type == 'numbered_list_item':
            text = extract_text(block['numbered_list_item'].get('rich_text', []))
            markdown_lines.append(f"1. {text}")
        
        elif block_type == 'code':
            text = extract_text(block['code'].get('rich_text', []))
            language = block['code'].get('language', '')
            markdown_lines.append(f"```{language}\n{text}\n```\n")
        
        elif block_type == 'quote':
            text = extract_text(block['quote'].get('rich_text', []))
            markdown_lines.append(f"> {text}\n")
        
        elif block_type == 'divider':
            markdown_lines.append("\n---\n")
        
        elif block_type == 'callout':
            text = extract_text(block['callout'].get('rich_text', []))
            icon = block['callout'].get('icon', {})
            emoji = icon.get('emoji', '💡') if icon else '💡'
            markdown_lines.append(f"\n> {emoji} **Note:** {text}\n")
        
        elif block_type == 'toggle':
            text = extract_text(block['toggle'].get('rich_text', []))
            markdown_lines.append(f"\n<details>\n<summary>{text}</summary>\n")
            if block.get('has_children'):
                try:
                    children = get_block_children(block['id'])
                    child_md = notion_blocks_to_markdown(children)
                    markdown_lines.append(child_md)
                except Exception:
                    pass
            markdown_lines.append("</details>\n")
        
        elif block_type == 'image':
            image_data = block.get('image', {})
            image_type = image_data.get('type', '')
            url = ''
            if image_type == 'external':
                url = image_data.get('external', {}).get('url', '')
            elif image_type == 'file':
                url = image_data.get('file', {}).get('url', '')
            caption = extract_text(image_data.get('caption', []))
            if url:
                markdown_lines.append(f"\n![{caption}]({url})\n")
        
        elif block_type == 'bookmark':
            url = block['bookmark'].get('url', '')
            caption = extract_text(block['bookmark'].get('caption', []))
            markdown_lines.append(f"\n[{caption or url}]({url})\n")
    
    return '\n'.join(markdown_lines)


def get_published_posts() -> List[Dict]:
    """Query Notion database for published posts"""
    url = f"{NOTION_API_URL}/databases/{DATABASE_ID}/query"
    
    payload = {
        "filter": {
            "property": "Status",
            "select": {
                "equals": "Published"
            }
        }
    }
    
    response = requests.post(url, headers=HEADERS, json=payload)
    
    if response.status_code != 200:
        print(f"Error querying database: {response.status_code}")
        print(response.text)
        return []
    
    return response.json().get('results', [])


def create_markdown_file(page: Dict) -> Optional[Path]:
    """Convert Notion page to markdown file"""
    props = page.get('properties', {})
    page_id = page.get('id', '')
    
    # Extract properties
    title = get_property_value(props, 'Title', 'title')
    post_type = get_property_value(props, 'Type', 'select')
    tags = get_property_value(props, 'Tags', 'multi_select')
    excerpt = get_property_value(props, 'Excerpt', 'rich_text')
    slug = get_property_value(props, 'Slug', 'rich_text')
    pub_date_str = get_property_value(props, 'Published Date', 'date')
    featured = get_property_value(props, 'Featured', 'checkbox')
    
    if not title:
        print(f"  ⚠️ Skipping page {page_id}: no title")
        return None
    
    # Handle date
    if pub_date_str:
        try:
            pub_date = datetime.fromisoformat(pub_date_str.replace('Z', '+00:00'))
        except ValueError:
            pub_date = datetime.now()
    else:
        created_time = page.get('created_time', '')
        if created_time:
            try:
                pub_date = datetime.fromisoformat(created_time.replace('Z', '+00:00'))
            except ValueError:
                pub_date = datetime.now()
        else:
            pub_date = datetime.now()
    
    # Generate slug if not provided
    if not slug:
        slug = slugify(title)
    
    # Get page content (blocks)
    blocks = get_block_children(page_id)
    content = notion_blocks_to_markdown(blocks)
    
    # Determine output directory
    output_dir = OUTPUT_DIRS.get(post_type, "_posts")
    output_path = REPO_ROOT / output_dir
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Build frontmatter
    tags_yaml = '\n'.join([f'  - "{tag}"' for tag in tags]) if tags else '  - "Field Service"'
    
    # Escape quotes in title and excerpt for YAML
    safe_title = title.replace('"', '\\"')
    safe_excerpt = excerpt.replace('"', '\\"')
    
    frontmatter = f"""---
layout: post
title: "{safe_title}"
date: {pub_date.strftime('%Y-%m-%d')}
author: "Pierre Hulsebus"
excerpt: "{safe_excerpt}"
featured: {str(featured).lower()}
tags:
{tags_yaml}
notion_id: "{page_id}"
---

"""
    
    # Create filename
    date_prefix = pub_date.strftime('%Y-%m-%d')
    
    # For blog posts, use Jekyll date-slug format
    if output_dir == "_posts":
        filename = f"{date_prefix}-{slug}.md"
    else:
        # For other types, just use the slug
        filename = f"{slug}.md"
    
    filepath = output_path / filename
    
    # Write file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter + content)
    
    return filepath


def update_notion_sync_status(page_id: str, github_url: str) -> None:
    """Update the Notion page to mark it as synced"""
    url = f"{NOTION_API_URL}/pages/{page_id}"
    
    payload = {
        "properties": {
            "GitHub Synced": {"checkbox": True},
            "GitHub URL": {"url": github_url}
        }
    }
    
    try:
        response = requests.patch(url, headers=HEADERS, json=payload)
        if response.status_code != 200:
            print(f"  ⚠️ Could not update Notion sync status: {response.status_code}")
    except Exception as e:
        print(f"  ⚠️ Could not update Notion sync status: {e}")


def main() -> None:
    """Main sync function"""
    print("=" * 60)
    print("🔄 Notion → GitHub Sync")
    print("=" * 60)
    print(f"📁 Repository: {REPO_ROOT}")
    print(f"📊 Database ID: {DATABASE_ID}")
    print()
    
    # Get published posts from Notion
    print("Fetching published content from Notion...")
    posts = get_published_posts()
    print(f"📄 Found {len(posts)} published item(s)")
    print()
    
    if not posts:
        print("✅ Nothing to sync.")
        return
    
    # Process each post
    synced_files = []
    
    for post in posts:
        title = get_property_value(post.get('properties', {}), 'Title', 'title')
        page_id = post.get('id', '')
        print(f"📝 Processing: {title}")
        
        try:
            filepath = create_markdown_file(post)
            if filepath:
                rel_path = filepath.relative_to(REPO_ROOT)
                print(f"   ✅ Created: {rel_path}")
                synced_files.append(rel_path)
                
                # Update Notion with GitHub URL
                github_url = f"https://github.com/CRMinarian/FieldService/blob/main/{rel_path}"
                update_notion_sync_status(page_id, github_url)
        
        except Exception as e:
            print(f"   ❌ Error: {e}")
            import traceback
            traceback.print_exc()
    
    print()
    print("=" * 60)
    print(f"✨ Sync complete! {len(synced_files)} file(s) created/updated.")
    print("=" * 60)
    
    if synced_files:
        print("\nFiles ready for commit:")
        for f in synced_files:
            print(f"  • {f}")


if __name__ == "__main__":
    main()
