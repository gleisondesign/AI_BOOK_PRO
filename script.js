
// Handle video loading and autoplay optimization for mobile
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optimize video autoplay for mobile
    const videos = document.querySelectorAll('.main-video');
    videos.forEach(video => {
        // Force video attributes for mobile compatibility
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('loop', '');
        video.setAttribute('preload', 'auto');
        video.setAttribute('webkit-playsinline', '');
        
        // Ensure video is muted
        video.muted = true;
        video.defaultMuted = true;
        
        // Force play on load
        video.addEventListener('loadeddata', function() {
            video.play().catch(error => {
                console.log('Video autoplay failed:', error);
            });
        });
        
        // Handle video loading error
        video.addEventListener('error', function() {
            console.log('Error loading video, using placeholder');
            const container = this.parentElement;
            container.innerHTML = `
                <div style="
                    width: 100%;
                    height: 400px;
                    background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 20px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 18px;
                ">
                    🎥 Video loading...
                </div>
            `;
        });
    });

    // Add some Easter eggs for fun
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            if (clickCount === 5) {
                // Create notification element
                const notification = document.createElement('div');
                notification.textContent = '🎉 You discovered an Easter Egg! Made with love.';
                
                // Add styles
                notification.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    font-weight: 500;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                `;

                document.body.appendChild(notification);

                // Auto remove notification after 4 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 4000);

                clickCount = 0;
            }
        });
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn-next');
    const prevButton = document.querySelector('.carousel-btn-prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Set slide positions
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    };

    const updateDots = (targetIndex) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
    };

    const goToSlide = (targetIndex) => {
        const targetSlide = slides[targetIndex];
        moveToSlide(slides[currentIndex], targetSlide);
        updateDots(targetIndex);
        currentIndex = targetIndex;
    };

    // Next button
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            goToSlide(nextIndex);
        });
    }

    // Previous button
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            goToSlide(prevIndex);
        });
    }

    // Auto-play carousel
    setInterval(() => {
        const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        goToSlide(nextIndex);
    }, 5000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Benefits carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const benefitsTrack = document.querySelector('.benefits-carousel-track');
    const benefitsCards = Array.from(benefitsTrack?.children || []);
    const benefitsNextBtn = document.querySelector('.benefits-carousel-btn-next');
    const benefitsPrevBtn = document.querySelector('.benefits-carousel-btn-prev');
    
    if (!benefitsTrack || benefitsCards.length === 0) return;

    let currentBenefitIndex = 0;
    const isMobile = window.innerWidth <= 768;
    const cardsPerView = isMobile ? 2 : 5;
    const totalSlides = Math.ceil(benefitsCards.length / cardsPerView);

    const moveBenefitsCarousel = () => {
        const cardWidth = benefitsCards[0].offsetWidth;
        const gap = 24; // gap between cards
        const moveAmount = (cardWidth + gap) * cardsPerView;
        benefitsTrack.style.transform = `translateX(-${currentBenefitIndex * moveAmount}px)`;
    };

    if (benefitsNextBtn) {
        benefitsNextBtn.addEventListener('click', () => {
            if (currentBenefitIndex < benefitsCards.length - cardsPerView) {
                currentBenefitIndex++;
                moveBenefitsCarousel();
            }
        });
    }

    if (benefitsPrevBtn) {
        benefitsPrevBtn.addEventListener('click', () => {
            if (currentBenefitIndex > 0) {
                currentBenefitIndex--;
                moveBenefitsCarousel();
            }
        });
    }

    // Auto-play benefits carousel
    setInterval(() => {
        if (currentBenefitIndex < benefitsCards.length - cardsPerView) {
            currentBenefitIndex++;
        } else {
            currentBenefitIndex = 0;
        }
        moveBenefitsCarousel();
    }, 4000);

    // Handle resize
    window.addEventListener('resize', () => {
        moveBenefitsCarousel();
    });
});


