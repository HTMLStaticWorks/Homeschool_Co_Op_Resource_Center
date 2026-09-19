const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newRtlSvg1 = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"></path><path d="M21 7H3"></path><path d="M7 21l-4-4 4-4"></path><path d="M3 17h18"></path></svg>';
const newRtlSvg2 = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"></path><path d="M21 7H3"></path><path d="M7 21l-4-4 4-4"></path><path d="M3 17h18"></path></svg>';
const newRtlSvg3 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"></path><path d="M21 7H3"></path><path d="M7 21l-4-4 4-4"></path><path d="M3 17h18"></path></svg>';

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace RTL icons using Regex for exact matches
    content = content.replace(/<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"\/><\/svg>/g, newRtlSvg1);
    content = content.replace(/<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"\/><\/svg>/g, newRtlSvg2);
    content = content.replace(/<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"\/><\/svg>/g, newRtlSvg3);

    let isHome1Active = file === 'index.html' ? 'active' : '';
    let isHome2Active = file === 'home-2.html' ? 'active' : '';
    let isParentActive = (file === 'index.html' || file === 'home-2.html') ? 'active' : '';

    const dropdownHtml = `
                <div class="nav-item-dropdown">
                    <span class="nav-link ${isParentActive}" style="display:flex; align-items:center; gap:0.25rem;">Home <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
                    <div class="nav-dropdown-menu">
                        <a href="index.html" class="dropdown-link ${isHome1Active}">Home 1</a>
                        <a href="home-2.html" class="dropdown-link ${isHome2Active}">Home 2</a>
                    </div>
                </div>`;

    // Regex to find the <div class="nav-links">...</div> block
    // Specifically looking for the first couple of links to replace
    // We can just replace the <a href="index.html"...>Home</a> and <a href="home-2.html"...>Home 2</a> (if exists)
    
    // Pattern to match Home 1 and Home 2 links with or without active classes
    const homeLinksPattern = /<a href="index\.html" class="nav-link(?: active)?">Home<\/a>(\s*<a href="home-2\.html" class="nav-link(?: active)?">Home 2<\/a>)?/g;
    
    content = content.replace(homeLinksPattern, dropdownHtml.trim());

    fs.writeFileSync(filePath, content);
});
console.log('Update successful.');
