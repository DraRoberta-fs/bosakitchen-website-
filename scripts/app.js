document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const navAnchors = navbar.querySelectorAll('a:not(.btn-primary):not(.btn-secondary):not(.logo)');
    const btnReservation = navbar.querySelector('.btn-secondary');
    const btnOrder = navbar.querySelector('.btn-primary');

    function applyNavColors() {
        // Regular links — always white
        navAnchors.forEach(a => {
            a.style.color = '#ffffff';
            a.style.transition = 'none';
        });
        // Reservation — transparent bg, orange border + text
        if (btnReservation) {
            btnReservation.style.backgroundColor = 'transparent';
            btnReservation.style.color = '#E67E22';
            btnReservation.style.border = '2px solid #E67E22';
            btnReservation.style.transition = 'none';
        }
        // Order Now — solid orange, white text
        if (btnOrder) {
            btnOrder.style.backgroundColor = '#E67E22';
            btnOrder.style.color = '#ffffff';
            btnOrder.style.border = 'none';
            btnOrder.style.transition = 'none';
        }
    }

    // Apply immediately on load — inline styles beat any CSS rule
    applyNavColors();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Re-apply after every scroll tick to prevent any flash
        applyNavColors();
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');
    animateElements.forEach(el => observer.observe(el));
    
    // Trigger animations for elements already in view on load
    setTimeout(() => {
        document.querySelectorAll('.hero-content .fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});
