---

layout: default
title: FieldService
-------------------

## What This Is

### Welcome. Yes, This Is Pierre’s GitHub Repo. No, You’re Not Lost.

At some point—usually after the third tool, the fifth document, and the seventh blog site—you begin to wonder whether *you* work for your content, or your content works for *you*.

This site exists because I finally did the sensible thing.

Over the years, I’ve written articles, built frameworks, created tools, and collected an impressive assortment of diagrams, notes, and half-finished ideas scattered across platforms like socks in a dryer. Blogs over here. Documents over there. “Final” versions that were clearly not final anywhere.

Meanwhile, my day-to-day work has shifted. I now spend far more time doing hands-down, sleeves-rolled-up AI and development work than I ever expected. One thing became obvious fast:

**GitHub is where real work wants to live.**

So instead of treating GitHub like a mysterious cave where developers disappear and return speaking in acronyms, I leaned in.

This site is both:

* a professional front-end blog
* a practical back-end repository of working assets

The front end runs on Jekyll.
The back end *is* the repo.

What you read here is what actually exists behind the curtain.

---

## Explore

* [Blog]({{ "/blog/" | relative_url }})
* [Decks]({{ "/decks/" | relative_url }})
* [Diagrams]({{ "/diagrams/" | relative_url }})
* [Frameworks]({{ "/frameworks/" | relative_url }})
* [Lexicon]({{ "/lexicon/" | relative_url }})
* [References]({{ "/references/" | relative_url }})
* [Tools]({{ "/tools/" | relative_url }})

---

## Latest Post

{% assign latest = site.posts | first %}
{% if latest %}

**{{ latest.title }}**
*{{ latest.date | date: "%B %d, %Y" }}*

{{ latest.excerpt | strip_html | truncate: 260 }}

[Read the full article]({{ latest.url | relative_url }})

{% else %}

No posts yet.
An empty shelf. Calm. Judging quietly.

{% endif %}

---

> ## 📝 Note for Pierre ❤️
>
> This exists so you don’t have to remember it.
> Because remembering it is… ambitious.
>
> **How to publish a new article:**
>
> 1. Create a new file in `_posts/`
> 2. Name it `YYYY-MM-DD-title-of-the-post.md`
> 3. Paste this at the top:
>
> ```
> ---
> layout: post
> title: Your Title Here
> date: YYYY-MM-DD
> ---
> ```
>
> 4. Write the post
> 5. Commit
> 6. Walk away confidently
>
> **Things Future-Pierre should not do:**
>
> * Do not rename `_posts/`
> * Do not rename folders after sharing links
> * Do not “just tweak” `_config.yml` late at night
>
> This note exists because Pierre is dyslexic, brilliant, and occasionally betrayed by filenames.
> Future-Pierre: you’re welcome.
---
layout: default
title: FieldService
---

## What This Is

### Welcome. Yes, This Is Pierre’s GitHub Repo. No, You’re Not Lost.

At some point—usually after the third tool, the fifth document, and the seventh blog site—you begin to wonder whether *you* work for your content, or your content works for *you*.

This site exists because I finally did the sensible thing.

Over the years, I’ve written articles, built frameworks, created tools, and collected an impressive assortment of diagrams, notes, and half-finished ideas scattered across platforms like socks in a dryer. Blogs over here. Documents over there. “Final” versions that were clearly not final anywhere.

Meanwhile, my day-to-day work has shifted. I now spend far more time doing hands-down, sleeves-rolled-up AI and development work than I ever expected. One thing became obvious fast:

**GitHub is where real work wants to live.**

So instead of treating GitHub like a mysterious cave where developers disappear and return speaking in acronyms, I leaned in.

This site is both:

- a professional front-end blog  
- a practical back-end repository of working assets  

The front end runs on Jekyll.  
The back end *is* the repo.

What you read here is what actually exists behind the curtain.

---

## Explore

- [Blog]({{ "/blog/" | relative_url }})
- [Decks]({{ "/decks/" | relative_url }})
- [Diagrams]({{ "/diagrams/" | relative_url }})
- [Frameworks]({{ "/frameworks/" | relative_url }})
- [Lexicon]({{ "/lexicon/" | relative_url }})
- [References]({{ "/references/" | relative_url }})
- [Tools]({{ "/tools/" | relative_url }})

---

## Latest Post

{% assign latest = site.posts | first %}
{% if latest %}

**{{ latest.title }}**  
*{{ latest.date | date: "%B %d, %Y" }}*

{{ latest.excerpt | strip_html | truncate: 260 }}

[Read the full article]({{ latest.url | relative_url }})

{% else %}

No posts yet.  
An empty shelf. Calm. Judging quietly.

{% endif %}

---

> ## 📝 Note for Pierre ❤️
>
> This exists so you don’t have to remember it.  
> Because remembering it is… ambitious.
>
> **How to publish a new article:**
>
> 1. Create a new file in `_posts/`
> 2. Name it `YYYY-MM-DD-title-of-the-post.md`
> 3. Paste this at the top:
>
> ```
> ---
> layout: post
> title: Your Title Here
> date: YYYY-MM-DD
> ---
> ```
>
> 4. Write the post  
> 5. Commit  
> 6. Walk away confidently
>
> **Things Future-Pierre should not do:**
>
> - Do not rename `_posts/`
> - Do not rename folders after sharing links
> - Do not “just tweak” `_config.yml` late at night
>
> This note exists because Pierre is dyslexic, brilliant, and occasionally betrayed by filenames.  
> Future-Pierre: you’re welcome.
