const counterEl = document.getElementById('userCounter');
const targetValue = 20000;

let currentValue = 0;

if (counterEl && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const timer = setInterval(() => {
                    currentValue += 100;
                    counterEl.textContent = currentValue.toLocaleString('en-US') + '+';

                    if (currentValue === targetValue) {
                        clearInterval(timer);
                    }
                }, 30);

                counterObserver.unobserve(counterEl);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(counterEl);
}

const revealGroups = [
    { selector: '.site-header', directions: ['left'] },
    { selector: '.hero-copy, .hero-visual', directions: ['left', 'right'] },
    { selector: '.how-to-title', directions: ['top'] },
    { selector: '.steps-container .step-card', directions: ['left', 'top', 'right'] },
    { selector: '.prep-header', directions: ['left'] },
    { selector: '.prep-grid .prep-card', directions: ['left', 'right', 'bottom', 'top'] },
    { selector: '.quiz-header', directions: ['right'] },
    { selector: '.quiz-grid .quiz-card', directions: ['left', 'top', 'right', 'bottom'] },
    { selector: '.winners-content, .winners-visual', directions: ['left', 'right'] },
    { selector: '.winners-footer', directions: ['bottom'] },
    { selector: '.articles-title', directions: ['top'] },
    { selector: '.articles-grid .article-card', directions: ['left', 'top', 'right'] },
    { selector: '.contact-header, .contact-form', directions: ['top', 'bottom'] },
    { selector: '.footer-main > *', directions: ['left', 'top', 'right', 'bottom'] },
    { selector: '.footer-bottom', directions: ['bottom'] }
];

const revealElements = [];

revealGroups.forEach(({ selector, directions }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal');
        element.dataset.reveal = directions[index % directions.length];
        element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
        revealElements.push(element);
    });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px'
    });

    revealElements.forEach((element) => revealObserver.observe(element));
}