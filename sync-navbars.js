const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const navbarTemplate = (fileName) => `
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="index.html" class="brand">
                <img src="assets/images/logo.svg" alt="Homeschool Co-Op Logo" class="brand-logo">
                <div class="brand-text-wrapper">
                    <span class="brand-title">Homeschool Co-Op</span>
                    <span class="brand-subtitle">Resource Center</span>
                </div>
            </a>
            <div class="nav-links">
                <div class="nav-item-dropdown">
                    <span class="nav-link ${fileName === 'index.html' || fileName === 'home-2.html' ? 'active' : ''}" style="display:flex; align-items:center; gap:0.25rem;">Home <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
                    <div class="nav-dropdown-menu">
                        <a href="index.html" class="dropdown-link ${fileName === 'index.html' ? 'active' : ''}">Home 1</a>
                        <a href="home-2.html" class="dropdown-link ${fileName === 'home-2.html' ? 'active' : ''}">Home 2</a>
                    </div>
                </div>
                <a href="about.html" class="nav-link ${fileName === 'about.html' ? 'active' : ''}">About</a>
                <a href="classes.html" class="nav-link ${fileName === 'classes.html' ? 'active' : ''}">Classes</a>
                <a href="membership.html" class="nav-link ${fileName === 'membership.html' ? 'active' : ''}">Membership</a>
                <a href="resources.html" class="nav-link ${fileName === 'resources.html' ? 'active' : ''}">Resources</a>
                <a href="community.html" class="nav-link ${fileName === 'community.html' ? 'active' : ''}">Community</a>
                <a href="contact.html" class="nav-link ${fileName === 'contact.html' ? 'active' : ''}">Contact</a>
                <a href="dashboard.html" class="nav-link ${fileName === 'dashboard.html' ? 'active' : ''}">Dashboard</a>
            </div>
            <div class="nav-actions">
                <button class="btn-icon" id="theme-toggle" aria-label="Toggle Theme">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                </button>
                <button class="btn-icon" id="rtl-toggle" aria-label="Toggle RTL">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                </button>
                <a href="login.html" class="btn btn-secondary">Login</a>
            </div>
            <button class="hamburger" id="hamburger" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const navPattern = /<nav class="navbar" id="navbar">[\s\S]*?<\/nav>/;
    
    if (navPattern.test(content)) {
        content = content.replace(navPattern, navbarTemplate(file).trim());
    } else {
        // If it doesn't have the navbar, inject it right after <body>
        content = content.replace(/<body[^>]*>/i, match => match + '\n    ' + navbarTemplate(file).trim());
    }
    
    // Specifically for login.html, add padding to auth-split to account for navbar
    if (file === 'login.html') {
        if (!content.includes('padding-top: 80px;')) {
            content = content.replace('.auth-split {', '.auth-split {\n            padding-top: 80px;');
        }
    }
    
    // For dashboard.html, adjust sidebar top to sit under navbar
    if (file === 'dashboard.html') {
        if (!content.includes('top: 76px;')) {
             content = content.replace('.sidebar {', '.sidebar {\n            top: 76px;\n            height: calc(100vh - 76px);');
        }
        // Remove old mobile header to avoid duplication
        content = content.replace(/<!-- Mobile Header -->[\s\S]*?<\/div>\s*<div class="dashboard-layout">/, '<div class="dashboard-layout">');
        content = content.replace(/<div class="mobile-header">[\s\S]*?<\/div>\s*<div class="dashboard-layout">/, '<div class="dashboard-layout">');
    }

    fs.writeFileSync(filePath, content);
});

console.log('Navbar successfully synced across all pages!');
