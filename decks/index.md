---
layout: default
title: Decks
---

# Decks

Published presentation assets (PPTX/PDF). This page auto-lists whatever is in this folder, so you don’t have to babysit it.

{% assign folder = "/decks/" %}
{% assign files = site.static_files | where_exp: "f", "f.path contains folder" %}

{% if files.size > 0 %}
## Files

<ul>
{% for f in files %}
  {% unless f.path contains "/.gitkeep" %}
    {% assign ext = f.extname | downcase %}
    {% if ext == ".pdf" or ext == ".pptx" or ext == ".png" or ext == ".svg" or ext == ".jpg" or ext == ".jpeg" %}
      <li>
        <a href="{{ f.path | relative_url }}">{{ f.name }}</a>
        <small>({{ ext | remove: "." | upcase }})</small>
      </li>
    {% endif %}
  {% endunless %}
{% endfor %}
</ul>
{% else %}
_No files here yet. This folder is currently a beautifully organized empty drawer._
{% endif %}

---

## Subfolders

{% assign pages_in_folder = site.pages | where_exp: "p", "p.dir == folder" %}
{% if pages_in_folder.size > 0 %}
<ul>
{% for p in pages_in_folder %}
  {% unless p.url == page.url %}
    <li><a href="{{ p.url | relative_url }}">{{ p.title | default: p.name }}</a></li>
  {% endunless %}
{% endfor %}
</ul>
{% else %}
_No subfolder index pages yet._
{% endif %}
