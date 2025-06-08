document.addEventListener('DOMContentLoaded', function() {
    // Track resume/CV download
    const resumeLinks = document.querySelectorAll('a[href*="resume"], a[href*="cv"]');
    resumeLinks.forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'resume_download', {
                event_category: 'High Value Action',
                event_label: 'Resume Download',
                value: 100 // Assign value to important actions
            });
        });
    });
    
    // Track project demo clicks
    const projectLinks = document.querySelectorAll('#projects-component a');
    projectLinks.forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'project_view', {
                event_category: 'Portfolio',
                event_label: link.textContent.trim(),
                project_name: link.textContent.trim()
            });
        });
    });
    
    // Track "Contact Me" button clicks
    const contactButtons = document.querySelectorAll('button[onclick*="contact"], a[href*="contact"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', () => {
            gtag('event', 'contact_intent', {
                event_category: 'Lead Generation',
                event_label: 'Contact Button Click',
                value: 50
            });
        });
    });
});