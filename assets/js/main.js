document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initMobileNav();
    initNavbarScroll();
});

// Theme Management
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    
    // Check localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);
}

// RTL Management
function initRTL() {
    const rtlBtn = document.getElementById('rtl-toggle');
    const mobileRtlBtn = document.getElementById('mobile-rtl-toggle');
    
    const currentDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', currentDir);
    
    const toggleRTL = () => {
        const current = document.documentElement.getAttribute('dir');
        const newDir = current === 'ltr' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    };

    if (rtlBtn) rtlBtn.addEventListener('click', toggleRTL);
    if (mobileRtlBtn) mobileRtlBtn.addEventListener('click', toggleRTL);
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');
    const dashboardSidebar = document.getElementById('dashboard-sidebar');
    const closeBtns = drawer?.querySelectorAll('.mobile-nav-link:not(#mobile-home-dropdown-btn)');

        if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (dashboardSidebar) {
                // On dashboard, toggle the dashboard sidebar
                dashboardSidebar.classList.toggle('open');
                document.body.style.overflow = dashboardSidebar.classList.contains('open') ? 'hidden' : '';
            } else if (drawer) {
                // On other pages, toggle the mobile drawer
                drawer.classList.toggle('open');
                document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
            }
        });

        const mobileHomeBtn = document.getElementById('mobile-home-dropdown-btn');
        const mobileHomeMenu = document.getElementById('mobile-home-dropdown-menu');
        if (mobileHomeBtn && mobileHomeMenu) {
            mobileHomeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isExpanded = mobileHomeMenu.style.display === 'flex';
                mobileHomeMenu.style.display = isExpanded ? 'none' : 'flex';
                const arrow = mobileHomeBtn.querySelector('.dropdown-arrow');
                if (arrow) arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        }

        if (closeBtns) {
            closeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (drawer) {
                        drawer.classList.remove('open');
                        document.body.style.overflow = '';
                    }
                });
            });
        }
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}
