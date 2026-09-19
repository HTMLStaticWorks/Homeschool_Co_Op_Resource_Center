const fs = require('fs');

const drawerHtml = fs.readFileSync('drawer.txt', 'utf8').trim() + '\n\n';
const files = ['classes.html','membership.html','resources.html','community.html','contact.html','dashboard.html','login.html'];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('id="mobile-drawer"')) {
            content = content.replace(/<\/nav>\r?\n/, `</nav>\n\n    ${drawerHtml}`);
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        }
    }
}
