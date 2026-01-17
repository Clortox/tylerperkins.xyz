# [tylerperkins.xyz](https://tylerperkins.xyz)

This repo contains the [Hugo](https://gohugo.io) source for my personal website, [tylerperkins.xyz](https://www.tylerperkins.xyz).

Find the active source of this repository on my [Gitea](https://git.clortox.com/Infrastructure/tylerperkins.xyz), where I make issues to track additions, and am more active to pull requests.

Find the mirror of this repository on [Github](https://github.com/Clortox/tylerperkins.xyz).

## Writing Posts

### Sidenotes / Margin Notes

This blog supports Tufte-style sidenotes that appear in the right margin on desktop and at the bottom of posts on mobile. To add a sidenote:

```markdown
This is some text{{< sidenote >}}This is a sidenote that appears in the margin{{< /sidenote >}} with more text following.
```

**Features:**
- On desktop (≥1200px): Notes appear as cards in the right margin, aligned with where they're referenced
- On mobile (<1200px): Notes appear in a "Notes" section at the end of the post
- Automatic numbering: `[0]`, `[1]`, `[2]`, etc.
- Bidirectional links: Click the number in text to jump to the note, click the number in the note to jump back
- Supports markdown and math: `$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$`

### Summary Breaks

Control what appears on the homepage and list pages using the `<!--more-->` separator:

```markdown
---
title: "My Post Title"
date: 2026-01-16
---

This is the introduction paragraph that will appear on list pages as the summary.

<!--more-->

Everything after this line only appears on the full post page.
```

Without `<!--more-->`, Hugo will automatically create a summary from the first ~70 words.

### Clickable Headings

All headings automatically get anchor links. Hover over any heading to see a `#` symbol appear. Click it to get a direct link to that section.

### Markdown Source Downloads

Every post automatically generates a downloadable markdown source file. At the bottom of each post page, you'll find a "Download Markdown" link that provides the original markdown source, including all shortcodes and formatting.

**Technical Details:**
- Markdown files are generated as `index.md` alongside `index.html` in each post directory
- The raw content includes front matter, shortcodes, and all original formatting
- This is configured via Hugo's custom output formats in `config.yaml`
