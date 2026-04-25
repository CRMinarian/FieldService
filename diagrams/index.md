---
layout: default
title: Diagrams
---

# Diagrams

Architecture diagrams and visual reference material.  
Drop files into this folder and they will appear here automatically.

{% assign folder = "/diagrams/" %}
{% assign files = site.static_files | where_exp: "f", "f.path contains folder" %}

{% if files.size > 0 %}
## Files

<ul>
{% for f in files %}
  {% unless f.path contains "/.gitkeep" %}
    {% assign ext = f.extname | downcase %}
    {% if ext == ".png" or ext == ".svg" or ext == ".jpg" or ext == ".jpeg" or ext == ".pdf" %}
      <li>
        <a href="{{ f.path | relative_url }}">{{ f.name }}</a>
        <small>({{ ext | remove: "." | upcase }})</small>
      </li>
    {% endif %}
  {% endunless %}
{% endfor %}
</ul>
{% else %}
_No diagrams yet. This is an intentionally empty wall awaiting wisdom._
{% endif %}
