class ScrollAnimations {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.observer = null;
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: [0.1, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => this.observer.observe(el));

        if (this.portfolio?.observers) {
            this.portfolio.observers.set('scroll', this.observer);
        }
    }
}

export default ScrollAnimations;
