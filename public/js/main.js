// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate metrics counter
function animateNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        const target = number.innerText;
        let current = 0;
        const increment = target.includes('M') ? 0.1 : 1;
        const duration = 2000; // 2 seconds
        const steps = duration / 16; // 60fps
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseFloat(target)) {
                number.innerText = target;
                clearInterval(timer);
            } else {
                number.innerText = current.toFixed(1) + (target.includes('M') ? 'M+' : '%');
            }
        }, duration / steps);
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('metrics')) {
                animateNumbers();
            }
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature, .tech-card, .metric-card').forEach(el => {
    observer.observe(el);
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const confirmation = document.getElementById('form-confirmation');
        confirmation.style.display = 'block';
        confirmation.textContent = 'Thank you for your message! We will get back to you shortly.';
        contactForm.reset();
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 5000);
    });
} 