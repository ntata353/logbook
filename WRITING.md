# Writing Guide

This is your complete guide to adding new entries, uploading images, and working with tags. No coding knowledge required.

---

## Creating a new entry

All entries live in the `posts/` folder as plain text files. Each file is one log entry.

**Naming convention:** use the date in `YYYY-MM-DD` format:

```
posts/2025-04-01.md
posts/2025-04-15.md
```

You can create as many posts per day as you like — just add a suffix to keep filenames unique:

```
posts/2025-04-01-figma.md
posts/2025-04-01-standup.md
```

---

## Frontmatter (the header block)

Every post starts with a small header block between `---` markers. This is where you set the date and tags:

```
---
date: 2025-04-01
tags: [figma, ux, typography]
---

Your entry text begins here.
```

**`date`** — The date that appears at the top of the post, formatted automatically as "April 1, 2025". Use `YYYY-MM-DD` format.

**`tags`** — A list of labels in square brackets, separated by commas. Tags appear as clickable labels on each post and as filters in the sidebar. Use lowercase, no spaces (use hyphens for multi-word tags: `user-research`, `design-system`).

---

## Writing content

After the closing `---`, write your entry in Markdown. Here's a quick reference:

### Paragraphs

Just type normally. Leave a blank line between paragraphs.

```
This is a paragraph.

This is another paragraph.
```

### Headings

```
## Section heading
### Smaller heading
```

### Bold and italic

```
**bold text**
*italic text*
```

### Bullet lists

```
- First item
- Second item
- Third item
```

### Numbered lists

```
1. First step
2. Second step
3. Third step
```

### Inline code

Wrap in backticks: \`like this\`

### Blockquotes

```
> This is a pull quote or note.
```

---

## Adding images

**Step 1:** Place your image file in the `public/images/` folder.

Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`

**Step 2:** In your post, reference the image with this syntax:

```
![A description of the image](/images/your-filename.jpg)
```

- The text in brackets `[...]` is the alt text (a description of what the image shows). This is used by screen readers and shown if the image fails to load.
- The path in parentheses `(...)` always starts with `/images/` followed by your filename exactly as it appears in the `public/images/` folder.

**Example:**

If your file is `public/images/wireframe-v2.png`, write:

```
![Second wireframe iteration](/images/wireframe-v2.png)
```

Images are automatically sized to fit the post column width.

---

## Managing tags

Tags are defined in each post's frontmatter — there's no separate list to maintain. The sidebar aggregates all unique tags automatically.

**Adding a tag:** add it to the `tags: [...]` list in a post's frontmatter.

**Renaming a tag:** find every post that uses the old tag name and update the frontmatter. Because tags are just text in your files, a simple text search across the `posts/` folder works well.

**Removing a tag:** delete it from any post's frontmatter. If no posts use a tag, it disappears from the sidebar.

---

## Full example post

Here's what a complete post file looks like:

```
---
date: 2025-04-10
tags: [figma, workshop, process]
---

Ran a two-hour working session with the product team to pressure-test the new nav structure. Used Figma's presentation mode and a shared FigJam board for notes.

Three patterns emerged almost immediately: users expect the search to be global (not scoped to the current section), breadcrumbs are treated as a back button (not a location indicator), and nobody reads the section landing pages.

![Workshop FigJam board](/images/workshop-notes-april10.jpg)

The biggest surprise was how consistently people ignored the secondary navigation. It's visually present, but cognitively invisible. Will revisit the contrast and grouping.

**Next steps:**

- Redesign nav with global search prominent in the header
- Prototype breadcrumb-as-back-button behavior
- Run another round with 3–4 participants in two weeks
```

---

## Previewing locally

If you have Node.js installed, you can preview the site on your computer before deploying:

```
npm run dev
```

Then open `http://localhost:3000` in your browser. The site refreshes automatically when you save a post file.

---

## Deploying

The site deploys automatically to Vercel whenever you push changes to the main branch of your repository. No extra steps needed — just commit and push your new post files and images.
