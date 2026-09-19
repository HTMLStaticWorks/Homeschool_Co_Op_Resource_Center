const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    content = content.replace(/<\/button>\s*<\/div>\s*<main>/, '</button>\n            </div>\n        </div>\n    </div>\n\n    <main>');
    content = content.replace(/<\/button>\s*<\/div>\s*<div class="dashboard-layout">/, '</button>\n            </div>\n        </div>\n    </div>\n\n    <div class="dashboard-layout">');

    fs.writeFileSync(filePath, content);
});
console.log('Fixed missing closing divs');
