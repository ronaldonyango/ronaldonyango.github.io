import ComponentLoader from './components/ComponentLoader.js';
import PortfolioWebsite from './components/PortfolioWebsite.js';

/**
 * Main Application Controller
 * Orchestrates the sequence from DOM ready to component load to feature initialization.
 */
class AppController {
    constructor() {
        this.loader = new ComponentLoader();
        this.portfolio = null;
        this.init();
    }

    init() {
        // 1. Listen for component readiness
        document.addEventListener('componentsLoaded', () => this.onComponentsReady());

        // 2. Start loading
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startLoading());
        } else {
            this.startLoading();
        }
    }

    startLoading() {
        this.loader.loadAll();
    }

    onComponentsReady() {
        console.log('✨ All HTML components are in the DOM. Initializing features...');

        // 3. Initialize dynamic features
        this.portfolio = new PortfolioWebsite();

        // 4. Reveal the site
        document.body.classList.add('loaded');

        // Handle post-load analytics or secondary tasks
        this.initSecondaryTasks();
    }

    initSecondaryTasks() {
        // Global visual handle for scrolling/visibility
        document.addEventListener('visibilitychange', () => {
            const lines = document.querySelectorAll('.connection-line');
            const state = document.hidden ? 'paused' : 'running';
            lines.forEach(line => line.style.animationPlayState = state);
        });
    }
}

// Start the app
window.app = new AppController();