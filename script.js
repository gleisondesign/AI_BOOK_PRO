
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

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Force repaint on resize to fix any layout issues
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
});
