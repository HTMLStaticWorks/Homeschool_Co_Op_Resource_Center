const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const footerTemplate = `
    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <a href="index.html" class="brand mb-6" style="display: inline-flex;">
                        <img src="assets/images/logo.svg" alt="Logo" width="40" height="40">
                        <span class="brand-title" style="font-size: 1.1rem;">Homeschool Co-Op</span>
                    </a>
                    <p class="text-sm" style="line-height: 1.6; margin-bottom: 1.5rem;">A community where families learn, share, and grow together. We provide a supportive environment for homeschooling families to collaborate on educational resources, coordinate group classes, and build lasting friendships.</p>
                    
                    <div class="social-icons" style="display: flex; gap: 1rem;">
                        <a href="#" aria-label="Instagram" style="color: var(--text-muted); transition: color 0.3s ease, transform 0.3s ease; display: inline-flex;" onmouseover="this.style.color='#E1306C'; this.style.transform='scale(1.1)';" onmouseout="this.style.color='var(--text-muted)'; this.style.transform='scale(1)';">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </a>
                        <a href="#" aria-label="Facebook" style="color: var(--text-muted); transition: color 0.3s ease, transform 0.3s ease; display: inline-flex;" onmouseover="this.style.color='#1877F2'; this.style.transform='scale(1.1)';" onmouseout="this.style.color='var(--text-muted)'; this.style.transform='scale(1)';">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        </a>
                        <a href="#" aria-label="X (Twitter)" style="color: var(--text-muted); transition: color 0.3s ease, transform 0.3s ease; display: inline-flex;" onmouseover="this.style.color='#000000'; this.style.transform='scale(1.1)';" onmouseout="this.style.color='var(--text-muted)'; this.style.transform='scale(1)';">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="footer-col-title">Explore</h4>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="classes.html">Classes</a></li>
                        <li><a href="community.html">Community</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-col-title">Learning</h4>
                    <ul class="footer-links">
                        <li><a href="resources.html">Resources</a></li>
                        <li><a href="membership.html">Membership</a></li>
                        <li><a href="dashboard.html">Dashboard</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer-col-title">Keep Learning Together</h4>
                    <p class="text-xs mb-4">Receive new class announcements and community updates.</p>
                    <form id="newsletter-form" style="display: flex; flex-direction: column; gap: 0.75rem; width: 100%; max-width: 250px;">
                        <input type="email" placeholder="Email Address" required style="width: 100%; height: 45px; padding: 0 1.25rem; border: 1px solid var(--border); border-radius: 50px; background: transparent; color: var(--text-primary); outline: none; font-family: var(--font-body); font-size: 0.875rem;">
                        <button type="submit" style="width: 100%; height: 45px; padding: 0 1.25rem; border: 1px solid var(--accent-primary); border-radius: 50px; background: transparent; color: var(--accent-primary); font-weight: 500; cursor: pointer; transition: all 0.3s ease; font-family: var(--font-body); font-size: 0.875rem;" onmouseover="this.style.background='var(--accent-primary)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='var(--accent-primary)';">Subscribe</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                &copy; 2026 Homeschool Co-Op & Resource Center. All rights reserved.
            </div>
        </div>
    </footer>`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const footerPattern = /<!-- FOOTER -->[\s\S]*?<\/footer>/;
    if (footerPattern.test(content)) {
        content = content.replace(footerPattern, footerTemplate.trim());
        fs.writeFileSync(filePath, content);
        console.log("Updated footer in " + file);
    } else {
        const fallbackPattern = /<footer class="footer">[\s\S]*?<\/footer>/;
        if (fallbackPattern.test(content)) {
            content = content.replace(fallbackPattern, footerTemplate.trim());
            fs.writeFileSync(filePath, content);
            console.log("Updated footer (fallback) in " + file);
        }
    }
});
