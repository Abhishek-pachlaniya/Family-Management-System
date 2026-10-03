const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'src', 'styles');

function processFile(filePath) {
    if (!filePath.endsWith('.css')) return;
    if (filePath.includes('App.css') || filePath.includes('index.css') || filePath.includes('about.css') || filePath.includes('intro.css')) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Remove the previously appended SaaS block completely
    content = content.replace(/\/\* Clean Enterprise SaaS Overrides \*\/[\s\S]*$/g, '');

    // Add Animated Glassmorphism Overrides
    content += `\n/* Animated Glassmorphism Overrides */
.card, .order-card, .website-card, .dashboard-widget, .stat-card, .modal-content, .action-btn {
    border: 1px solid var(--card-border) !important;
    background-color: var(--card-bg) !important;
    backdrop-filter: blur(12px) !important;
    -webkit-backdrop-filter: blur(12px) !important;
    box-shadow: 0 4px 15px var(--shadow-color) !important;
    border-radius: 16px !important;
    transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s ease !important;
}
.card:hover, .order-card:hover, .website-card:hover, .action-btn:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 10px 25px var(--glow-color) !important;
}
button {
    font-family: 'Poppins', sans-serif !important;
    font-weight: 600 !important;
    background: linear-gradient(45deg, var(--primary-color), var(--primary-hover)) !important;
    color: #FFFFFF !important;
    border: none !important;
    border-radius: 50px !important;
    box-shadow: 0 4px 15px var(--glow-color) !important;
    transition: all 0.3s ease !important;
}
button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px var(--glow-color) !important;
}
input, textarea, select {
    background-color: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid var(--card-border) !important;
    backdrop-filter: blur(4px) !important;
    color: var(--heading-color) !important;
    border-radius: 8px !important;
    padding: 0.8rem 1rem !important;
    transition: all 0.3s ease !important;
}
input:focus, textarea:focus, select:focus {
    outline: none !important;
    border-color: var(--primary-color) !important;
    box-shadow: 0 0 0 3px var(--glow-color) !important;
    background-color: rgba(255, 255, 255, 0.2) !important;
}
`;

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated to Glassmorphism:', filePath);
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
console.log('Glassmorphism overhaul complete!');
