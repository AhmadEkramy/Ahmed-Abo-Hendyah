// DOM Elements
const langToggle = document.querySelector('.lang-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const aboutSection = document.querySelector('.about');
const projectsSection = document.querySelector('.projects');

// About Section Glow Effect
aboutSection.addEventListener('mousemove', (e) => {
    const rect = aboutSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    aboutSection.style.setProperty('--x', `${x}%`);
    aboutSection.style.setProperty('--y', `${y}%`);
});

// Projects Section Glow Effect
projectsSection.addEventListener('mousemove', (e) => {
    const rect = projectsSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    projectsSection.style.setProperty('--x', `${x}%`);
    projectsSection.style.setProperty('--y', `${y}%`);
});

// Language Toggle
let currentLang = 'en';

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    updateLanguage();
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
}

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenu.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements that need animation
document.querySelectorAll('.about-text, .about-image, .project-card').forEach(el => {
    observer.observe(el);
});

// Animate project cards when they come into view
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Handle initial language state
updateLanguage();

// Handle page load animations
window.addEventListener('load', () => {
    document.querySelector('.hero-content').style.opacity = '1';
    document.querySelector('.hero-content').style.transform = 'translateY(0)';
});

// Handle resize events for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});