// Smooth scrolling for table of contents links
document.addEventListener('DOMContentLoaded', function() {
    // Table of Contents smooth scrolling
    const tocLinks = document.querySelectorAll('.toc-link');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 90; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create and configure the salary distribution chart
    const ctx = document.getElementById('salaryChart').getContext('2d');
    
    const salaryChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [
                'Basic Salary (45%)',
                'HRA (20%)',
                'Special Allowance (15%)',
                'Transport Allowance (5%)',
                'Medical Allowance (5%)',
                'PF Contribution (10%)'
            ],
            datasets: [{
                data: [45, 20, 15, 5, 5, 10],
                backgroundColor: [
                    '#007bff',
                    '#28a745',
                    '#ffc107',
                    '#dc3545',
                    '#6f42c1',
                    '#20c997'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Typical Salary Component Distribution',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            },
            layout: {
                padding: 10
            }
        }
    });
    
    // Add interactive elements for info boxes
    const infoBoxes = document.querySelectorAll('.info-box');
    infoBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add scroll spy for table of contents
    function updateActiveLink() {
        const sections = document.querySelectorAll('.content-section');
        const tocLinks = document.querySelectorAll('.toc-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.fontWeight = '600';
                link.style.color = '#0056b3';
            } else {
                link.style.fontWeight = '500';
                link.style.color = '#007bff';
            }
        });
    }
    
    // Update active link on scroll with throttle
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveLink, 100);
    });
    
    // Initial call to set active link
    updateActiveLink();
    
    // Add loading animation for chart
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartContainer.style.opacity = '0';
        chartContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chartContainer.style.transition = 'all 0.6s ease';
            chartContainer.style.opacity = '1';
            chartContainer.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add click tracking for CTA buttons (for analytics)
    const ctaButtons = document.querySelectorAll('.cta-button, .sidebar-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log(`CTA clicked: ${buttonText}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Here you could add actual analytics tracking
            // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': buttonText });
        });
    });
    
    // Add hover effects for popular reads
    const popularLinks = document.querySelectorAll('.popular-link');
    popularLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.paddingLeft = '8px';
            this.style.transition = 'all 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.paddingLeft = '0';
        });
    });
    
    // Lazy loading for images (if needed for future images)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add reading progress indicator
    function createReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 70px;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #007bff, #0056b3);
            z-index: 999;
            transition: width 0.2s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }
    
    createReadingProgress();
    
    // Add keyboard navigation for better accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('click', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Add CSS for keyboard navigation
const keyboardCSS = document.createElement('style');
keyboardCSS.textContent = `
    body.keyboard-navigation *:focus {
        outline: 2px solid #007bff !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardCSS);

// Print functionality
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        // Expand all collapsed sections if any
        // Hide interactive elements
        document.querySelectorAll('.sidebar-cta').forEach(btn => {
            btn.style.display = 'none';
        });
    });
    
    window.addEventListener('afterprint', function() {
        // Restore interactive elements
        document.querySelectorAll('.sidebar-cta').forEach(btn => {
            btn.style.display = 'block';
        });
    });
}

optimizeForPrint();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
