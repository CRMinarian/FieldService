#!/usr/bin/env python3
import argparse
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

PUBLISHED_DIRS = {"decks", "diagrams", "frameworks", "references", "lexicon"}
VERSION_PATTERN = re.compile(r"-v\d+(\.\d+)?\b", re.IGNORECASE)

def run(cmd, check=True, capture=True):
    result = subprocess.run(
        cmd,
        cwd=REPO_ROOT,
        text=True,
        capture_output=capture
    )
    if check and result.returncode != 0:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        raise SystemExit(result.returncode)
    return result.stdout.strip()

def git_status_porcelain():
    return run(["git", "status", "--porcelain"], check=True)

def parse_status_lines(porcelain: str):
    # Returns list of tuples: (xy, path)
    lines = [ln for ln in porcelain.splitlines() if ln.strip()]
    parsed = []
    for ln in lines:
        xy = ln[:2]
        path = ln[3:].strip()
        parsed.append((xy, path))
    return parsed

def is_under_published_dir(path_str: str) -> bool:
    p = Path(path_str)
    if not p.parts:
        return False
    return p.parts[0] in PUBLISHED_DIRS

def looks_like_rename(xy: str) -> bool:
    return "R" in xy  # R in either index or working tree

def looks_like_delete(xy: str) -> bool:
    return "D" in xy

def looks_like_modify(xy: str) -> bool:
    return "M" in xy

def looks_like_add(xy: str) -> bool:
    return "A" in xy or xy == "??"

def enforce_no_renames_or_deletes(changes):
    offenders = []
    for xy, path in changes:
        if looks_like_rename(xy) or looks_like_delete(xy):
            offenders.append((xy, path))
    if offenders:
        print("\nBlocked: renames/deletes detected (public repo safety rule).")
        for xy, path in offenders:
            print(f"  {xy}  {path}")
        print("\nFix: add a new versioned file instead of renaming/deleting.")
        raise SystemExit(2)

def enforce_no_modifying_published(changes, allow_modify=False):
    if allow_modify:
        return
    offenders = []
    for xy, path in changes:
        if looks_like_modify(xy) and is_under_published_dir(path):
            offenders.append((xy, path))
    if offenders:
        print("\nBlocked: modifications to already-published assets detected.")
        for xy, path in offenders:
            print(f"  {xy}  {path}")
        print("\nFix: create a new file version (e.g., -v2) instead of editing in place.")
        print("Or run with --allow-modify if you truly intend to revise a published artifact.")
        raise SystemExit(3)

def enforce_version_naming_for_new_files(changes, force=False):
    offenders = []
    for xy, path in changes:
        if looks_like_add(xy) and is_under_published_dir(path):
            name = Path(path).name
            # Allow markdown indexes and readmes without -v#
            if name.lower().endswith(".md"):
                continue
            # Require -v# for published binary-ish assets
            if not VERSION_PATTERN.search(name):
                offenders.append(path)
    if offenders and not force:
        print("\nBlocked: new published files missing version tag like -v1, -v2, etc.")
        for p in offenders:
            print(f"  {p}")
        print("\nFix: rename file to include -v1 (example: My-Deck-v1.pptx)")
        print("Or run with --force to bypass (not recommended).")
        raise SystemExit(4)

def build_commit_message(changes, custom=None):
    if custom:
        return custom
    added = [p for xy, p in changes if looks_like_add(xy)]
    touched = [p for xy, p in changes if looks_like_modify(xy)]
    ts = datetime.now().strftime("%Y-%m-%d")
    parts = []
    if added:
        parts.append(f"Publish {len(added)} asset(s)")
    if touched:
        parts.append(f"Update {len(touched)} file(s)")
    if not parts:
        parts.append("Update repository content")
    # Keep it short
    msg = " · ".join(parts) + f" ({ts})"
    return msg

def main():
    ap = argparse.ArgumentParser(description="One-command publishing for the FieldService knowledge base.")
    ap.add_argument("-m", "--message", help="Commit message override")
    ap.add_argument("--allow-modify", action="store_true", help="Allow modifying existing published assets")
    ap.add_argument("--force", action="store_true", help="Bypass version-name enforcement for new assets")
    ap.add_argument("--skip-index", action="store_true", help="Skip running tools/update-index.py")
    args = ap.parse_args()

    # Basic sanity
    run(["git", "rev-parse", "--is-inside-work-tree"])

    porcelain_before = git_status_porcelain()
    if not porcelain_before.strip():
        print("Nothing to publish. Working tree is clean.")
        return

    changes = parse_status_lines(porcelain_before)

    enforce_no_renames_or_deletes(changes)
    enforce_no_modifying_published(changes, allow_modify=args.allow_modify)
    enforce_version_naming_for_new_files(changes, force=args.force)

    # Update index (if present)
    if not args.skip_index:
        idx_script = REPO_ROOT / "tools" / "update-index.py"
        if idx_script.exists():
            print("Updating indexes...")
            run([sys.executable, str(idx_script)], check=True, capture=True)
        else:
            print("Note: tools/update-index.py not found. Skipping index update.")

    # Recompute changes after index update
    porcelain_after = git_status_porcelain()
    changes_after = parse_status_lines(porcelain_after)
    if not changes_after:
        print("Nothing to publish after index update.")
        return

    msg = build_commit_message(changes_after, custom=args.message)

    print("Staging changes...")
    run(["git", "add", "."], check=True)

    print(f"Committing: {msg}")
    run(["git", "commit", "-m", msg], check=True)

    print("Pushing...")
    run(["git", "push"], check=True, capture=False)

    print("\nPublished successfully.")

if __name__ == "__main__":
    main()
