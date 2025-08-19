/**
 * Enhanced Mobile Navigation JavaScript
 * Handles mobile menu interactions, dropdowns, and touch gestures
 */

class MobileNavigation {
    constructor() {
        this.mobileMenuBtn = document.getElementById('m-btn');
        this.mobileMenu = document.getElementById('m-menu');
        this.body = document.body;
        this.isOpen = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.mobileMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // Handle mobile dropdown toggles
        this.setupMobileDropdowns();
        
        // Touch gestures for menu
        this.setupTouchGestures();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    toggleMobileMenu() {
        if (this.isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.isOpen = true;
        this.mobileMenu.classList.add('open');
        this.body.classList.add('menu-open');
        
        // Update button icon
        const icon = this.mobileMenuBtn.querySelector('[data-feather]');
        if (icon) {
            icon.setAttribute('data-feather', 'x');
            feather.replace();
        }
        
        // Focus management
        this.mobileMenu.setAttribute('aria-hidden', 'false');
        const firstFocusable = this.mobileMenu.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
    
    closeMobileMenu() {
        this.isOpen = false;
        this.mobileMenu.classList.remove('open');
        this.body.classList.remove('menu-open');
        
        // Update button icon
        const icon = this.mobileMenuBtn.querySelector('[data-feather]');
        if (icon) {
            icon.setAttribute('data-feather', 'menu');
            feather.replace();
        }
        
        // Focus management
        this.mobileMenu.setAttribute('aria-hidden', 'true');
        this.mobileMenuBtn.focus();
    }
    
    setupMobileDropdowns() {
        const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
        
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const content = btn.nextElementSibling;
                const chevron = btn.querySelector('[data-feather="chevron-down"]');
                
                if (content && content.classList.contains('mobile-dropdown-content')) {
                    const isOpen = !content.classList.contains('hidden');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.mobile-dropdown-content').forEach(item => {
                        if (item !== content) {
                            item.classList.add('hidden');
                            const otherChevron = item.previousElementSibling.querySelector('[data-feather="chevron-down"]');
                            if (otherChevron) {
                                otherChevron.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isOpen) {
                        content.classList.add('hidden');
                        if (chevron) chevron.style.transform = 'rotate(0deg)';
                    } else {
                        content.classList.remove('hidden');
                        if (chevron) chevron.style.transform = 'rotate(180deg)';
                    }
                }
            });
        });
    }
    
    setupTouchGestures() {
        // Swipe to close menu
        this.mobileMenu.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        });
        
        this.mobileMenu.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchEndX - this.touchStartX;
            const deltaY = touchEndY - this.touchStartY;
            
            // Check if it's a horizontal swipe (more horizontal than vertical)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX < -50) { // Swipe left to close
                    this.closeMobileMenu();
                }
            }
        });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Close menu with Escape key
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMobileMenu();
            }
            
            // Handle Tab navigation within menu
            if (e.key === 'Tab' && this.isOpen) {
                const focusableElements = this.mobileMenu.querySelectorAll(
                    'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }
    
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 1024 && this.isOpen) {
            this.closeMobileMenu();
        }
    }
}

// Search functionality
class MobileSearch {
    constructor() {
        this.searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
        this.init();
    }
    
    init() {
        this.searchInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('search-focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('search-focused');
            });
            
            // Handle search on mobile
            input.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        });
    }
    
    handleSearch(query) {
        // Implement search functionality
        console.log('Searching for:', query);
        // You can implement actual search logic here
    }
}

// Smooth scrolling for mobile
class MobileSmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#' && href !== '#!') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const headerHeight = document.querySelector('header')?.offsetHeight || 60;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// Initialize mobile features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    new MobileNavigation();
    
    // Initialize mobile search
    new MobileSearch();
    
    // Initialize smooth scrolling
    new MobileSmoothScroll();
    
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Handle loading states
    setTimeout(() => {
        document.body.classList.remove('is-loading');
    }, 100);
    
    // Add mobile-specific classes based on device
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Force a repaint to handle iOS viewport issues
            document.body.style.height = window.innerHeight + 'px';
            setTimeout(() => {
                document.body.style.height = '';
            }, 100);
        }, 100);
    });
});

// Utility functions for mobile optimization
const MobileUtils = {
    // Check if device is mobile
    isMobile: () => window.innerWidth <= 768,
    
    // Check if device is tablet
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    
    // Check if device is touch-enabled
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Prevent zoom on iOS when focusing inputs
    preventIOSZoom: () => {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"], textarea');
            inputs.forEach(input => {
                if (parseFloat(getComputedStyle(input).fontSize) < 16) {
                    input.style.fontSize = '16px';
                }
            });
        }
    },
    
    // Throttle function for performance
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MobileNavigation, MobileSearch, MobileSmoothScroll, MobileUtils };
}
