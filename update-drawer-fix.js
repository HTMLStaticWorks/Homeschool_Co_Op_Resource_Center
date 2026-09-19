const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix the duplicate closing div caused by the previous replacement
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<main>/, '    </div>\n\n    <main>');
    
    // Also cover files without <main> or different spaces
    content = content.replace(/<\/div>\n    <\/div>\n\n    <main>/, '<\/div>\n\n    <main>');
    content = content.replace(/<\/div>\s*<\/div>\s*<main>/, '</div>\n\n    <main>');
    content = content.replace(/id="mobile-drawer">[\s\S]*?<\/div>\n    <\/div>\n    <\/div>/, match => {
        return match.substring(0, match.lastIndexOf('</div>')).trimEnd() + '\n';
    });

    // Actually, the most reliable way is to find exactly:
    // </div>
    // </div>
    //
    // <main> (or whatever comes next)
    // Let's just do:
    content = content.replace(/<\/div>\s*<\/div>\s*<main>/g, '<\/div>\n\n    <main>');
    content = content.replace(/<\/div>\s*<\/div>\s*<div class="dashboard-layout">/g, '<\/div>\n\n    <div class="dashboard-layout">');

    fs.writeFileSync(filePath, content);
});
console.log('Fixed extra closing divs');
