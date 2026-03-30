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
    return findings.map(finding => `
            <div class="finding-card">
                <div class="finding-title">${finding.title}</div>
                <div class="finding-text">${finding.content.replace(/\n/g, '<br>')}</div>
            </div>`
    ).join('\n');
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
