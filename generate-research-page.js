// Research Page Generator
// Merges template with research data to create HTML pages

const fs = require('fs');
const path = require('path');

// Configuration
const TEMPLATE_PATH = path.join(__dirname, 'research-template.html');
const DATA_DIR = path.join(__dirname, 'data');
const OUTPUT_DIR = path.join(__dirname, 'research');

// Get research topic from command line
const topic = process.argv[2];

if (!topic) {
    console.error('❌ Usage: node generate-research-page.js <topic>');
    console.error('   Example: node generate-research-page.js xray');
    process.exit(1);
}

// Load research data
let researchData;
try {
    const dataPath = path.join(DATA_DIR, `research-${topic}.js`);
    researchData = require(dataPath);
} catch (error) {
    console.error(`❌ Could not load research data: research-${topic}.js`);
    console.error('   Make sure the file exists in the data/ directory');
    process.exit(1);
}

// Load template
let template;
try {
    template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
} catch (error) {
    console.error('❌ Could not load template: research-template.html');
    process.exit(1);
}

// Helper functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getStatusBadge(status) {
    const badges = {
        'completed': { text: '✓ Completed', class: 'completed' },
        'ongoing': { text: '⏳ Ongoing', class: 'ongoing' },
        'archived': { text: '📦 Archived', class: 'archived' },
        'draft': { text: '📝 Draft', class: 'draft' }
    };
    return badges[status] || badges['draft'];
}

function renderCategories(categories) {
    const icons = {
        'Research': '🔬',
        'AI': '🤖',
        'Automation': '⚙️',
        'Space Systems': '🛰️',
        'Hardware Testing': '🔧',
        'Software': '💻',
        'System Design': '🏗️'
    };
    return categories.map(cat => {
        const icon = icons[cat] || '📌';
        return `<span class="category-tag">${icon} ${cat}</span>`;
    }).join('');
}

function renderFindings(findings) {
    return findings.map(finding => {
        const processedContent = processContentWithCodeBlocks(finding.content);
        return `
            <div class="finding-card">
                <div class="finding-title">${finding.title}</div>
                <div class="finding-text">${processedContent}</div>
            </div>`;
    }).join('\n');
}

function processContentWithCodeBlocks(content) {
    if (!content) return '';
    
    // Split content into lines and process
    const lines = content.split('\n');
    let result = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeContent = [];
    let textLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check for code block start
        if (line.trim().startsWith('```')) {
            // Process any accumulated text lines first
            if (textLines.length > 0) {
                result.push(renderTextBlock(textLines));
                textLines = [];
            }
            
            if (!inCodeBlock) {
                // Start of code block
                inCodeBlock = true;
                codeLanguage = line.trim().substring(3) || 'bash';
                codeContent = [];
            } else {
                // End of code block
                inCodeBlock = false;
                const codeText = codeContent.join('\n');
                result.push(renderCodeBlock(codeLanguage, codeText));
                codeLanguage = '';
                codeContent = [];
            }
        } else if (inCodeBlock) {
            // Inside code block, collect content
            codeContent.push(line);
        } else {
            // Regular text line
            if (line.trim()) {
                textLines.push(line);
            } else if (textLines.length > 0) {
                // Empty line signals end of text block
                const block = renderTextBlock(textLines);
                if (block) result.push(block);
                textLines = [];
            }
        }
    }
    
    // Process remaining text
    if (textLines.length > 0) {
        result.push(renderTextBlock(textLines));
    }
    
    // If still in code block at end, close it
    if (inCodeBlock && codeContent.length > 0) {
        const codeText = codeContent.join('\n');
        result.push(renderCodeBlock(codeLanguage, codeText));
    }
    
    return result.join('\n');
}

