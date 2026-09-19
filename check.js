const fs = require('fs');
const files = ['index.html','home-2.html','about.html','classes.html','membership.html','resources.html','community.html','contact.html','dashboard.html','login.html'];
const missing = files.filter(f => fs.existsSync(f) && !fs.readFileSync(f, 'utf8').includes('id="mobile-drawer"'));
console.log(missing);
