// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ===== Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Link Highlighting =====
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});


// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .education-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Add fade-in animation on scroll =====
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.skill-category, .timeline-item, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// ===== Gallery View More Button =====
const viewMoreBtn = document.getElementById('view-more-btn');
const galleryGrid = document.querySelector('.gallery-grid');

if (viewMoreBtn && galleryGrid) {
    viewMoreBtn.addEventListener('click', () => {
        const isExpanded = galleryGrid.classList.contains('show-all');
        
        if (isExpanded) {
            // Collapse - show only first 6 items
            galleryGrid.classList.remove('show-all');
            viewMoreBtn.textContent = 'View More';
            
            // Scroll to gallery section smoothly
            setTimeout(() => {
                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            // Expand - show all items
            galleryGrid.classList.add('show-all');
            viewMoreBtn.textContent = 'View Less';
        }
    });
}

// ===== Gallery Lightbox Modal =====
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCounter = document.getElementById('lightbox-counter');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryImages = Array.from(galleryItems)
    .map(item => item.querySelector('.gallery-img'))
    .filter(Boolean);

let currentLightboxIndex = 0;

function updateLightboxCounter() {
    if (!lightboxCounter || !galleryImages.length) return;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
}

function openLightbox(index) {
    if (!lightboxModal || !lightboxImage || !galleryImages.length) return;

    currentLightboxIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentLightboxIndex];

    lightboxImage.classList.remove('slide-next', 'slide-prev');
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    updateLightboxCounter();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
}

function showLightboxImage(index, direction) {
    if (!lightboxImage || !galleryImages.length) return;

    currentLightboxIndex = ((index % galleryImages.length) + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentLightboxIndex];

    lightboxImage.classList.remove('slide-next', 'slide-prev');
    void lightboxImage.offsetWidth;
    lightboxImage.classList.add(direction === 'prev' ? 'slide-prev' : 'slide-next');

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    updateLightboxCounter();
}

function showNextImage() {
    showLightboxImage(currentLightboxIndex + 1, 'next');
}

function showPrevImage() {
    showLightboxImage(currentLightboxIndex - 1, 'prev');
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

// Use pointerdown so hover/layout shifts can't steal the click and close the modal
function bindNavAction(element, action) {
    if (!element) return;
    element.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        action();
    });
    element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}

bindNavAction(lightboxPrev, showPrevImage);
bindNavAction(lightboxNext, showNextImage);
bindNavAction(lightboxClose, closeLightbox);

if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
        // Only close when clicking the dark backdrop, never the viewer/controls
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
});
