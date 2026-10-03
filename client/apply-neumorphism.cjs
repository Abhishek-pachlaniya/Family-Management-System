const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'src', 'styles');

function processFile(filePath) {
    if (!filePath.endsWith('.css')) return;
    if (filePath.includes('App.css') || filePath.includes('Auth.css') || filePath.includes('dashboard.css') || filePath.includes('index.css') || filePath.includes('Userprofile.css')) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove the previously appended Neo-Brutalist block completely
    content = content.replace(/\/\* Neo-Brutalist Overrides \*\/[\s\S]*$/g, '');

    // Replace the neo-brutalist injects
    content = content.replace(/border: 2px solid #0F172A !important;/g, 'border: none !important;');
    content = content.replace(/box-shadow: 4px 4px 0px #0F172A !important;/g, 'box-shadow: var(--shadow-outset) !important;');
    content = content.replace(/background-color: #FFFFFF !important;/g, 'background-color: var(--bg-primary) !important;');

    // Add Neumorphic Overrides
    content += `\n/* Neumorphic Overrides */
.card, .order-card, .website-card, .dashboard-widget, .stat-card, .modal-content, .action-btn {
    border: none !important;
    background-color: var(--bg-primary) !important;
    box-shadow: var(--shadow-outset) !important;
    border-radius: 12px !important;
    transition: all 0.3s ease !important;
}
.card:hover, .order-card:hover, .website-card:hover, .action-btn:hover {
    transform: translateY(-2px) !important;
    box-shadow: var(--shadow-hover) !important;
}
button {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 600 !important;
    text-transform: none !important;
    background-color: var(--bg-primary) !important;
    box-shadow: var(--shadow-outset) !important;
    color: var(--text-primary) !important;
    border: none !important;
    border-radius: 12px !important;
}
button:active {
    box-shadow: var(--shadow-inset) !important;
}
input, textarea, select {
    background-color: var(--bg-primary) !important;
    border: none !important;
    box-shadow: var(--shadow-inset) !important;
    color: var(--text-primary) !important;
    border-radius: 8px !important;
}
input:focus, textarea:focus, select:focus {
    box-shadow: inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff !important;
}
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated to Neumorphism:', filePath);
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
console.log('Neumorphism overhaul complete!');
