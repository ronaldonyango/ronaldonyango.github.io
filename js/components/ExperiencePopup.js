// Create ExperiencePopup.js component
export default class ExperiencePopup {
    constructor() {
        this.overlay = document.getElementById('overlay');
        this.popups = {};
        this.currentPopup = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEventListeners();
        this.setupRoleSwitching();
    }

    cacheElements() {
        // Cache all popups
        document.querySelectorAll('.experience-popup').forEach(popup => {
            const id = popup.id;
            this.popups[id] = popup;
        });
    }

    setupEventListeners() {
        // Open popup buttons
        document.querySelectorAll('[data-popup]').forEach(button => {
            button.addEventListener('click', (e) => {
                const popupId = e.currentTarget.getAttribute('data-popup');
                this.openPopup(popupId);
            });
        });

        // Close buttons
        document.querySelectorAll('.popup-close').forEach(button => {
            button.addEventListener('click', () => this.closePopup());
        });

        // Close on overlay click
        this.overlay.addEventListener('click', () => this.closePopup());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePopup();
        });

        // Prevent body scroll when popup is open
        document.addEventListener('popupOpen', () => {
            document.body.style.overflow = 'hidden';
        });

        document.addEventListener('popupClose', () => {
            document.body.style.overflow = '';
        });
    }

    setupRoleSwitching() {
        // Role badges on timeline
        document.querySelectorAll('.role-badge').forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                const role = e.currentTarget.getAttribute('data-role');
                const card = e.currentTarget.closest('.timeline-card');
                
                // Update active badge
                card.querySelectorAll('.role-badge').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Update preview text
                const preview = card.querySelector('.card-preview');
                if (preview) {
                    preview.textContent = role === 'senior' 
                        ? 'Leading GTM strategies & operational excellence'
                        : 'Boosted efficiency by 25%, achieved 95% test success';
                }
            });
        });

        // Tabs in Sun King popup
        document.querySelectorAll('.popup-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const popup = e.currentTarget.closest('.experience-popup');
                const role = e.currentTarget.getAttribute('data-role');
                
                // Update active tab
                popup.querySelectorAll('.popup-tab').forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Show corresponding role content
                popup.querySelectorAll('.role-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                const roleContent = popup.querySelector(`[data-role="${role}"]`);
                if (roleContent) {
                    roleContent.classList.add('active');
                }
            });
        });
    }

    openPopup(popupId) {
        // Close any open popup first
        this.closePopup();
        
        // Show overlay
        this.overlay.classList.add('active');
        
        // Show selected popup
        const popup = this.popups[popupId];
        if (popup) {
            popup.classList.add('active');
            this.currentPopup = popup;
            
            // Dispatch event for analytics/other listeners
            document.dispatchEvent(new CustomEvent('popupOpen', {
                detail: { popupId }
            }));
            
            // Focus first interactive element for accessibility
            setTimeout(() => {
                const closeBtn = popup.querySelector('.popup-close');
                if (closeBtn) closeBtn.focus();
            }, 100);
        }
    }

    closePopup() {
        // Hide overlay
        this.overlay.classList.remove('active');
        
        // Hide all popups
        Object.values(this.popups).forEach(popup => {
            popup.classList.remove('active');
        });
        
        this.currentPopup = null;
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('popupClose'));
    }
}

// Initialize in your app controller
// document.addEventListener('componentsLoaded', () => {
//     new ExperiencePopup();
// });