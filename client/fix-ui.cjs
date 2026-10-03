const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'src', 'styles');

function processFile(filePath) {
    if (!filePath.endsWith('.css')) return;
    if (filePath.includes('App.css') || filePath.includes('Auth.css') || filePath.includes('dashboard.css') || filePath.includes('index.css')) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove local :root definitions so they inherit from App.css
    content = content.replace(/:root\s*\{[^}]+\}/g, '');

    // Replace soft shadows with hard Neo-Brutalist shadows
    content = content.replace(/box-shadow:\s*[^;]+;/g, 'box-shadow: 4px 4px 0px #0F172A !important;');

    // Find classes that define background-color and padding (likely cards) and inject borders
    content = content.replace(/background-color:\s*var\(--card-bg\)[^;]*;/g, 'background-color: #FFFFFF !important; border: 2px solid #0F172A !important;');
    
    // Convert --accent-color usages to bold Amber/Yellow or Purple
    content = content.replace(/var\(--accent-color\)/g, '#5B21B6');
    content = content.replace(/var\(--border-color\)/g, '#0F172A');
    content = content.replace(/var\(--text-primary\)/g, '#0F172A');
    content = content.replace(/var\(--text-secondary\)/g, '#475569');
    
    // Add hover effects to buttons and cards
    // This is a bit brute force but works for a sweeping style change
    content += `\n/* Neo-Brutalist Overrides */
.card, .order-card, .website-card, .dashboard-widget, .stat-card, .modal-content, .action-btn {
    border: 2px solid #0F172A !important;
    box-shadow: 4px 4px 0px #0F172A !important;
    transition: all 0.15s ease-out !important;
    border-radius: 12px !important;
}
.card:hover, .order-card:hover, .website-card:hover, .action-btn:hover {
    transform: translate(2px, 2px) !important;
    box-shadow: 2px 2px 0px #0F172A !important;
}
button {
    font-family: 'Space Grotesk', sans-serif !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
}
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated:', filePath);
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

traverseDir(stylesDir);
console.log('Global UI overhaul complete!');
