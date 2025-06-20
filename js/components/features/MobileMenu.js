class MobileMenu {
    constructor(portfolio) {
        this.portfolio = portfolio;
        this.createMobileMenu = this.createMobileMenu.bind(this);
        this.init();
    }

    init() {
        this.createMobileMenu();
        window.addEventListener('resize', this.portfolio.debounce(this.createMobileMenu, 250));
    }

    createMobileMenu() {
        // Add your actual mobile menu logic here
        const nav = document.querySelector('.nav');
        const toggle = document.querySelector('.menu-toggle');

        if (!nav || !toggle) return;

        toggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
}

export default MobileMenu;
