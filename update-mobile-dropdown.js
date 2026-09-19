const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the specific mobile drawer Home 1 / Home 2 links
    const regex = /<a href="index\.html" class="mobile-nav-link\s*(active)?">Home<\/a>\s*<a href="home-2\.html" class="mobile-nav-link\s*(active)?">Home 2<\/a>/;
    
    content = content.replace(regex, (match, active1, active2) => {
        const isIndexActive = active1 === 'active' ? 'active' : '';
        const isHome2Active = active2 === 'active' ? 'active' : '';
        const isEitherActive = (isIndexActive || isHome2Active) ? 'active' : '';

        return `<div class="mobile-nav-item-dropdown">
                <button class="mobile-nav-link ${isEitherActive}" id="mobile-home-dropdown-btn" style="width:100%; display:flex; justify-content:space-between; align-items:center; background:none; border:none; text-align:left; font:inherit; cursor:pointer;">
                    <span>Home</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-arrow" style="transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="mobile-nav-dropdown-menu" id="mobile-home-dropdown-menu" style="display: none; flex-direction: column; padding-left: 1.5rem; padding-top: 0.5rem; gap: 0.5rem; border-left: 2px solid var(--border-light); margin-left: 1rem; margin-top: 0.5rem;">
                    <a href="index.html" class="mobile-nav-link ${isIndexActive}" style="padding: 0.5rem 0; font-size: 1rem;">Home 1</a>
                    <a href="home-2.html" class="mobile-nav-link ${isHome2Active}" style="padding: 0.5rem 0; font-size: 1rem;">Home 2</a>
                </div>
            </div>`;
    });

    fs.writeFileSync(filePath, content);
});
console.log('Mobile dropdown updated.');
