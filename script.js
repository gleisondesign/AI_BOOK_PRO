
// Handle video loading error
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle video loading error
    const videos = document.querySelectorAll('.main-video');
    videos.forEach(video => {
        video.addEventListener('error', function() {
            console.log('Erro ao carregar vídeo, usando placeholder');
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
                    🎥 Vídeo em carregamento...
                </div>
            `;
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.main-title, .main-description, .email-section, .video-container');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
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
                notification.textContent = '🎉 Você descobriu um Easter Egg! Desenvolvido com amor.';
                
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
                    animation: slideInRight 0.3s ease-out;
                `;

                // Add animation keyframes if not already added
                if (!document.querySelector('#notification-styles')) {
                    const style = document.createElement('style');
                    style.id = 'notification-styles';
                    style.textContent = `
                        @keyframes slideInRight {
                            from {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }
                        @keyframes slideOutRight {
                            from {
                                transform: translateX(0);
                                opacity: 1;
                            }
                            to {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                document.body.appendChild(notification);

                // Auto remove notification after 4 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.animation = 'slideOutRight 0.3s ease-out';
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notification.remove();
                            }
                        }, 300);
                    }
                }, 4000);

                clickCount = 0;
                
                // Add sparkle effect
                const sparkles = ['✨', '⭐', '🌟', '💫'];
                
                for (let i = 0; i < 6; i++) {
                    setTimeout(() => {
                        const sparkle = document.createElement('span');
                        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                        sparkle.style.cssText = `
                            position: absolute;
                            pointer-events: none;
                            font-size: 20px;
                            animation: sparkle 1s ease-out forwards;
                            left: ${Math.random() * 100}px;
                            top: ${Math.random() * 50}px;
                        `;
                        
                        if (!document.querySelector('#sparkle-styles')) {
                            const style = document.createElement('style');
                            style.id = 'sparkle-styles';
                            style.textContent = `
                                @keyframes sparkle {
                                    0% { transform: translateY(0) scale(0); opacity: 1; }
                                    50% { transform: translateY(-20px) scale(1); opacity: 1; }
                                    100% { transform: translateY(-40px) scale(0); opacity: 0; }
                                }
                            `;
                            document.head.appendChild(style);
                        }
                        
                        this.style.position = 'relative';
                        this.appendChild(sparkle);
                        
                        setTimeout(() => sparkle.remove(), 1000);
                    }, i * 200);
                }
            }
        });
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Force repaint on resize to fix any layout issues
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
});
