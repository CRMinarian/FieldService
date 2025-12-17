---
title: Diagrams
---

{% for file in site.static_files %}
  {% if file.path contains '/decks/' %}
- [{{ file.name }}]({{ site.baseurl }}{{ file.path }})
  {% endif %}
{% endfor %}
