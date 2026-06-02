// ==================== SMOOTH SCROLL ACTIF ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== NAVBAR ACTIVE LINK ==================== 
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== CONTACT FORM VALIDATION ==================== 
const contactForm = document.querySelector('.contact-form');

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0, 0, 0, 0.85)';
    toast.style.color = '#fff';
    toast.style.padding = '0.9rem 1.2rem';
    toast.style.borderRadius = '999px';
    toast.style.fontSize = '0.95rem';
    toast.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2800);
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        // Validation
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return;
        }

        // Envoi via Web3Forms
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                showToast('Message envoyé ! Merci pour votre prise de contact.');
                contactForm.reset();
            } else {
                showToast('Une erreur est survenue. Veuillez réessayer.');
            }
        } catch (err) {
            showToast('Erreur réseau. Vérifiez votre connexion et réessayez.');
        } finally {
            submitBtn.textContent = 'Envoyer';
            submitBtn.disabled = false;
        }
    });
}

// ==================== ANIMATIONS AU SCROLL ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cards et conteneurs
document.querySelectorAll('.project-card, .skill-category, .timeline-content, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==================== HAMBURGER MENU (Mobile) ==================== 
// Création d'un menu hamburger responsive optionnel
function setupMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Vérifier si menu hamburger est nécessaire
    if (window.innerWidth <= 768) {
        // Le CSS media query gère déjà l'affichage approprié
    }
}

setupMobileMenu();
window.addEventListener('resize', setupMobileMenu);

// ==================== SCROLL REVEAL ==================== 
// Révélation progressive des éléments au scroll
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ==================== ACTIVE NAVIGATION HIGHLIGHT ==================== 
const updateActiveNav = () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.fontWeight = '500';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                    link.style.fontWeight = '700';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveNav);
