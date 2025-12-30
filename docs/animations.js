// Advanced animations and micro-interactions using GSAP

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations
    initHeroAnimations();
    initScrollAnimations();
    initCardHoverEffects();
    initButtonEffects();
    initCounterAnimations();
    initParallaxEffects();
});

// Hero Section Animations
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1
    })
    .from('.fade-in-up', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    }, '-=0.5')
    .from('.glass-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
    }, '-=0.3');
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // Fade in elements on scroll
    gsap.utils.toArray('.glass-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Stats counter animation
    gsap.utils.toArray('.metric-value').forEach(metric => {
        ScrollTrigger.create({
            trigger: metric,
            start: 'top 80%',
            onEnter: () => animateCounter(metric)
        });
    });
}

// Card Hover Effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Create glow effect
            gsap.to(card, {
                boxShadow: '0 20px 60px rgba(14, 165, 233, 0.4)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', (e) => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(card, {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
                duration: 0.3
            });
        });
        
        // Parallax tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                transformPerspective: 1000,
                transformOrigin: 'center'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Button Click Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            button.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 4,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
            
            // Button bounce
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// Counter Animations
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isCurrency = target.includes('$');
    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const obj = { value: 0 };
    
    gsap.to(obj, {
        value: numericValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
            let displayValue = Math.floor(obj.value);
            
            if (isCurrency) {
                element.textContent = '$' + displayValue.toLocaleString();
            } else if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (target.includes('min')) {
                element.textContent = displayValue + 'min';
            } else if (target.includes('week')) {
                element.textContent = displayValue + '-' + (displayValue + 4) + ' weeks';
            } else if (target.includes('M+')) {
                element.textContent = '$' + displayValue + 'M+';
            } else if (target.includes('+')) {
                element.textContent = displayValue + '+';
            } else {
                element.textContent = displayValue;
            }
        }
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Parallax for hero section
    const hero = document.querySelector('#homeView');
    
    if (hero) {
        gsap.to('#particles-js', {
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 200,
            opacity: 0.3
        });
    }
}

// Page Transition Animation
function animatePageTransition(fromView, toView) {
    const tl = gsap.timeline();
    
    // Fade out current view
    tl.to(fromView, {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: 'power2.in'
    })
    // Fade in new view
    .set(fromView, { display: 'none' })
    .set(toView, { display: 'block', opacity: 0, x: 50 })
    .to(toView, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out'
    });
}

// Chart Animation Enhancement
function animateChartEntry(chart) {
    const canvas = chart.canvas;
    
    gsap.from(canvas, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
    });
}

// Metric Card Pulse Animation
function pulseMetricCard(element) {
    gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: 'power2.inOut'
    });
}

// Loading Spinner Animation
function animateLoadingSpinner() {
    const spinner = document.querySelector('.loading');
    
    if (spinner) {
        gsap.to(spinner, {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: 'linear'
        });
    }
}

// Toast Slide Animation
function animateToast(toast) {
    const tl = gsap.timeline();
    
    tl.fromTo(toast,
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )
    .to(toast, {
        x: 400,
        opacity: 0,
        duration: 0.3,
        delay: 2.5,
        ease: 'power3.in',
        onComplete: () => toast.remove()
    });
}

// Modal Animation
function animateModal(modal, show = true) {
    if (show) {
        gsap.set(modal, { display: 'flex' });
        
        const tl = gsap.timeline();
        tl.to(modal, {
            opacity: 1,
            duration: 0.3
        })
        .fromTo(modal.querySelector('.modal-content'),
            { scale: 0.8, y: -50 },
            { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
            '-=0.2'
        );
    } else {
        const tl = gsap.timeline({
            onComplete: () => gsap.set(modal, { display: 'none' })
        });
        
        tl.to(modal.querySelector('.modal-content'), {
            scale: 0.8,
            y: -50,
            duration: 0.3,
            ease: 'power2.in'
        })
        .to(modal, {
            opacity: 0,
            duration: 0.2
        }, '-=0.1');
    }
}

// Progress Bar Animation
function animateProgressBar(progressBar, percentage) {
    const fill = progressBar.querySelector('.progress-fill');
    
    gsap.to(fill, {
        width: percentage + '%',
        duration: 1.5,
        ease: 'power2.out'
    });
}

// Badge Pop Animation
function animateBadge(badge) {
    gsap.fromTo(badge,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
    );
}

// Table Row Slide-In
function animateTableRows(table) {
    const rows = table.querySelectorAll('tbody tr');
    
    gsap.from(rows, {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
    });
}

// Skeleton Loading Animation
function createSkeletonLoader(container, count = 3) {
    const skeletons = [];
    
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton h-20 mb-4 rounded-xl';
        container.appendChild(skeleton);
        skeletons.push(skeleton);
    }
    
    // Animate skeleton shimmer
    gsap.to(skeletons, {
        backgroundPosition: '-200% 0',
        duration: 1.5,
        repeat: -1,
        ease: 'linear'
    });
    
    return skeletons;
}

// Remove Skeleton Loaders
function removeSkeletonLoaders(skeletons) {
    gsap.to(skeletons, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => skeletons.forEach(s => s.remove())
    });
}

// Floating Elements Animation
function animateFloatingElements() {
    const floatingElements = document.querySelectorAll('.fab');
    
    floatingElements.forEach(element => {
        gsap.to(element, {
            y: -10,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut'
        });
    });
}

// Initialize floating animations
animateFloatingElements();

// Glow Effect on Hover
function addGlowEffect(element) {
    element.addEventListener('mouseenter', () => {
        gsap.to(element, {
            boxShadow: '0 0 30px rgba(14, 165, 233, 0.8), 0 0 60px rgba(14, 165, 233, 0.4)',
            duration: 0.3
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(element, {
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)',
            duration: 0.3
        });
    });
}

// Add glow to important elements
document.querySelectorAll('.glow').forEach(addGlowEffect);

// Smooth Scroll
function smoothScrollTo(target, duration = 1) {
    gsap.to(window, {
        scrollTo: target,
        duration: duration,
        ease: 'power2.inOut'
    });
}

// Export animations for use in other files
window.animations = {
    animatePageTransition,
    animateChartEntry,
    pulseMetricCard,
    animateToast,
    animateModal,
    animateProgressBar,
    animateBadge,
    animateTableRows,
    createSkeletonLoader,
    removeSkeletonLoaders,
    smoothScrollTo,
    addGlowEffect
};