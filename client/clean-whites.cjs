const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'src', 'styles');
const componentsDir = path.join(__dirname, 'src', 'components');

function cleanCSSFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            cleanCSSFiles(fullPath);
        } else if (fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf-8');
            let originalContent = content;

            // Remove hardcoded white/light backgrounds
            content = content.replace(/background(-color)?\s*:\s*(#ffffff|#fff|#f7f9fc|#f5f7fa)\s*(!important)?\s*;/gi, 'background: transparent;');
            
            // Fix any stray white text colors that were meant for dark backgrounds if the background is now transparent, wait no, white text is good for dark mode!
            
            // Remove any remaining :root overrides that mess up the theme
            if (!fullPath.includes('App.css') && !fullPath.includes('intro.css') && !fullPath.includes('about.css')) {
                content = content.replace(/:root\s*\{[^}]+\}/g, '');
            }

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf-8');
                console.log('Cleaned:', fullPath);
            }
        }
    }
}

cleanCSSFiles(stylesDir);
cleanCSSFiles(componentsDir);
console.log('Done cleaning CSS files!');
