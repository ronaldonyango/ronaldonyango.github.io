class SmoothScrolling {
    constructor() {
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;

            e.preventDefault();
            const targetId = anchor.getAttribute('href');

            // Logo/name clicks (#hero) should jump instantly to the very top
            // without animating through intermediate sections
            if (targetId === '#hero') {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

export default SmoothScrolling;
