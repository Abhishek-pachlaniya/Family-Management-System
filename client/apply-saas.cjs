const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'src', 'styles');

function processFile(filePath) {
    if (!filePath.endsWith('.css')) return;
    if (filePath.includes('App.css') || filePath.includes('Auth.css') || filePath.includes('dashboard.css') || filePath.includes('index.css') || filePath.includes('Userprofile.css')) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove the previously appended Neumorphic block completely
    content = content.replace(/\/\* Neumorphic Overrides \*\/[\s\S]*$/g, '');

    // Replace old neumorphic injects
    content = content.replace(/border: none !important;/g, '');
    content = content.replace(/box-shadow: var\(--shadow-outset\) !important;/g, '');
    content = content.replace(/background-color: var\(--bg-primary\) !important;/g, '');

    // Add Clean Enterprise SaaS Overrides
    content += `\n/* Clean Enterprise SaaS Overrides */
.card, .order-card, .website-card, .dashboard-widget, .stat-card, .modal-content, .action-btn {
    border: 1px solid #E2E8F0 !important;
    background-color: #FFFFFF !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03) !important;
    border-radius: 8px !important;
    transition: all 0.2s ease !important;
}
.card:hover, .order-card:hover, .website-card:hover, .action-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025) !important;
}
button {
    font-family: 'Inter', sans-serif !important;
    font-weight: 500 !important;
    text-transform: none !important;
    background-color: #3B82F6 !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 6px !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
}
button:hover {
    background-color: #2563EB !important;
}
input, textarea, select {
    background-color: #FFFFFF !important;
    border: 1px solid #E2E8F0 !important;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
    color: #2D3748 !important;
    border-radius: 6px !important;
}
input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: #3B82F6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
}
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated to Clean SaaS:', filePath);
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
console.log('SaaS overhaul complete!');
