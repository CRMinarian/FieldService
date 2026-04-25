---
layout: default
title: Frameworks
---

# Frameworks

Reference models, operating patterns, and architectural frameworks.  
Drop files into this folder and they will appear here automatically.

{% assign folder = "/frameworks/" %}
{% assign files = site.static_files | where_exp: "f", "f.path contains folder" %}

{% if files.size > 0 %}
## Files

<ul>
{% for f in files %}
  {% unless f.path contains "/.gitkeep" %}
    {% assign ext = f.extname | downcase %}
    {% if ext == ".pdf" or ext == ".pptx" or ext == ".docx" or ext == ".png" or ext == ".svg" %}
      <li>
        <a href="{{ f.path | relative_url }}">{{ f.name }}</a>
        <small>({{ ext | remove: "." | upcase }})</small>
      </li>
    {% endif %}
  {% endunless %}
{% endfor %}
</ul>
{% else %}
_No frameworks published yet. This is a calm, intentional absence._
{% endif %}
