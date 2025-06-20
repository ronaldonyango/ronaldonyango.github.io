class NavigationHighlight {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a');

        if (!this.sections.length || !this.navLinks.length) return;

        this.handleScroll = this.portfolio.throttle(this.onScroll.bind(this), 100);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    onScroll() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('active', isActive);
        });
    }
}

export default NavigationHighlight;
