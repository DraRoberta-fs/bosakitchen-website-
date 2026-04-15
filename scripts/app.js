// Always open at the top — clear any hash and force scroll on full load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    // Strip the hash so the browser doesn't anchor to #contact or any section
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
});

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

        // Nav links: white at top → charcoal on scroll (mobile always white on brown panel)
        navAnchors.forEach(a => {
            a.style.color = (isMobile || !isScrolled) ? '#ffffff' : '#2D3436';
        });

        // Reservation: white at top → orange on scroll (always orange on mobile)
        if (btnReservation) {
            const color = (!isMobile && !isScrolled) ? '#ffffff' : '#E67E22';
            btnReservation.style.color       = color;
            btnReservation.style.borderColor = color;
        }

        // Order Now: always solid orange
        if (btnOrder) {
            btnOrder.style.backgroundColor = '#E67E22';
            btnOrder.style.color           = '#ffffff';
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
