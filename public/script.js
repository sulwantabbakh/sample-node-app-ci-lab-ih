// DevOps Bootcamp Showcase JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DevOps Bootcamp Showcase loaded successfully!');
    
    // Initialize all functionality
    initializeNavigation();
    initializeAnimations();
    initializeHealthCheck();
    initializePerformanceMonitoring();
    initializeErrorHandling();
});

/**
 * Initialize smooth scrolling navigation
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    console.log('✅ Navigation initialized');
}

/**
 * Initialize scroll animations and interactive elements
 */
function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    console.log('✅ Animations initialized');
}

/**
 * Add enhanced hover effects
 */
function addHoverEffects() {
    const cards = document.querySelectorAll('.stat, .skill, .project, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Initialize health check functionality
 */
function initializeHealthCheck() {
    // Add health check status to footer
    const footer = document.querySelector('footer');
    const healthStatus = document.createElement('div');
    healthStatus.className = 'health-status';
    healthStatus.innerHTML = '<span class="loading"></span> Checking application health...';
    footer.appendChild(healthStatus);
    
    // Check health endpoint
    fetch('/health')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                healthStatus.innerHTML = '✅ Application is healthy';
                healthStatus.style.color = '#4CAF50';
                console.log('🟢 Health check passed:', data);
            } else {
                throw new Error('Health check failed');
            }
        })
        .catch(error => {
            healthStatus.innerHTML = '❌ Health check failed';
            healthStatus.style.color = '#f44336';
            console.error('🔴 Health check failed:', error);
        });
    
    console.log('✅ Health check initialized');
}

/**
 * Initialize performance monitoring
 */
function initializePerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', function() {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`📊 Page load time: ${pageLoadTime}ms`);
        
        // Track resource loading
        const resources = performance.getEntriesByType('resource');
        resources.forEach(resource => {
            if (resource.duration > 1000) {
                console.warn(`⚠️ Slow resource: ${resource.name} took ${resource.duration}ms`);
            }
        });
        
        // Send performance metrics (in real app, this would go to analytics)
        console.log('📈 Performance metrics collected');
    });
    
    // Track user interactions
    trackUserInteractions();
    
    console.log('✅ Performance monitoring initialized');
}

/**
 * Track user interactions for analytics
 */
function trackUserInteractions() {
    // Track navigation clicks
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            console.log(`🔗 Navigation: ${this.textContent.trim()}`);
        });
    });
    
    // Track section visibility
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`👁️ Section viewed: ${entry.target.id}`);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Initialize error handling and logging
 */
function initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(event) {
        console.error('🚨 JavaScript Error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });
        
        // In real app, send to error tracking service
        logError('JavaScript Error', event.message);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        console.error('🚨 Unhandled Promise Rejection:', event.reason);
        logError('Promise Rejection', event.reason);
    });
    
    console.log('✅ Error handling initialized');
}

/**
 * Log errors to console (in real app, would send to service)
 */
function logError(type, message) {
    const errorData = {
        type: type,
        message: message,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    console.log('📋 Error logged:', errorData);
}

/**
 * Utility functions
 */
const Utils = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Make utils available globally for testing
window.DevOpsUtils = Utils;

// Add some interactive features for demo purposes
document.addEventListener('DOMContentLoaded', function() {
    // Add click counter for engagement tracking
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        if (clickCount % 10 === 0) {
            console.log(`🎯 User engagement: ${clickCount} clicks`);
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + H for health check
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = '/health';
        }
        
        // Alt + T for top
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        initializeNavigation,
        initializeAnimations,
        initializeHealthCheck,
        initializePerformanceMonitoring,
        initializeErrorHandling
    };
}

console.log('🔧 DevOps Bootcamp Showcase script loaded and ready!');