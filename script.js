// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Initialize ScrollReveal
const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true
});

// Enhanced Navbar scroll effect
const navbar = document.querySelector('nav');
const menuItems = document.querySelectorAll('.menu a');
let lastScroll = 0;

// Update active menu item based on scroll position
const updateActiveMenuItem = () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Special case for home when at the top
    if (scrollPosition < 100) {
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#home') {
                item.classList.add('active');
            }
        });
    }
};

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add scrolled class to navbar
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveMenuItem();
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ScrollReveal Animations
// Header Section (preserved)
sr.reveal('.h-text h3', { 
    delay: 200,
    origin: 'top',
    distance: '20px',
    duration: 1000
});

sr.reveal('.h-text h1', { 
    delay: 400,
    origin: 'left',
    distance: '40px',
    duration: 1000
});

sr.reveal('.h-text p', { 
    delay: 600,
    origin: 'right',
    distance: '40px',
    duration: 1000
});

// Section Headers
sr.reveal('.section-header', {
    origin: 'top',
    distance: '40px',
    duration: 1000
});

// Experience Cards
sr.reveal('.experience-card', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    interval: 200
});

// Destination Cards
sr.reveal('.destination-card', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    interval: 200
});

// Package Cards
sr.reveal('.package-card', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    interval: 200
});

// Contact Section
sr.reveal('.contact-info', {
    origin: 'left',
    distance: '40px',
    duration: 1000
});

sr.reveal('.contact-form', {
    origin: 'right',
    distance: '40px',
    duration: 1000
});

// Footer Sections
sr.reveal('.footer-info', {
    origin: 'bottom',
    distance: '30px',
    duration: 1000
});

sr.reveal('.footer-links', {
    origin: 'bottom',
    distance: '30px',
    duration: 1000,
    delay: 200
});

sr.reveal('.footer-newsletter', {
    origin: 'bottom',
    distance: '30px',
    duration: 1000,
    delay: 400
});

// Add hover effects to cards
const addHoverEffect = (elements, effect = 'translateY') => {
    elements.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (effect === 'translateY') {
                card.style.transform = 'translateY(-10px)';
            } else if (effect === 'scale') {
                card.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
};

// Apply hover effects
addHoverEffect(document.querySelectorAll('.experience-card'));
addHoverEffect(document.querySelectorAll('.destination-card'));
addHoverEffect(document.querySelectorAll('.package-card'));

// Image lazy loading with blur effect
const lazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '50px'
    };

    const preloadImage = (img) => {
        const src = img.getAttribute('data-src');
        if (!src) return;

        img.style.filter = 'blur(5px)';
        img.src = src;
        
        img.onload = () => {
            img.style.filter = 'none';
            img.style.transition = 'filter 0.5s ease';
            img.removeAttribute('data-src');
        };
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoad);

// Function to handle messages and form reset
const handleFormMessage = (form, successMsg, errorMsg, isSuccess) => {
    const message = isSuccess ? successMsg : errorMsg;
    const otherMessage = isSuccess ? errorMsg : successMsg;
    
    // Hide any existing messages
    otherMessage.classList.remove('show');
    // Show new message
    message.classList.add('show');
    
    // Reset form and message after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
        if (isSuccess) {
            // Redirect on success
            window.location.href = 'https://web3forms.com/success';
        } else {
            // Just reset the form on error
            form.reset();
        }
    }, 5000);
};

// Handle contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('contactSuccess');
        const errorMsg = document.getElementById('contactError');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(this);
            formData.append('timestamp', new Date().toISOString());
            
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                handleFormMessage(this, successMsg, errorMsg, true);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            handleFormMessage(this, successMsg, errorMsg, false);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('ri-menu-line');
        menuToggle.querySelector('i').classList.toggle('ri-close-line');
    });

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('ri-menu-line');
            menuToggle.querySelector('i').classList.remove('ri-close-line');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (menu && menu.classList.contains('active') && 
        !menu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        menu.classList.remove('active');
        menuToggle.querySelector('i').classList.add('ri-menu-line');
        menuToggle.querySelector('i').classList.remove('ri-close-line');
    }
});