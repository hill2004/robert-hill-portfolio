// Select HTML Elements
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');

// Mobile Menu Toggle
if (menu && navbar) {
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

// Scroll Effects
window.addEventListener('scroll', () => {

    // Close mobile menu when scrolling
    if (menu && navbar) {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    // Header Shadow Effect
    if (header) {
        header.classList.toggle('shadow', window.scrollY > 0);
    }
});

// ScrollReveal Animations
if (typeof ScrollReveal === 'function') {

    const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true
    });

    // Home Section
    sr.reveal('.home-text', {
        delay: 200,
        origin: 'top'
    });

    sr.reveal('.home-image', {
        delay: 400,
        origin: 'bottom'
    });

    // About Section
    sr.reveal('.about-title, .about-text', {
        delay: 200,
        origin: 'top'
    });

    // Services Section
    sr.reveal('.services-container .box', {
        delay: 200,
        origin: 'bottom',
        interval: 200
    });

    // Portfolio Section
    sr.reveal('.portfolio-box', {
        delay: 200,
        origin: 'bottom',
        interval: 200
    });

    // Contact Section
    sr.reveal('.contact-info, .contact-form', {
        delay: 200,
        origin: 'bottom'
    });
}

// CONTACT FORM FUNCTIONALITY

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm && formStatus) {

    contactForm.addEventListener('submit', async function(e) {

        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Show loading notification
        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending your message...';

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {

            // Collect form information
            const formData = new FormData(contactForm);

            const data = Object.fromEntries(formData.entries());

            // Submit to FormSubmit AJAX
            const response = await fetch(
                'https://formsubmit.co/ajax/hblissagency@gmail.com',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            // Check actual FormSubmit result
            if (!response.ok ||
                String(result.success).toLowerCase() !== 'true') {

                throw new Error(
                    result.message || 'Message could not be sent. Please try again.'
                );
            }

            // Successful submission
            formStatus.className = 'form-status success';
            formStatus.textContent =
                '✓ Your message has been sent successfully! I will get back to you soon.';

            // Clear form fields
            contactForm.reset();

        } catch (error) {

            // Failed submission
            formStatus.className = 'form-status error';
            formStatus.textContent =
                '✕ Sorry, your message could not be sent. Please check your internet connection and try again.';

            console.error('Contact form error:', error);

        } finally {

            // Restore button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';

        }

    });

}


