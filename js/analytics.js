// Optimized GA4 Portfolio Tracking
class PortfolioAnalytics {
  constructor() {
    this.observers = new Map();
    this.trackedElements = new Set();
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupTracking());
    } else {
      this.setupTracking();
    }
  }

  setupTracking() {
    this.trackHeroCTAClicks();
    this.trackSectionViews();
    this.trackProjectInteractions();
    this.trackSkillDomainInteractions();
    this.trackStatCardViews();
    this.trackScrollDepth();
    this.trackTimeOnPage();
  }

  // Enhanced Hero CTA Tracking
  trackHeroCTAClicks() {
    const ctaButtons = document.querySelectorAll('.hero .cta-buttons a, .hero .btn, [data-cta="hero"]');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const buttonData = this.extractButtonData(button);
        
        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label: buttonData.text,
          custom_parameters: {
            button_type: buttonData.type,
            button_position: buttonData.position,
            section: 'hero',
            timestamp: Date.now()
          }
        });
      });
    });
  }

  extractButtonData(button) {
    return {
      text: button.innerText?.trim() || button.getAttribute('aria-label') || 'Unknown',
      type: button.classList.contains('btn-primary') ? 'primary' : 
            button.classList.contains('btn-secondary') ? 'secondary' : 'default',
      position: Array.from(button.parentElement.children).indexOf(button) + 1
    };
  }

  // Enhanced Section View Tracking
  trackSectionViews() {
    const sections = document.querySelectorAll('section[id], .section[id], [data-section]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.trackedElements.has(entry.target.id)) {
          this.trackedElements.add(entry.target.id);
          
          const sectionData = this.extractSectionData(entry.target);
          
          gtag('event', 'section_view', {
            event_category: 'engagement',
            event_label: sectionData.name,
            custom_parameters: {
              section_id: sectionData.id,
              section_position: sectionData.position,
              visibility_ratio: Math.round(entry.intersectionRatio * 100),
              time_to_view: Date.now() - this.pageLoadTime
            }
          });
        }
      });
    }, {
      threshold: [0.25, 0.5, 0.75], // Multiple thresholds for better tracking
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => observer.observe(section));
    this.observers.set('sections', observer);
  }

  extractSectionData(section) {
    const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
    return {
      id: section.id || section.dataset.section || 'unnamed',
      name: heading?.innerText?.trim() || section.id || 'Unknown Section',
      position: Array.from(document.querySelectorAll('section[id], .section[id], [data-section]')).indexOf(section) + 1
    };
  }

  // Enhanced Project Interaction Tracking
  trackProjectInteractions() {
    const projectContainer = document.querySelector('.projects, #projects, [data-section="projects"]');
    if (!projectContainer) return;

    // Delegate event handling for better performance
    projectContainer.addEventListener('click', (e) => {
      const link = e.target.closest('.project-link, .project-btn, [data-project-action]');
      if (!link) return;

      const projectData = this.extractProjectData(link);
      
      gtag('event', 'project_interaction', {
        event_category: 'engagement',
        event_label: projectData.title,
        custom_parameters: {
          project_title: projectData.title,
          link_type: projectData.linkType,
          link_text: projectData.linkText,
          project_category: projectData.category,
          project_position: projectData.position
        }
      });
    });

    // Track project card views
    const projectCards = document.querySelectorAll('.project-card, .project, [data-project]');
    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const projectData = this.extractProjectData(entry.target);
          
          gtag('event', 'project_view', {
            event_category: 'engagement',
            event_label: projectData.title,
            custom_parameters: {
              project_title: projectData.title,
              project_category: projectData.category,
              project_position: projectData.position
            }
          });
          
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    projectCards.forEach(card => projectObserver.observe(card));
  }

  extractProjectData(element) {
    const card = element.closest('.project-card, .project, [data-project]');
    const title = card?.querySelector('.project-title, h3, h4, [data-project-title]')?.innerText?.trim() || 'Unknown Project';
    
    return {
      title,
      linkType: this.determineLinkType(element),
      linkText: element.innerText?.trim() || element.getAttribute('aria-label') || 'Unknown',
      category: card?.dataset.category || card?.querySelector('[data-category]')?.dataset.category || 'general',
      position: Array.from(document.querySelectorAll('.project-card, .project, [data-project]')).indexOf(card) + 1
    };
  }

  determineLinkType(link) {
    const classes = link.className.toLowerCase();
    const href = link.href || '';
    const icon = link.querySelector('i')?.className || '';
    
    if (classes.includes('github') || href.includes('github.com') || icon.includes('github')) return 'github';
    if (classes.includes('demo') || classes.includes('live') || icon.includes('external')) return 'demo';
    if (classes.includes('analytics') || icon.includes('chart')) return 'analytics';
    if (classes.includes('presentation') || icon.includes('present')) return 'presentation';
    
    return 'other';
  }

  // Enhanced Skill Domain Tracking
  trackSkillDomainInteractions() {
    const skillsContainer = document.querySelector('.skills, #skills, [data-section="skills"]');
    if (!skillsContainer) return;

    skillsContainer.addEventListener('click', (e) => {
      const domainHeader = e.target.closest('.skill-domain .domain-header, .skill-category, [data-skill-domain]');
      if (!domainHeader) return;

      const domainData = this.extractSkillDomainData(domainHeader);
      
      gtag('event', 'skill_interaction', {
        event_category: 'engagement',
        event_label: domainData.name,
        custom_parameters: {
          domain_name: domainData.name,
          interaction_type: 'expand_collapse',
          domain_position: domainData.position,
          skill_count: domainData.skillCount
        }
      });
    });
  }

  extractSkillDomainData(header) {
    const domain = header.closest('.skill-domain, .skill-category, [data-skill-domain]');
    const nameElement = domain.querySelector('h3, h4, .domain-title, [data-domain-name]');
    const skills = domain.querySelectorAll('.skill, .skill-item, [data-skill]');
    
    return {
      name: nameElement?.innerText?.trim() || 'Unknown Domain',
      position: Array.from(document.querySelectorAll('.skill-domain, .skill-category')).indexOf(domain) + 1,
      skillCount: skills.length
    };
  }

  // Enhanced Stat Card Tracking
  trackStatCardViews() {
    const statCards = document.querySelectorAll('.stat-card, .metric-card, [data-stat]');
    
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statData = this.extractStatData(entry.target);
          
          gtag('event', 'stat_view', {
            event_category: 'engagement',
            event_label: statData.label,
            custom_parameters: {
              stat_name: statData.label,
              stat_value: statData.value,
              stat_category: statData.category,
              section: 'about'
            }
          });
          
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    statCards.forEach(card => statObserver.observe(card));
  }

  extractStatData(card) {
    return {
      label: card.querySelector('.stat-label, .metric-label, [data-stat-label]')?.innerText?.trim() || 'Unknown Stat',
      value: card.querySelector('.stat-value, .metric-value, [data-stat-value]')?.innerText?.trim() || '0',
      category: card.dataset.category || 'general'
    };
  }

  // Additional Advanced Tracking
  trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    const tracked = new Set();

    const throttledScroll = this.throttle(() => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            
            gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${milestone}%`,
              custom_parameters: {
                scroll_depth: milestone,
                page_height: document.documentElement.scrollHeight,
                viewport_height: window.innerHeight
              }
            });
          }
        });
      }
    }, 250);

    window.addEventListener('scroll', throttledScroll);
  }

  trackTimeOnPage() {
    this.pageLoadTime = Date.now();
    let timeOnPage = 0;
    
    const trackTime = () => {
      timeOnPage += 10;
      if (timeOnPage % 30 === 0) { // Every 30 seconds
        gtag('event', 'time_on_page', {
          event_category: 'engagement',
          event_label: `${timeOnPage}s`,
          custom_parameters: {
            time_seconds: timeOnPage,
            page_url: window.location.href
          }
        });
      }
    };

    setInterval(trackTime, 10000); // Track every 10 seconds

    // Track when user leaves
    window.addEventListener('beforeunload', () => {
      gtag('event', 'page_exit', {
        event_category: 'engagement',
        custom_parameters: {
          total_time: Math.round((Date.now() - this.pageLoadTime) / 1000),
          max_scroll_depth: maxScroll || 0
        }
      });
    });
  }

  // Utility function
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize the analytics
const portfolioAnalytics = new PortfolioAnalytics();