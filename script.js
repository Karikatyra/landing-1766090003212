document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            // Change icon to 'X'
            mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            // Change icon back to 'Menu'
            mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        }
        lucide.createIcons();
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Navbar scroll effect (optional shadow on scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // Form Submission Handling (Prevent default for demo)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Simulate loading state
            btn.innerText = 'Отправка...';
            btn.disabled = true;
            btn.classList.add('opacity-75');

            setTimeout(() => {
                btn.innerText = 'Успешно отправлено!';
                btn.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
                btn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.remove('opacity-75', 'bg-green-600', 'hover:bg-green-700');
                    btn.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
                }, 3000);
            }, 1500);
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to major sections
    const sections = document.querySelectorAll('section > div');
    sections.forEach(section => {
        // Only if it doesn't already have animation classes
        if (!section.querySelector('.animate-fade-in-up')) {
            section.classList.add('opacity-0'); // Hide initially
            section.classList.add('transition-opacity'); 
            // We use a manual class toggle via JS for these sections instead of CSS animation
            // to ensure they appear when scrolled to
            observer.observe(section);
            
            // Override the observer for these specific blocks to just use the CSS animation class defined
            section.classList.remove('opacity-0', 'transition-opacity');
            // Actually, let's just let the CSS animation handle the specific hero elements
            // and use this observer for generic section fade-ins if needed.
            // For this template, I'll rely on the specific classes added in HTML.
        }
    });
});