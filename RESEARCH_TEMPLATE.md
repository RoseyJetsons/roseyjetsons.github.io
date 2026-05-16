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
    // Optional sections (see below)
};
```

### 2. Generate the Page

Run the generator:
```bash
node generate-research-page.js my-research-topic
```

This creates `research/my-research-topic.html`

### 3. Regenerate All Pages

```bash
node regenerate-all.js
```

This scans `data/research-*.js` and regenerates every page.

### 4. Update research.html

Add the new research card to the archive page (`research.html`):

```html
<div class="research-card" data-category="ai research">
    <div class="card-header">
        <div class="card-title">My Research Title</div>
        <div class="card-date">2026-03-28</div>
    </div>
    <div class="card-description">Brief description...</div>
    <div class="card-tags">
        <span class="tag research">Research</span>
        <span class="tag ai">AI</span>
    </div>
    <div class="card-footer">
        <span class="status completed">Completed</span>
        <a href="research/my-research-topic.html" class="view-link">View Research →</a>
    </div>
</div>
```

---

## Data Fields Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (used as output filename, e.g., `x-ray-research`) |
| `title` | string | Page title (browser tab + header) |
| `subtitle` | string | Brief description under the title |
| `date` | string | Publication date in `YYYY-MM-DD` format |
| `status` | string | `completed`, `ongoing`, `archived`, or `draft` |
| `categories` | string[] | Category tags for filtering (e.g., `['Research', 'AI']`) |
| `abstract` | string | 2-3 sentence summary paragraph |
| `methodology` | string | Research approach description (supports `**bold**` markdown) |
| `findings` | array | Key discoveries — each item has `title` and `content` (supports markdown, ` ``` ` code blocks, inline \`code\`) |

### Optional Fields (Conditionally Rendered)

| Field | Type | Description |
|-------|------|-------------|
| `recommendations` | array of `{title, content}` | Practical recommendations — rendered as bordered cards with left accent border |
| `relatedLinks` | array of `{title, url, icon}` | External resource links with emoji icons |
| `facilities` | array of `{name, location, capabilities, cost}` | Testing/research facility directory — rendered as facility cards |
| `specs` | array of `{name, value}` | Machine/specification data — rendered as a JSON code block with copy button |
| `speedsAndFeeds` | array of `{material, rpm, feed}` | Manufacturing reference data — rendered as a JSON code block with copy button |
| `tags` | array of strings | Per-finding tags — rendered as small pill badges below each finding |
| `commonMistakes` | array of strings | Common beginner mistakes — rendered as a highlighted list |
| `learningPath` | array of `{level, details}` | Progressive learning path — rendered as a timeline-style section |
| `keyStatistics` | object | Key stats (key-value pairs) — rendered as a stat grid |

### Example with Optional Fields

```javascript
module.exports = {
    id: 'my-topic',
    title: 'My Topic',
    subtitle: 'Description',
    date: '2026-03-28',
    status: 'completed',
    categories: ['Research', 'AI'],
    abstract: 'Summary...',
    methodology: 'Approach...',
    findings: [
        {
            title: 'Key Finding',
            content: 'Detailed content...',
            tags: ['ai', 'machine-learning']  // per-finding tags
        }
    ],
    recommendations: [
        { title: 'Do This', content: 'Practical advice...' }
    ],
    relatedLinks: [
        { title: 'Source', url: 'https://example.com', icon: '📄' }
    ],
    specs: [
        { name: 'Processor', value: 'M2 Max' }
    ],
    speedsAndFeeds: [
        { material: 'Aluminum', rpm: '8000', feed: '100' }
    ],
    commonMistakes: [
        'Mistake 1',
        'Mistake 2'
    ],
    learningPath: [
        { level: 'Beginner', details: 'Start here...' },
        { level: 'Advanced', details: 'Then this...' }
    ],
    keyStatistics: {
        successRate: '85%',
        totalTime: '12 hours'
    }
};
```

---

## Rendering Rules

### Content Processing

The generator converts finding content from text/markdown to HTML:

- **Bold**: `**text**` → `<strong>text</strong>`
- **Inline code**: `` `code` `` → `<code>code</code>`
- **Code blocks**: ` ```language ... ``` ` → styled code block with copy button
- **Line breaks**: Empty lines → `<br>`, newlines within a paragraph → joined with spaces
- **HTML escaping**: All content is HTML-escaped for security

### Section Visibility

Sections only render if the data field has at least one item:
- `recommendations` → hidden if empty array or missing
- `relatedLinks` → hidden if empty array or missing
- `facilities` → hidden if empty array or missing
- `specs` → hidden if empty array or missing
- `speedsAndFeeds` → hidden if empty array or missing
- `tags` → rendered inline within each finding card
- `commonMistakes` → hidden if empty array or missing
- `learningPath` → hidden if empty array or missing
- `keyStatistics` → hidden if empty object or missing

### TOC Generation

The table of contents is dynamically generated based on available sections:
- Always shows: Abstract, Methodology, Key Findings
- Conditionally adds: Recommendations, Facilities, Machine Specifications, Speeds and Feeds, Related Resources
- `tags` are not TOC items (they're inline within findings)
- `commonMistakes` is not a TOC item (it's inline within findings)
- `learningPath` and `keyStatistics` are TOC items when present

---

## Styling

All research pages inherit styles from the template:

- **Colors**: Purple/indigo gradient accents (`#6366f1` → `#8b5cf6`), dark theme (`#0a0a0f` base)
- **Typography**: Inter font family
- **Layout**: Responsive, 2-column grid (content + 300px sticky sidebar)
- **Status badges**: Color-coded (green=completed, purple=ongoing with pulse, gray=archived, amber=draft)
- **Code blocks**: GitHub Dark theme styling with copy buttons
- **Cards**: Rounded corners, subtle borders, hover lift effect

