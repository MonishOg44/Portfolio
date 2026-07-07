document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       Sticky Navbar
       ========================================= */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       Scroll Reveal Animation
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* =========================================
       Contact Form Validation & Redirection
       ========================================= */
    const form = document.getElementById('contact-form');
    
    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (form.checkValidity()) {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Save contact details to localStorage
                const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                submissions.push({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toLocaleString()
                });
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving & Redirecting...';
                btn.disabled = true;
                
                setTimeout(() => {
                    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSdDcK1Eqq2I7DU5XZivsB33QCMqumLoWVTdE2Hcx1g67pgRZQ/viewform?usp=dialog";
                }, 1000);
            }
            
            form.classList.add('was-validated');
        }, false);
    }
});
