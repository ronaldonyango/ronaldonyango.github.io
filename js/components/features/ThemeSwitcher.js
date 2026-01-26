class ThemeSwitcher {
    constructor() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        if (!this.toggleBtn) return;

        // Set initial theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateIcon();

        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateIcon();
    }

    updateIcon() {
        const icon = this.toggleBtn.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

export default ThemeSwitcher;
