document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        applyNavColors();
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
        const isMobile   = window.innerWidth <= 992;
        const isScrolled = window.scrollY > 50;

        navAnchors.forEach(a => {
            if (isMobile) {
                // Mobile menu panel is brown — white links
                a.style.color = '#ffffff';
            } else if (isScrolled) {
                // Cream header — charcoal links
                a.style.color = '#2D3436';
            } else {
                // Transparent header — white links
                a.style.color = '#ffffff';
            }
            a.style.transition = 'color 0.3s ease-in-out';
        });

        // Buttons: orange always, regardless of scroll or breakpoint
        if (btnReservation) {
            btnReservation.style.backgroundColor = 'transparent';
            btnReservation.style.color = '#E67E22';
            btnReservation.style.border = '2px solid #E67E22';
            btnReservation.style.transition = 'background-color 0.3s ease-in-out';
        }
        if (btnOrder) {
            btnOrder.style.backgroundColor = '#E67E22';
            btnOrder.style.color = '#ffffff';
            btnOrder.style.border = 'none';
            btnOrder.style.transition = 'background-color 0.3s ease-in-out';
        }
    }

    // Apply immediately on load — inline styles beat any CSS rule
    applyNavColors();

    window.addEventListener('resize', applyNavColors);

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
