class HeroEffects {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.subtitle = document.querySelector('.hero .subtitle');
        this.hero = document.querySelector('.hero');

        this.setupTypingEffect();
        this.setupParallaxEffect();
    }

    setupTypingEffect() {
        if (!this.subtitle) return;

        const text = this.subtitle.textContent;
        this.subtitle.textContent = '';

        const typeWriter = (index = 0) => {
            if (index < text.length) {
                this.subtitle.textContent += text.charAt(index);
                setTimeout(() => typeWriter(index + 1), 80);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    setupParallaxEffect() {
        if (!this.hero || !this.portfolio?.throttle) return;

        const handleParallax = this.portfolio.throttle(() => {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.3;
            this.hero.style.transform = `translateY(${speed}px)`;
        }, 16);

        window.addEventListener('scroll', handleParallax, { passive: true });
    }
}

export default HeroEffects;
