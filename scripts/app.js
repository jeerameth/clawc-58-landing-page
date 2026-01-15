// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate hamburger icon
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.15,
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

// Observe all cards and sections
document.querySelectorAll('.about-card, .schedule-card, .agenda-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===== Gallery Image Modal (Optional Enhancement) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-backdrop">
                    <span class="modal-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;

            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Close modal
            const closeModal = () => {
                modal.remove();
                document.body.style.overflow = 'auto';
            };

            modal.querySelector('.modal-close').addEventListener('click', closeModal);
            modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-backdrop')) {
                    closeModal();
                }
            });
        }
    });
});

// ===== Scroll Progress Indicator =====
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        document.querySelector('.scroll-progress-bar').style.width = scrolled + '%';
    });
};

createScrollProgress();

// ===== Add Modal Styles Dynamically =====
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-backdrop {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modal-backdrop img {
        max-width: 90%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(255, 215, 0, 0.3);
    }
    
    .modal-close {
        position: absolute;
        top: 30px;
        right: 40px;
        font-size: 3rem;
        color: #FFD700;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .modal-close:hover {
        transform: rotate(90deg);
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 9999;
    }
    
    .scroll-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #003DA5 0%, #FFD700 100%);
        width: 0%;
        transition: width 0.1s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(modalStyles);

// ===== Parallax Effect for Hero =====
// Using CSS background-attachment: fixed for better performance and mobile compatibility

// ===== Villa Carousel =====
const villaCarousel = document.querySelector('.villa-carousel');
const villaCards = document.querySelectorAll('.villa-carousel .villa-card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.indicator');

if (villaCarousel && villaCards.length > 0) {
    let currentIndex = 0;
    const totalSlides = villaCards.length;

    function getSlidesPerView() {
        return window.innerWidth > 768 ? 2 : 1;
    }

    function getMaxIndex() {
        const slidesPerView = getSlidesPerView();
        return Math.max(0, totalSlides - slidesPerView);
    }

    function updateCarousel() {
        const slidesPerView = getSlidesPerView();
        const cardWidth = villaCards[0].offsetWidth;
        const gap = window.innerWidth > 768 ? 32 : 0; // 2rem = 32px
        const offset = -currentIndex * (cardWidth + gap);

        villaCarousel.style.transform = `translateX(${offset}px)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        const maxIndex = getMaxIndex();
        currentIndex = (currentIndex + 1) % (maxIndex + 1);
        updateCarousel();
    }

    function prevSlide() {
        const maxIndex = getMaxIndex();
        currentIndex = (currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
        updateCarousel();
    }

    function goToSlide(index) {
        const maxIndex = getMaxIndex();
        currentIndex = Math.min(index, maxIndex);
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    villaCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    villaCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Update on window resize
    window.addEventListener('resize', () => {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateCarousel();
    });

    // Initial update
    updateCarousel();
}

// ===== Console Welcome Message =====
console.log('%c🎉 歡迎來到第58屆世界鍾靈校友嘉年華會！', 'color: #FFD700; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the 58th World Chung Ling Alumni Carnival!', 'color: #003DA5; font-size: 16px; font-style: italic;');
