---
layout: default
title: Decks
---

# Decks

Published presentation assets (PDF/PPTX). This section will grow over time.

## Files in this folder

{% assign files = site.static_files | where_exp: "f", "f.path contains '/decks/'" %}
{% if files.size > 0 %}
<ul>
{% for f in files %}
  {% if f.extname == ".pdf" or f.extname == ".pptx" %}
    <li><a href="{{ f.path | relative_url }}">{{ f.name }}</a></li>
  {% endif %}
{% endfor %}
</ul>
{% else %}
Nothing here yet. Add a PDF or PPTX to `/decks/` and it will appear here.
{% endif %}
