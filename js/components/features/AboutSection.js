/**
 * AboutSection.js
 * Handles tab navigation, animated stat counters, and fun-fact flip cards
 * for the interactive About Me section.
 */
class AboutSection {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupFlipCards();
        this.setupStatCounters();
    }

    /* ---- Tab Switching ---- */
    setupTabs() {
        const tabs = document.querySelectorAll('.about-tab');
        if (!tabs.length) return;

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;

                // Update tab buttons
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Update panels
                document.querySelectorAll('.about-tab-content').forEach(panel => {
                    panel.classList.remove('active');
                });
                const panel = document.querySelector(`.about-tab-content[data-content="${target}"]`);
                if (panel) panel.classList.add('active');
            });
        });
    }

    /* ---- 3D Flip Cards (click toggle for touch devices) ---- */
    setupFlipCards() {
        const cards = document.querySelectorAll('.fact-card');
        if (!cards.length) return;

        cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }

    /* ---- Animated Stat Counters ---- */
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        if (!statNumbers.length) return;

        // Fire counters when the stats section enters the viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
                        this.animateCounter(el);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.about-section .stats, #about .stats');
        if (statsSection) {
            observer.observe(statsSection);
        } else {
            // Fallback: animate immediately
            statNumbers.forEach(el => this.animateCounter(el));
        }
    }

    animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();

        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };

        requestAnimationFrame(step);
    }
}

export default AboutSection;