### Category Tag Colors

| Category | Background | Text |
|----------|-----------|------|
| Research | Purple | Light purple |
| AI | Indigo | Light indigo |
| System Design | Pink | Light pink |
| Makerspace | Green | Light green |
| Finance | Amber | Light amber |
| Trading | Pink | Light pink |

---

## Template Structure

The template (`research-template.html`, 872 lines) has these sections:

1. **Navigation**: Sticky top nav with links back to portfolio
2. **Header**: Gradient background, status badge, read-aloud button, title, subtitle, category tags
3. **Main Layout**: 2-column grid (content area + sticky sidebar)
4. **Sidebar**: Table of contents
5. **Sections**: Abstract → Methodology → Key Findings → (optional) Recommendations/Facilities/Specs/SpeedsAndFeeds/RelatedLinks
6. **JavaScript**: Speech synthesis (read-aloud), reading progress bar, code copy buttons, responsive behavior

---

## Adding New Features

### Add a new optional section:

1. Add a `renderXxx(data)` function to `generate-research-page.js`
2. Call it in the `OPTIONAL_SECTIONS` replacement block
3. Add HTML/CSS to `research-template.html`
4. Update this documentation
5. Add example data to a test file

### Change styling:

Edit the `<style>` block in `research-template.html` or add CSS to `index.html`.

### Add a new category with custom color:

1. Add a `.tag.<name>` CSS rule to `research.html`
2. Optionally add a filter button with `data-filter="<name>"`
3. Add the category icon to the `icons` map in `generate-research-page.js`

---

## Maintenance

- **Update template**: Edit `research-template.html`
- **Update generator**: Edit `generate-research-page.js`
- **Regenerate all pages**: Run `node regenerate-all.js`
- **Add research**: Create data file → run generator → add card to `research.html`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Generator says "Could not load research data" | Check the data file exists in `data/` and uses `module.exports = {...}` |
| Page renders but section is missing | The data field must be a non-empty array/object |
| Code blocks not rendering | Use fenced code blocks with triple backticks: ` ```language ` |
| Special characters break the page | The generator escapes HTML, but make sure your JS string is properly quoted |
| regenerate-all.js fails silently | Check Node.js version (v14+ required) and file permissions |

---

*Last updated: 2026-05-15*
