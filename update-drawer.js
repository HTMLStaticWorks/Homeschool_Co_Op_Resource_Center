const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the old mobile-drawer
    const drawerRegex = /<!-- MOBILE DRAWER -->[\s\S]*?<\/div>\s*<\/div>/;
    const isHome1Active = file === 'index.html' ? 'active' : '';
    const isHome2Active = file === 'home-2.html' ? 'active' : '';
    const isAboutActive = file === 'about.html' ? 'active' : '';
    const isClassesActive = file === 'classes.html' ? 'active' : '';
    const isMembershipActive = file === 'membership.html' ? 'active' : '';
    const isResourcesActive = file === 'resources.html' ? 'active' : '';
    const isCommunityActive = file === 'community.html' ? 'active' : '';
    const isContactActive = file === 'contact.html' ? 'active' : '';
    const isDashboardActive = file === 'dashboard.html' ? 'active' : '';

    const newDrawerHtml = `<!-- MOBILE DRAWER -->
    <div class="mobile-drawer" id="mobile-drawer">
        <div class="mobile-nav-links">
            <a href="index.html" class="mobile-nav-link ${isHome1Active}">Home</a>
            <a href="home-2.html" class="mobile-nav-link ${isHome2Active}">Home 2</a>
            <a href="about.html" class="mobile-nav-link ${isAboutActive}">About</a>
            <a href="classes.html" class="mobile-nav-link ${isClassesActive}">Classes</a>
            <a href="membership.html" class="mobile-nav-link ${isMembershipActive}">Membership</a>
            <a href="resources.html" class="mobile-nav-link ${isResourcesActive}">Resources</a>
            <a href="community.html" class="mobile-nav-link ${isCommunityActive}">Community</a>
            <a href="contact.html" class="mobile-nav-link ${isContactActive}">Contact</a>
            <a href="dashboard.html" class="mobile-nav-link ${isDashboardActive}">Dashboard</a>
        </div>
        <div class="mobile-nav-actions" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 250px;">
            <a href="login.html" class="btn btn-primary" style="width: 100%; justify-content: center; margin-bottom: 1rem;">Parent Login</a>
            <div class="flex gap-6 justify-center">
                <button class="btn-icon" id="mobile-theme-toggle" aria-label="Toggle Theme">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </button>
                <button class="btn-icon" id="mobile-rtl-toggle" aria-label="Toggle RTL">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10h14" /><path d="M15 6l4 4-4 4" /><path d="M19 14H5" /><path d="M9 10l-4 4 4 4" /></svg>
                </button>
            </div>
        </div>
    </div>`;

    if (drawerRegex.test(content)) {
        content = content.replace(drawerRegex, newDrawerHtml);
        fs.writeFileSync(filePath, content);
    }
});
console.log('Mobile drawer updated across all files.');
