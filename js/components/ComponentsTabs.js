export default class ExperienceJourney {
    constructor() {
        this.state = {
            activeFilter: 'all',
            activeRole: 'senior',
            isInitialized: false
        };
        
        this.init();
    }

    init() {
        if (this.state.isInitialized) return;
        
        try {
            this.cacheElements();
            this.setupMouseEffects();
            this.setupFiltering();
            this.setupRoleTabs();
            this.setupAnimations();
            this.setupAccessibility();
            
            this.state.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize ExperienceJourney:', error);
        }
    }

    cacheElements() {
        this.section = document.querySelector('.experience-section');
        if (!this.section) {
            throw new Error('Experience section not found');
        }
        
        this.filters = this.section.querySelectorAll('.filter');
        this.filtersContainer = this.section.querySelector('.year-filters');

        this.journeyItems = this.section.querySelectorAll('.journey-item');

        this.cursor = this.section.querySelector('.cursor');
        this.shapes = this.section.querySelectorAll('.shape');

        this.roleTabs = this.section.querySelectorAll('.role-tab');
        this.roleContents = this.section.querySelectorAll('.role-content');

        this.stats = this.section.querySelectorAll('.impact-stat');
    }

    setupMouseEffects() {
        if (!this.cursor || this.shapes.length === 0) return;
 
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        
        let rafId = null;
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (rafId) return;
            
            rafId = requestAnimationFrame(() => {
                this.updateCursorPosition(mouseX, mouseY);
                this.updateShapePositions(mouseX, mouseY);
                rafId = null;
            });
        };
 
        this.section.addEventListener('mousemove', handleMouseMove, { passive: true });
    
        this.section.addEventListener('mouseleave', () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        }, { passive: true });
    }

    updateCursorPosition(x, y) {
        if (!this.cursor) return;
        
        const rect = this.section.getBoundingClientRect();
        const relX = x - rect.left - 200;
        const relY = y - rect.top - 200; 
        
        this.cursor.style.transform = `translate(${relX}px, ${relY}px)`;
    }

    updateShapePositions(x, y) {
        if (!this.shapes || this.shapes.length === 0) return;
        
        const rect = this.section.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        this.shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const moveX = (x - rect.left - centerX) * speed;
            const moveY = (y - rect.top - centerY) * speed;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    setupFiltering() {
        if (!this.filters || this.filters.length === 0) return;
        
        this.filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                this.handleFilterClick(e.currentTarget);
            });
            filter.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleFilterClick(e.currentTarget);
                }
            });
        });
    }

    handleFilterClick(filterElement) {
        const year = filterElement.dataset.year;
        
        if (this.state.activeFilter === year) return; 

        this.state.activeFilter = year;

        this.updateActiveFilter(filterElement);
        this.filterJourneyItems(year);

        this.updateFilterAria(filterElement);
    }

    updateActiveFilter(activeFilter) {
        this.filters.forEach(filter => {
            filter.classList.toggle('active', filter === activeFilter);
        });
    }

    filterJourneyItems(year) {
        this.journeyItems.forEach((item, index) => {
            const category = item.dataset.category;
            const shouldShow = year === 'all' || year === category;
            
            if (shouldShow) {
                item.classList.remove('filtered');
                item.style.animation = 'none';

                void item.offsetWidth;
                
                item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
            } else {
                // Hide
                item.classList.add('filtered');
            }
        });
    }

    updateFilterAria(activeFilter) {
        this.filters.forEach(filter => {
            const isActive = filter === activeFilter;
            filter.setAttribute('aria-selected', isActive);
        });
    }

    setupRoleTabs() {
        if (!this.roleTabs || this.roleTabs.length === 0) return;
        
        this.roleTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleRoleTabClick(e.currentTarget);
            });

            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleRoleTabClick(e.currentTarget);
                }
            });
        });
    }

    handleRoleTabClick(tabElement) {
        const role = tabElement.dataset.role;
        const parentCard = tabElement.closest('.item-card');
        
        if (!parentCard || !role) return;

        this.state.activeRole = role;

        const cardTabs = parentCard.querySelectorAll('.role-tab');
        cardTabs.forEach(tab => {
            const isActive = tab === tabElement;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });

        this.switchRoleContent(parentCard, role);
    }

    switchRoleContent(parentCard, role) {
        const allContents = parentCard.querySelectorAll('.role-content');
        const targetContent = parentCard.querySelector(`.role-content[data-role="${role}"]`);
        
        if (!targetContent) {
            console.warn(`Role content not found for: ${role}`);
            return;
        }

        allContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('hidden', '');
        });

        targetContent.removeAttribute('hidden');

        setTimeout(() => {
            targetContent.classList.add('active');
            this.animateStats(targetContent);
        }, 10);
    }

    animateStats(container) {
        const stats = container.querySelectorAll('.impact-stat');
        if (!stats || stats.length === 0) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                stat.style.transition = 'all 0.5s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        this.journeyItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
        
        setTimeout(() => {
            this.animateAllStats();
        }, 500);
    }

    animateAllStats() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                stat.style.transition = 'all 0.5s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupAccessibility() {
        this.addSkipLink();
        this.ensureKeyboardAccessibility();
        this.setupLiveRegion();
    }

    addSkipLink() {
        const existingSkipLink = this.section.querySelector('.skip-to-content');
        if (existingSkipLink) return;
        
        const skipLink = document.createElement('a');
        skipLink.href = '#experience';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to experience content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--accent);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        this.section.insertBefore(skipLink, this.section.firstChild);
    }

    ensureKeyboardAccessibility() {
        const clickableElements = this.section.querySelectorAll('[data-year], [data-role]');
        
        clickableElements.forEach(element => {
            if (element.tagName !== 'BUTTON' && element.tagName !== 'A') {
                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '0');
                }
                if (!element.hasAttribute('role')) {
                    element.setAttribute('role', 'button');
                }
            }
        });
    }

    setupLiveRegion() {
        let liveRegion = this.section.querySelector('[aria-live]');
        
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            liveRegion.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0,0,0,0);
                white-space: nowrap;
                border: 0;
            `;
            this.section.appendChild(liveRegion);
        }
        
        this.liveRegion = liveRegion;
    }

    announce(message) {
        if (!this.liveRegion) return;
        
        this.liveRegion.textContent = message;
        
        setTimeout(() => {
            this.liveRegion.textContent = '';
        }, 1000);
    }

    destroy() {
        this.state.isInitialized = false;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ExperienceJourney();
    });
} else {
    new ExperienceJourney();
}