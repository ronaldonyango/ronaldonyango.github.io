/**
 * ProjectCards - Optimized Class
 * Handles project card interactions, modal display, and animations
 */

export default class ProjectCards {
    constructor() {
        this.state = {
            isInitialized: false,
            activeProject: null,
            observer: null
        };
        
        this.init();
    }

    /**
     * Initialize all components
     */
    init() {
        if (this.state.isInitialized) return;
        
        try {
            this.cacheElements();
            this.setupScrollAnimations();
            this.setupHoverEffects();
            this.setupModal();
            this.setupAccessibility();
            
            this.state.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize ProjectCards:', error);
        }
    }

    /**
     * Cache DOM elements for better performance
     */
    cacheElements() {
        // Container
        this.section = document.querySelector('.projects-section');
        if (!this.section) {
            throw new Error('Projects section not found');
        }
        
        // Project cards
        this.projectCards = this.section.querySelectorAll('.project-card');
        
        // Modal elements
        this.modal = document.getElementById('project-modal');
        this.modalContent = this.modal?.querySelector('.modal-content');
        this.modalOverlay = this.modal?.querySelector('.modal-overlay');
        this.closeModalBtn = this.modal?.querySelector('.close-modal');
        
        // Modal content elements
        this.modalTitle = document.getElementById('modal-title');
        this.starS = document.getElementById('star-s');
        this.starT = document.getElementById('star-t');
        this.starA = document.getElementById('star-a');
        this.starR = document.getElementById('star-r');
        
        // Buttons
        this.caseStudyButtons = this.section.querySelectorAll('.open-case-study');
    }

    /**
     * Setup scroll-triggered animations
     */
    setupScrollAnimations() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            // Show all cards immediately
            this.projectCards.forEach(card => {
                card.classList.add('is-visible');
            });
            return;
        }
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.state.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 150);
                    
                    // Unobserve after animation
                    this.state.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all project cards
        this.projectCards.forEach(card => {
            this.state.observer.observe(card);
        });
    }

    /**
     * Setup hover effects for project cards
     */
    setupHoverEffects() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        
        this.projectCards.forEach(card => {
            // Mouse enter - enhance existing CSS hover
            card.addEventListener('mouseenter', () => {
                this.handleCardHover(card, true);
            }, { passive: true });
            
            // Mouse leave
            card.addEventListener('mouseleave', () => {
                this.handleCardHover(card, false);
            }, { passive: true });
        });
    }

    /**
     * Handle card hover state
     */
    handleCardHover(card, isHovering) {
        const image = card.querySelector('.project-image img, .project-image i');
        if (!image) return;
        
        if (isHovering) {
            // Slight rotation for icon-based images
            if (image.tagName === 'I') {
                image.style.transform = 'rotate(-5deg) scale(1.1)';
            }
        } else {
            if (image.tagName === 'I') {
                image.style.transform = '';
            }
        }
    }

    /**
     * Setup modal functionality
     */
    setupModal() {
        if (!this.modal) {
            console.warn('Modal element not found');
            return;
        }
        
        // Open modal buttons
        this.caseStudyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.currentTarget.closest('.project-card');
                this.openModal(card);
            });
        });
        
        // Close modal button
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }
        
        // Close on overlay click
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && !this.modal.hasAttribute('hidden')) {
                this.closeModal();
            }
        });
        
        // Prevent modal content clicks from closing modal
        if (this.modalContent) {
            this.modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    /**
     * Open modal with project data
     */
    openModal(card) {
        if (!card || !this.modal) return;
        
        try {
            // Get STAR data from card attributes
            const projectTitle = card.querySelector('.project-title')?.textContent || 'Project';
            const starData = {
                s: card.dataset.starS || '',
                t: card.dataset.starT || '',
                a: card.dataset.starA || '',
                r: card.dataset.starR || ''
            };
            
            // Populate modal
            if (this.modalTitle) this.modalTitle.textContent = projectTitle;
            if (this.starS) this.starS.textContent = starData.s;
            if (this.starT) this.starT.textContent = starData.t;
            if (this.starA) this.starA.textContent = starData.a;
            if (this.starR) this.starR.textContent = starData.r;
            
            // Show modal
            this.modal.removeAttribute('hidden');
            this.modal.classList.add('active');
            
            // Trap focus in modal
            this.trapFocus(this.modal);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Store active project
            this.state.activeProject = card;
            
            // Announce to screen readers
            this.announce(`Opened case study for ${projectTitle}`);
            
            // Focus on close button
            setTimeout(() => {
                this.closeModalBtn?.focus();
            }, 100);
            
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        if (!this.modal) return;
        
        try {
            // Hide modal
            this.modal.classList.remove('active');
            
            // Wait for animation to complete
            setTimeout(() => {
                this.modal.setAttribute('hidden', '');
            }, 300);
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Return focus to triggering element
            if (this.state.activeProject) {
                const button = this.state.activeProject.querySelector('.open-case-study');
                button?.focus();
            }
            
            // Clear active project
            this.state.activeProject = null;
            
            // Announce to screen readers
            this.announce('Closed case study modal');
            
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }

    /**
     * Trap focus within modal
     */
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };
        
        element.addEventListener('keydown', handleTabKey);
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add skip link if needed
        this.addSkipLink();
        
        // Setup live region for announcements
        this.setupLiveRegion();
        
        // Ensure keyboard navigation
        this.ensureKeyboardAccessibility();
    }


    /**
     * Setup live region for screen reader announcements
     */
    setupLiveRegion() {
        let liveRegion = this.section.querySelector('[aria-live]');
        
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            this.section.appendChild(liveRegion);
        }
        
        this.liveRegion = liveRegion;
    }

    /**
     * Announce to screen readers
     */
    announce(message) {
        if (!this.liveRegion) return;
        
        this.liveRegion.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            this.liveRegion.textContent = '';
        }, 1000);
    }

    /**
     * Ensure keyboard accessibility
     */
    ensureKeyboardAccessibility() {
        // Make sure all interactive elements are keyboard accessible
        const interactiveElements = this.section.querySelectorAll('.open-case-study');
        
        interactiveElements.forEach(element => {
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

    /**
     * Cleanup and destroy
     */
    destroy() {
        // Disconnect observer
        if (this.state.observer) {
            this.state.observer.disconnect();
        }
        
        // Remove event listeners
        // (In production, you'd store references to bound functions and remove them)
        
        // Close modal if open
        if (this.modal && !this.modal.hasAttribute('hidden')) {
            this.closeModal();
        }
        
        this.state.isInitialized = false;
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectCards();
    });
} else {
    new ProjectCards();
}