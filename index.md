---

## title: FieldService

## What This Is

### Welcome. Yes, This Is Pierre's GitHub Repo. No, You’re Not Lost.

At some point—usually after the third tool, the fifth document, and the seventh blog site—you begin to wonder whether *you* work for your content, or your content works for *you*.

This site exists because I finally did the sensible thing.

Over the years, I’ve written articles, built frameworks, created tools, and collected an impressive assortment of diagrams, notes, and half-finished ideas scattered across platforms like socks in a dryer. Blogs over here. Documents over there. “Final” versions that were clearly not final anywhere.

Meanwhile, my day-to-day work has shifted. I now spend far more time doing hands-down, sleeves-rolled-up AI and development work than I ever expected. And one thing quickly became obvious: **GitHub is where real work wants to live.**

So rather than treating GitHub as a mysterious place where developers disappear for weeks and return speaking in acronyms, I decided to lean into it.

This site is both:

* a professional front-end blog
* a practical back-end repository of working assets

The front end runs on a Jekyll site. The back end *is* the GitHub repo. The connection is intentionally honest: what you read here is what actually exists behind the curtain.

Every article, framework, diagram, and tool published on this site also lives directly in the repository. If you prefer neatly formatted posts, you’re in the right place. If you’d rather clone the repo and rummage around like a civilized engineer—also welcome.

This approach solves a simple problem with a simple answer:

**Why maintain separate blog sites when the work already lives in GitHub?**

From here forward, this becomes the single, consolidated home for my professional thinking, writing, and tooling. Expect essays, experiments, half-formed ideas that mature in public, and resources meant to be used—not admired from a distance.

Thanks for stopping by. Poke around. Clone responsibly.

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
No posts yet. (An empty shelf. Calm. Judging quietly.)
{% endif %}

---

## How to Use This Repository

Use this repository when you need:

* a stable reference to AI and Copilot concepts
* clear terminology across vendors and platforms
* architecture frameworks for Field Service and connected operations
* downloadable decks and diagrams intended for external sharing

This is not a development repository. It is a curated library.

---

## Publishing Philosophy

* Content here is considered published
* Files are not renamed once referenced publicly
* Updates are additive and time-scoped, not destructive
* Git history provides provenance and evolution
* Drafts and experiments live elsewhere

---

> ## 📝 Note for Pierre (Yes, You Specifically) ❤️
>
> This exists so you don’t have to remember it. Because remembering it is… optimistic.
>
> ### To publish a new article:
>
> 1. Create a new file in `_posts/`
> 2. Name it: `YYYY-MM-DD-title-of-the-post.md`
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
> 4. Write the post.
> 5. Commit. Push. Walk away confidently.
>
> ### Things Future-Pierre should *not* do:
>
> * Do **not** rename `_posts/`
> * Do **not** rename folders after sharing links
> * Do **not** “just tweak” `_config.yml` late at night
>
> This note exists because Pierre is dyslexic, brilliant, and occasionally betrayed by filenames. Future-Pierre: you’re welcome.

---

## Attribution

Authored and curated by Pierre Hulsebus. Intended for architects, operators, and leaders working at the intersection of AI and service operations.
