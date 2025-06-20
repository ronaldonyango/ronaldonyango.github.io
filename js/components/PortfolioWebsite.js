import SmoothScrolling from './features/SmoothScrolling.js';
import ScrollAnimations from './features/ScrollAnimations.js';
import NavigationHighlight from './features/NavigationHighlight.js';
import HeroEffects from './features/HeroEffects.js';
import ProjectCards from './features/ProjectCards.js';
import SkillConstellations from './features/SkillConstellations.js';
import CareerMap from './features/CareerMap.js';
import MobileMenu from './features/MobileMenu.js';
import Analytics from './features/Analytics.js';
import LoadingAnimation from './features/LoadingAnimation.js';
import { throttle, debounce } from './utilities/ThrottleDebounce.js';

class PortfolioWebsite {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeFeatures());
        } else {
            this.initializeFeatures();
        }
    }

    initializeFeatures() {
        const utils = { throttle, debounce };

        new SmoothScrolling();
        new ScrollAnimations(this.observers);
        new NavigationHighlight(utils);
        new HeroEffects(utils);
        new ProjectCards();
        new SkillConstellations();
        new CareerMap();
        new MobileMenu(utils);
        new Analytics();
        new LoadingAnimation();
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

export default PortfolioWebsite;
