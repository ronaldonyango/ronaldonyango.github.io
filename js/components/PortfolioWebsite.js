import SmoothScrolling from './features/SmoothScrolling.js';
import ScrollAnimations from './features/ScrollAnimations.js';
import NavigationHighlight from './features/NavigationHighlight.js';
import HeroEffects from './features/HeroEffects.js';
import ProjectCards from './features/ProjectCards.js';
import SkillConstellations from './features/SkillConstellations.js';
import ProjectCaseStudies from './features/ProjectCaseStudies.js';
import CareerMap from './features/CareerMap.js';
import MobileMenu from './features/MobileMenu.js';
import Analytics from './features/Analytics.js';
import ThemeSwitcher from './features/ThemeSwitcher.js';
import { throttle, debounce } from './utilities/ThrottleDebounce.js';

class PortfolioWebsite {
    constructor() {
        this.observers = new Map();
        this.initializeFeatures();
    }

    initializeFeatures() {
        const utils = { throttle, debounce };

        // 1. Foundation & Layout
        new SmoothScrolling();
        new ScrollAnimations(this.observers);
        new NavigationHighlight(utils);
        new MobileMenu(utils);
        new ThemeSwitcher();

        // 2. Interactive Components
        new HeroEffects(utils);
        new ProjectCards();
        new ProjectCaseStudies();
        new SkillConstellations();
        new CareerMap();

        // 3. Analytics
        new Analytics();
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

export default PortfolioWebsite;
