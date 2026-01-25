class PortfolioAnalytics {
  constructor() {
    this.observers = new Map();
    this.trackedElements = new Set();
    this.pageLoadTime = Date.now();
    this.maxScroll = 0;
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
      button.addEventListener('click', () => {
        const buttonData = this.extractButtonData(button);

        gtag('event', 'cta_click', {
          event_category: 'engagement',
          event_label: buttonData.text,
          button_type: buttonData.type,
          button_position: buttonData.position,
          section: 'hero'
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
    const sections = document.querySelectorAll('section[id], .section[id]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.trackedElements.has(entry.target.id)) {
          this.trackedElements.add(entry.target.id);
          const sectionData = this.extractSectionData(entry.target);

          gtag('event', 'section_view', {
            event_category: 'engagement',
            event_label: sectionData.name,
            section_id: sectionData.id,
            section_position: sectionData.position,
            time_to_view: Math.round((Date.now() - this.pageLoadTime) / 1000)
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -10% 0px'
    });

    sections.forEach(section => observer.observe(section));
    this.observers.set('sections', observer);
  }

  extractSectionData(section) {
    const heading = section.querySelector('h1, h2, h3');
    return {
      id: section.id || 'unnamed',
      name: heading?.innerText?.trim() || section.id || 'Unknown Section',
      position: Array.from(document.querySelectorAll('section[id]')).indexOf(section) + 1
    };
  }

  trackProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          const title = card.querySelector('h3')?.innerText?.trim() || 'Unknown Project';
          gtag('event', 'project_click', {
            project_title: title,
            link_text: link.innerText?.trim() || 'Link'
          });
        });
      });
    });
  }

  trackSkillDomainInteractions() {
    const domains = document.querySelectorAll('.skill-domain');
    domains.forEach(domain => {
      domain.addEventListener('click', () => {
        const name = domain.querySelector('h3')?.innerText?.trim() || 'Unknown Domain';
        gtag('event', 'skill_domain_click', {
          domain_name: name
        });
      });
    });
  }

  trackStatCardViews() {
    const statCards = document.querySelectorAll('.stat-card, .metric');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const label = entry.target.querySelector('.stat-label, .metric-label')?.innerText?.trim() || 'Stat';
          gtag('event', 'stat_view', {
            stat_name: label
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    statCards.forEach(card => observer.observe(card));
  }

  trackScrollDepth() {
    const milestones = [25, 50, 75, 90];
    const tracked = new Set();

    window.addEventListener('scroll', this.throttle(() => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

      if (scrollPercent > this.maxScroll) {
        this.maxScroll = scrollPercent;

        milestones.forEach(milestone => {
          if (scrollPercent >= milestone && !tracked.has(milestone)) {
            tracked.add(milestone);
            gtag('event', 'scroll_depth', {
              event_label: `${milestone}%`,
              scroll_depth: milestone
            });
          }
        });
      }
    }, 500));
  }

  trackTimeOnPage() {
    let activeTime = 0;
    const interval = setInterval(() => {
      activeTime += 30;
      gtag('event', 'time_engagement', {
        engagement_time_msec: 30000
      });
    }, 30000);

    window.addEventListener('beforeunload', () => {
      clearInterval(interval);
      gtag('event', 'page_exit', {
        total_time_seconds: Math.round((Date.now() - this.pageLoadTime) / 1000),
        max_scroll_depth: this.maxScroll
      });
    });
  }

  throttle(func, limit) {
    let inThrottle;
    return function () {
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

const portfolioAnalytics = new PortfolioAnalytics();