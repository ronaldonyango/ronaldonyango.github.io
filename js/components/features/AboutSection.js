/**
 * AboutSection.js
 * Handles:
 *  - "Read more" expand/collapse toggle
 *  - Quick-facts accordion (click to reveal detail)
 *  - Animated stat counters (IntersectionObserver)
 */
class AboutSection {
    constructor() {
        this.init();
    }

    init() {
        this.setupExpandToggle();
        this.setupFactAccordion();
        this.setupStatCounters();
    }

    /* ---- Read More / Collapse ---- */
    setupExpandToggle() {
        const toggle = document.querySelector('.expand-toggle');
        if (!toggle) return;

        const contentId = toggle.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (!content) return;

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            const label = toggle.querySelector('.expand-label');

            if (expanded) {
                // Collapse
                content.setAttribute('hidden', '');
                if (label) label.textContent = 'Read more about me';
            } else {
                // Expand
                content.removeAttribute('hidden');
                if (label) label.textContent = 'Show less';
            }
        });
    }

    /* ---- Quick Facts Accordion ---- */
    setupFactAccordion() {
        const factButtons = document.querySelectorAll('.fact-item');
        if (!factButtons.length) return;

        factButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const factKey = btn.dataset.fact;
                const detail = document.getElementById(`fact-${factKey}`);
                if (!detail) return;

                const isExpanded = btn.getAttribute('aria-expanded') === 'true';

                // Close all others
                factButtons.forEach(b => {
                    b.setAttribute('aria-expanded', 'false');
                    const key = b.dataset.fact;
                    const d = document.getElementById(`fact-${key}`);
                    if (d) d.setAttribute('hidden', '');
                });

                if (!isExpanded) {
                    btn.setAttribute('aria-expanded', 'true');
                    detail.removeAttribute('hidden');
                }
            });
        });
    }

    /* ---- Animated Stat Counters ---- */
    setupStatCounters() {
        const statsSection = document.querySelector('#about .stats');
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate pure-number stats only (skip those like "500K+")
                    entry.target.querySelectorAll('.stat-number').forEach(el => {
                        const text = el.textContent.trim();
                        const match = text.match(/^(\d+)/);
                        if (match) {
                            const target = parseInt(match[1], 10);
                            const suffix = text.replace(match[1], '');
                            this.animateCounter(el, target, suffix);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(statsSection);
    }

    animateCounter(el, target, suffix) {
        const duration = 1600;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
        };

        requestAnimationFrame(step);
    }
}

export default AboutSection;
