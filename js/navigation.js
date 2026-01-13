// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create burger menu for mobile
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Create burger menu element if it doesn't exist
    if (!document.querySelector('.burger')) {
        const burger = document.createElement('div');
        burger.className = 'burger';
        burger.innerHTML = `
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        `;
        nav.appendChild(burger);
        
        // Add burger styles
        const style = document.createElement('style');
        style.textContent = `
            .burger {
                display: none;
                cursor: pointer;
            }
            .burger div {
                width: 25px;
                height: 3px;
                background-color: white;
                margin: 5px;
                transition: all 0.3s ease;
            }
            @media (max-width: 768px) {
                .burger {
                    display: block;
                }
                .nav-links {
                    position: fixed;
                    right: -100%;
                    top: 80px;
                    flex-direction: column;
                    background: rgba(15, 23, 42, 0.98);
                    backdrop-filter: blur(20px);
                    width: 100%;
                    text-align: center;
                    transition: right 0.3s ease;
                    padding: 20px 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .nav-links.active {
                    right: 0;
                }
                .nav-links li {
                    margin: 20px 0;
                }
                .burger.toggle .line1 {
                    transform: rotate(-45deg) translate(-5px, 6px);
                }
                .burger.toggle .line2 {
                    opacity: 0;
                }
                .burger.toggle .line3 {
                    transform: rotate(45deg) translate(-5px, -6px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    const burger = document.querySelector('.burger');
    
    // Toggle mobile menu
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('toggle');
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        });
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.boxShadow = 'none';
        } else {
            nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            alert('Please fill in all fields before submitting.');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return false;
        }
        
        // If using mailto, show success message
        if (contactForm.getAttribute('action').startsWith('mailto:')) {
            alert('Opening your email client...');
        }
    });
}