function renderTextBlock(lines) {
    if (!lines || lines.length === 0) return '';
    
    // Process each line - escape HTML and convert inline code
    const processedLines = lines.map(line => {
        let processedLine = escapeHtml(line);
        
        // Convert inline code (text between backticks)
        processedLine = processedLine.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        return processedLine;
    }).join('<br>');
    
    return `
        <div class="text-block-wrapper">
            <div class="text-block-header">
                <span class="text-block-label">📝 Text Content</span>
                <button class="text-copy-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>
            </div>
            <textarea class="text-block" readonly>${escapeHtml(lines.join('\n'))}</textarea>
        </div>
    `;
}

function renderCodeBlock(language, content) {
    return `
        <div class="code-block-wrapper">
            <div class="code-block-header">
                <span class="code-block-language">${language}</span>
                <button class="code-copy-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>
            </div>
            <pre class="code-block"><code>${escapeHtml(content)}</code></pre>
        </div>
    `;
}

function escapeHtml(text) {
    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return text.replace(/[&<>"']/g, char => htmlEntities[char]);
}

function renderRecommendations(recommendations) {
    if (!recommendations || recommendations.length === 0) return '';
    
    return `
            <!-- RECOMMENDATIONS -->
            <section class="content-section" id="recommendations">
                <h2 class="section-title">Recommendations</h2>
                <div class="recommendations-grid">
                    ${recommendations.map(rec => `
                    <div class="recommendation-card">
                        <div class="recommendation-title">${rec.title}</div>
                        <div class="recommendation-text">${rec.content.replace(/\n/g, '<br>')}</div>
                    </div>`).join('\n                    ')}
                </div>
            </section>`;
}

function renderFacilities(facilities) {
    if (!facilities || facilities.length === 0) return '';
    
    return `
            <!-- FACILITIES -->
            <section class="content-section" id="facilities">
                <h2 class="section-title">Testing Facilities</h2>
                <div class="facilities-grid">
                    ${facilities.map(fac => `
                    <div class="facility-card">
                        <div class="facility-name">${fac.name}</div>
                        <div class="facility-details">
                            <span class="facility-location">📍 ${fac.location}</span>
                            <span class="facility-cost">💰 ${fac.cost}</span>
                        </div>
                        <div class="facility-capabilities">${fac.capabilities}</div>
                    </div>`).join('\n                    ')}
                </div>
            </section>`;
}

function renderSpecs(specs) {
    if (!specs || specs.length === 0) return '';
    
    // Convert specs to a formatted JSON string
    const specsJson = JSON.stringify(specs, null, 2);
    
    return `
            <!-- SPECS -->
            <section class="content-section" id="specs">
                <h2 class="section-title">Machine Specifications</h2>
                <div class="specs-container">
                    <div class="code-block-wrapper">
                        <div class="code-block-header">
                            <span class="code-block-language">JSON</span>
                            <button class="code-copy-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                Copy
                            </button>
                        </div>
                        <pre class="code-block"><code>${escapeHtml(specsJson)}</code></pre>
                    </div>
                </div>
            </section>`;
}

function renderSpeedsAndFeeds(speedsAndFeeds) {
    if (!speedsAndFeeds || speedsAndFeeds.length === 0) return '';
    
    // Convert speeds and feeds to a formatted JSON string
    const speedsJson = JSON.stringify(speedsAndFeeds, null, 2);
    
    return `
            <!-- SPEEDS AND FEEDS -->
            <section class="content-section" id="speeds-and-feeds">
                <h2 class="section-title">Speeds and Feeds Reference</h2>
                <div class="speeds-container">
                    <div class="code-block-wrapper">
                        <div class="code-block-header">
                            <span class="code-block-language">JSON</span>
                            <button class="code-copy-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                Copy
                            </button>
                        </div>
                        <pre class="code-block"><code>${escapeHtml(speedsJson)}</code></pre>
                    </div>
                </div>
            </section>`;
}

function renderRelatedLinks(links) {
    if (!links || links.length === 0) return '';
    
    return `
            <!-- RELATED LINKS -->
            <section class="content-section" id="related-links">
                <h2 class="section-title">Related Resources</h2>
                <ul class="links-list">
                    ${links.map(link => `
                    <li>
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                            <span class="icon">${link.icon}</span>
                            <span>${link.title}</span>
                        </a>
                    </li>`).join('\n                    ')}
                </ul>
            </section>`;
}

// Generate table of contents
function generateTOC() {
    let toc = `
                    <li><a href="#abstract">Abstract</a></li>
                    <li><a href="#methodology">Methodology</a></li>
                    <li><a href="#findings">Key Findings</a></li>`;
    
    if (researchData.recommendations && researchData.recommendations.length > 0) {
        toc += '\n                    <li><a href="#recommendations">Recommendations</a></li>';
    }
    if (researchData.facilities && researchData.facilities.length > 0) {
        toc += '\n                    <li><a href="#facilities">Facilities</a></li>';
    }
    if (researchData.specs && researchData.specs.length > 0) {
        toc += '\n                    <li><a href="#specs">Machine Specifications</a></li>';
    }
    if (researchData.speedsAndFeeds && researchData.speedsAndFeeds.length > 0) {
        toc += '\n                    <li><a href="#speeds-and-feeds">Speeds and Feeds</a></li>';
    }
    if (researchData.relatedLinks && researchData.relatedLinks.length > 0) {
        toc += '\n                    <li><a href="#related-links">Related Resources</a></li>';
    }
    
    return toc;
}

// Replace placeholders in template
let html = template;

// Header section
html = html.replace('<!-- HEADER_CONTENT -->', `
            <div class="header-top">
                <div class="header-left">
                    <span class="status-badge ${getStatusBadge(researchData.status).class}">${getStatusBadge(researchData.status).text}</span>
                    <span class="research-date">📅 ${formatDate(researchData.date)}</span>
                    <button class="read-aloud-btn" onclick="toggleReadAloud()">
                        <span class="icon"></span>
                        <span class="text">Read Aloud</span>
                    </button>
                </div>
            </div>
            <h1 class="research-title">${researchData.title}</h1>
            <p class="research-subtitle">${researchData.subtitle}</p>
            <div class="header-categories">
                ${renderCategories(researchData.categories)}
            </div>`);

// Content section
html = html.replace('<!-- CONTENT_START -->', `
            <!-- ABSTRACT -->
            <section class="content-section" id="abstract">
                <h2 class="section-title">Abstract</h2>
                <p class="section-text">${researchData.abstract}</p>
            </section>

            <!-- METHODOLOGY -->
            <section class="content-section" id="methodology">
                <h2 class="section-title">Methodology</h2>
                <div class="section-text">
                    ${researchData.methodology.replace(/\n/g, '<br>')}
                </div>
            </section>

            <!-- KEY FINDINGS -->
            <section class="content-section" id="findings">
                <h2 class="section-title">Key Findings</h2>
                <div class="findings-grid">
                    ${renderFindings(researchData.findings)}
                </div>
            </section>
`);

// Add optional sections
html = html.replace('<!-- OPTIONAL_SECTIONS -->', 
    renderRecommendations(researchData.recommendations) +
    renderFacilities(researchData.facilities) +
    renderSpecs(researchData.specs) +
    renderSpeedsAndFeeds(researchData.speedsAndFeeds) +
    renderRelatedLinks(researchData.relatedLinks)
);

// Table of contents
html = html.replace('<!-- TABLE_OF_CONTENTS -->', generateTOC());

// Title
html = html.replace('<title>Research Template', `<title>${researchData.title}`);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Write output file
const outputPath = path.join(OUTPUT_DIR, `${researchData.id}.html`);
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`✅ Generated: ${outputPath}`);
console.log(`   Title: ${researchData.title}`);
console.log(`   Status: ${researchData.status}`);
console.log(`   Findings: ${researchData.findings.length}`);
