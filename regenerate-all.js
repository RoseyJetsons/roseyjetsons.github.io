// Regenerate All Research Pages
// Scans data/research-*.js files and regenerates all research HTML pages

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_DIR = path.join(__dirname, 'data');
const OUTPUT_DIR = path.join(__dirname, 'research');

// Get all research data files
const dataFiles = fs.readdirSync(DATA_DIR)
    .filter(f => f.startsWith('research-') && f.endsWith('.js'))
    .sort();

if (dataFiles.length === 0) {
    console.error('❌ No research data files found in data/ directory');
    process.exit(1);
}

console.log(`🔧 Found ${dataFiles.length} research data file(s)\n`);

let success = 0;
let failed = 0;
const errors = [];

for (const file of dataFiles) {
    const topic = file.replace('research-', '').replace('.js', '');
    console.log(`⏳ Generating: ${topic}...`);
    
    try {
        execSync(`node "${path.join(__dirname, 'generate-research-page.js')}" ${topic}`, {
            stdio: 'inherit',
            cwd: __dirname
        });
        success++;
        console.log(`✅ Success\n`);
    } catch (error) {
        failed++;
        errors.push({ topic, error: error.message });
        console.error(`❌ Failed: ${topic}\n`);
    }
}

// Summary
console.log('═══════════════════════════════════════');
console.log(`📊 Summary: ${success} succeeded, ${failed} failed out of ${dataFiles.length}`);

if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log(`  - ${e.topic}: ${e.error}`));
    process.exit(1);
} else {
    console.log('\n✨ All research pages regenerated successfully!');
}
