document.addEventListener('DOMContentLoaded', function() {
  // Track Hero CTA button clicks
  document.querySelectorAll('.hero .cta-buttons a').forEach(button => {
    button.addEventListener('click', () => {
      const buttonType = button.classList.contains('btn-primary') ? 'primary' : 'secondary';
      gtag('event', 'hero_cta_click', {
        'button_text': button.innerText.trim(),
        'button_type': buttonType,
        'section': 'hero'
      });
    });
  });

  // Track Section Views (About, Experience, Projects, Skills)
  const sections = ['about', 'experience', 'projects', 'skills'];
  const observerOptions = {
    threshold: 0.5, // Trigger when 50% visible
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        gtag('event', 'section_view', {
          'section_id': sectionId,
          'section_name': document.querySelector(`#${sectionId} h2`).innerText
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  // Track Project Link Clicks
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const projectCard = link.closest('.project-card');
      const projectTitle = projectCard.querySelector('.project-title').innerText;
      const linkType = link.querySelector('i').className.includes('external') ? 'external' : 
                       link.querySelector('i').className.includes('github') ? 'code' : 
                       link.querySelector('i').className.includes('chart') ? 'analytics' : 
                       'presentation';

      gtag('event', 'project_link_click', {
        'project_title': projectTitle,
        'link_type': linkType,
        'link_text': link.innerText.trim()
      });
    });
  });

  // Track Skill Domain Interactions
  document.querySelectorAll('.skill-domain .domain-header').forEach(header => {
    header.addEventListener('click', () => {
      const domainTitle = header.querySelector('h3').innerText;
      gtag('event', 'skill_domain_interaction', {
        'domain_name': domainTitle,
        'interaction_type': 'header_click'
      });
    });
  });

  // Track Stat Card Views (About Section)
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statLabel = entry.target.querySelector('.stat-label').innerText;
        gtag('event', 'stat_impression', {
          'stat_name': statLabel,
          'section': 'about'
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.8});

  document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
  });
});