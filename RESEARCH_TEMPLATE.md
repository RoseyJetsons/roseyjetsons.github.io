# Research Page Template System

## Overview

This system creates consistent, well-formatted research pages with minimal effort. Content is separated from presentation for easy updates.

---

## Quick Start

### 1. Create Research Data File

Create a new file in `data/` named `research-<topic>.js`:

```javascript
module.exports = {
    id: 'my-research-topic',
    title: 'My Research Title',
    subtitle: 'Brief description under the title',
    date: '2026-03-28',
    status: 'completed', // or 'ongoing', 'archived', 'draft'
    categories: ['AI', 'Research'],
    abstract: '2-3 sentence summary of the research...',
    methodology: 'Research approach and methods used...',
    findings: [
        { 
            title: 'Finding 1', 
            content: 'Detailed description of the finding...' 
        },
        { 
            title: 'Finding 2', 
            content: 'Another finding...' 
        }
    ],
    recommendations: [
        { 
            title: 'Recommendation 1', 
            content: 'Practical recommendation...' 
        }
    ],
    relatedLinks: [
        { title: 'Link Title', url: 'https://...', icon: '📄' }
    ]
};
```

### 2. Generate the Page

Run the generator:
```bash
node generate-research-page.js my-research-topic
```

This creates `research/my-research-topic.html`

### 3. Update research.html

Add the new research to the archive page:

```html
<div class="research-card">
    <span class="status-badge completed">Completed</span>
    <h3><a href="research/my-research-topic.html">My Research Title</a></h3>
    <p>Brief description...</p>
    <div class="meta">
        <span>📅 2026-03-28</span>
        <span>🏷️ AI</span>
    </div>
</div>
```

---

## Data Fields Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (slug for URL) |
| `title` | string | Yes | Page title (also in browser tab) |
| `subtitle` | string | Yes | Brief description under title |
| `date` | string | Yes | YYYY-MM-DD format |
| `status` | string | Yes | `completed`, `ongoing`, `archived`, `draft` |
| `categories` | array | Yes | Category tags for filtering |
| `abstract` | string | Yes | Summary paragraph (2-3 sentences) |
| `methodology` | string | Yes | Research approach description |
| `findings` | array | Yes | Key discoveries (objects with `title`, `content`) |
| `recommendations` | array | No | Practical recommendations |
| `relatedLinks` | array | No | External resources |
| `facilities` | array | No | Testing/research facilities (optional) |

---

## Styling

All research pages inherit styles from the main site:

- **Colors**: Purple/pink gradient accents, dark theme
- **Typography**: Inter font family
- **Layout**: Responsive with sticky sidebar navigation
- **Status badges**: Color-coded (green=completed, purple=ongoing)

To override styles for a specific page, add a `<style>` block in the template.

---

## Examples

### View existing data file:
```bash
cat data/research-xray.js
```

### Generate x-ray research page:
```bash
node generate-research-page.js xray
```

### Open in browser:
```bash
open research/x-ray-research.html
```

---

## Template Customization

The template is in `research-template.html`. Sections:

1. **Header**: Title, status badge, date, categories
2. **Abstract**: Summary paragraph
3. **Methodology**: Research approach
4. **Key Findings**: Card-based layout
5. **Recommendations**: Highlighted boxes
6. **Related Links**: External resources

To add new sections, edit the template and update the generator script.

---

## Adding New Features

### Add a new section type:

1. Update `generate-research-page.js` to include the new section
2. Add the HTML template for the section
3. Update `RESEARCH_TEMPLATE.md` documentation
4. Add example data to `research-xray.js`

### Change styling:

Edit the `<style>` block in `research-template.html` or add CSS to `index.html`.

---

## Maintenance

- **Update template**: Edit `research-template.html`
- **Update generator**: Edit `generate-research-page.js`
- **Regenerate all pages**: Run `node regenerate-all.js`

---

*Last updated: 2026-03-28*
