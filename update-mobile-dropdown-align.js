const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // We'll replace the entire .mobile-nav-item-dropdown div.
    const regex = /<div class="mobile-nav-item-dropdown">[\s\S]*?<\/div>\s*<\/div>/;
    
    // Actually, wait, the previous script inserted:
    /*
    <div class="mobile-nav-item-dropdown">
        <button class="mobile-nav-link ..." id="mobile-home-dropdown-btn" ...>
            ...
        </button>
        <div class="mobile-nav-dropdown-menu" id="mobile-home-dropdown-menu" ...>
            ...
        </div>
    </div>
    */
    
    // Let's use a safer regex to match the exact block we inserted before.
    const replaceRegex = /<div class="mobile-nav-item-dropdown">[\s\S]*?<div class="mobile-nav-dropdown-menu" id="mobile-home-dropdown-menu"[\s\S]*?<\/div>\s*<\/div>/;

    content = content.replace(replaceRegex, (match) => {
        // Extract the active states from the existing block
        const isIndexActive = match.includes('href="index.html" class="mobile-nav-link active"') ? 'active' : '';
        const isHome2Active = match.includes('href="home-2.html" class="mobile-nav-link active"') ? 'active' : '';
        const isEitherActive = (isIndexActive || isHome2Active) ? 'active' : '';

        return `<div class="mobile-nav-item-dropdown" style="display: flex; flex-direction: column; align-items: center;">
                <button class="mobile-nav-link ${isEitherActive}" id="mobile-home-dropdown-btn" style="display:flex; justify-content:center; align-items:center; gap: 0.5rem; background:none; border:none; cursor:pointer; padding: 0;">
                    <span>Home</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-arrow" style="transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div class="mobile-nav-dropdown-menu" id="mobile-home-dropdown-menu" style="display: none; flex-direction: column; align-items: center; gap: 1rem; margin-top: 1rem;">
                    <a href="index.html" class="mobile-nav-link ${isIndexActive}" style="font-size: 1.5rem; color: var(--text-secondary);">Home 1</a>
                    <a href="home-2.html" class="mobile-nav-link ${isHome2Active}" style="font-size: 1.5rem; color: var(--text-secondary);">Home 2</a>
                </div>
            </div>`;
    });

    fs.writeFileSync(filePath, content);
});
console.log('Mobile dropdown alignment updated.');
