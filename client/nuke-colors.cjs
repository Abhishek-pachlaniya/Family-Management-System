const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'src', 'styles');

function processFile(filePath) {
    if (!filePath.endsWith('.css')) return;
    if (filePath.includes('App.css') || filePath.includes('intro.css') || filePath.includes('about.css')) return;

    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    // Nuke light backgrounds: #f..., #e..., #d..., #fff...
    content = content.replace(/background(-color)?\s*:\s*#[A-Fa-f0-9]{3,6}\s*(!important)?\s*;/gi, 'background: transparent;');
    
    // Nuke dark text colors: #0..., #1..., #2..., #3...
    content = content.replace(/color\s*:\s*#[0-5][A-Fa-f0-9]{2,5}\s*(!important)?\s*;/gi, 'color: var(--text-primary);');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Nuked hardcoded colors in:', filePath);
    }
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
console.log('Nuking complete!');
