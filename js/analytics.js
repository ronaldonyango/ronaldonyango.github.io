// analytics.js - GA4 Tracking System
(function() {
    'use strict';
    
    // Wait for gtag to be available
    function waitForGtag(callback) {
        if (typeof gtag !== 'undefined') {
            callback();
        } else {
            setTimeout(() => waitForGtag(callback), 100);
        }
    }
    
    // Core tracking functions
    window.trackHeroClick = function(action, buttonText) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'Hero CTA',
                event_label: buttonText,
                section: 'hero',
                button_text: buttonText,
                value: action === 'view_work' ? 25 : 50 // Assign values
            });
            
            console.log(`🎯 Tracked: ${action} - ${buttonText}`);
        }
    };
    
    // Generic tracking functions
    window.trackEvent = {
        // Track any button click
        button: function(buttonText, section, action = 'click', value = 0) {
            gtag('event', 'button_click', {
                event_category: 'Button',
                event_label: buttonText,
                section: section,
                button_text: buttonText,
                custom_action: action,
                value: value
            });
        },
        
        // Track section interactions
        section: function(sectionName, action, details = '') {
            gtag('event', 'section_interaction', {
                event_category: 'Section',
                event_label: sectionName,
                section: sectionName,
                action: action,
                details: details
            });
        },
        
        // Track contact attempts
        contact: function(method, source = 'unknown') {
            gtag('event', 'contact_attempt', {
                event_category: 'Lead Generation',
                event_label: method,
                contact_method: method,
                source_section: source,
                value: 75 // High value for contact attempts
            });
        },
        
        // Track project views
        project: function(projectName, action = 'view') {
            gtag('event', 'project_interaction', {
                event_category: 'Portfolio',
                event_label: projectName,
                project_name: projectName,
                action: action,
                value: 30
            });
        },
        
        // Track downloads
        download: function(fileName, fileType, source = 'unknown') {
            gtag('event', 'file_download', {
                event_category: 'Download',
                event_label: fileName,
                file_name: fileName,
                file_type: fileType,
                source_section: source,
                value: 100 // High value for downloads
            });
        },
        
        // Track form interactions
        form: function(formName, action, field = '') {
            gtag('event', 'form_interaction', {
                event_category: 'Form',
                event_label: `${formName} - ${action}`,
                form_name: formName,
                action: action,
                field: field,
                value: action === 'submit' ? 80 : 10
            });
        },
        
        // Track social media clicks
        social: function(platform, source = 'unknown') {
            gtag('event', 'social_click', {
                event_category: 'Social Media',
                event_label: platform,
                social_platform: platform,
                source_section: source,
                value: 20
            });
        }
    };
    
    // Automatic tracking initialization
    function initAutoTracking() {
        waitForGtag(() => {
            console.log('📊 Analytics.js initialized');
            
            // 1. SCROLL DEPTH TRACKING
            let scrollDepths = [25, 50, 75, 90, 100];
            let trackedDepths = new Set();
            
            function trackScrollDepth() {
                const scrollPercent = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                
                scrollDepths.forEach(depth => {
                    if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                        trackedDepths.add(depth);
                        gtag('event', 'scroll_depth', {
                            event_category: 'Engagement',
                            event_label: `${depth}% Scrolled`,
                            scroll_depth: depth,
                            value: Math.floor(depth / 25) * 5 // 5, 10, 15, 18, 20 points
                        });
                    }
                });
            }
            
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(trackScrollDepth, 250);
            });
            
            // 2. SECTION VISIBILITY TRACKING
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionName = entry.target.id.replace('-component', '') || 
                                          entry.target.className.split(' ')[0] || 
                                          'unknown-section';
                        
                        gtag('event', 'section_view', {
                            event_category: 'Engagement',
                            event_label: sectionName,
                            section_name: sectionName,
                            value: 5
                        });
                    }
                });
            }, { threshold: 0.5 });
            
            // Observe all sections
            document.querySelectorAll('section, [id*="component"]').forEach(section => {
                sectionObserver.observe(section);
            });
            
            // 3. AUTOMATIC LINK TRACKING
            document.addEventListener('click', function(e) {
                const element = e.target.closest('a, button');
                if (!element) return;
                
                // Track external links
                if (element.tagName === 'A' && element.href) {
                    const isExternal = element.hostname !== window.location.hostname;
                    
                    if (isExternal) {
                        const linkText = element.textContent.trim() || 'External Link';
                        gtag('event', 'outbound_click', {
                            event_category: 'External Link',
                            event_label: linkText,
                            link_url: element.href,
                            link_text: linkText
                        });
                    }
                    
                    // Track social media specifically
                    if (element.href.match(/(linkedin|twitter|github|facebook|instagram|behance|dribbble)/i)) {
                        const platform = element.href.match(/(linkedin|twitter|github|facebook|instagram|behance|dribbble)/i)[1];
                        const section = element.closest('section')?.className.split(' ')[0] || 'unknown';
                        trackEvent.social(platform, section);
                    }
                    
                    // Track email links
                    if (element.href.includes('mailto:')) {
                        const section = element.closest('section')?.className.split(' ')[0] || 'unknown';
                        trackEvent.contact('email', section);
                    }
                    
                    // Track phone links
                    if (element.href.includes('tel:')) {
                        const section = element.closest('section')?.className.split(' ')[0] || 'unknown';
                        trackEvent.contact('phone', section);
                    }
                    
                    // Track download links
                    if (element.href.match(/\.(pdf|doc|docx|zip|jpg|png|resume|cv)$/i)) {
                        const fileName = element.href.split('/').pop();
                        const fileType = fileName.split('.').pop();
                        const section = element.closest('section')?.className.split(' ')[0] || 'unknown';
                        trackEvent.download(fileName, fileType, section);
                    }
                }
                
                // Track buttons without specific onclick handlers
                if (element.tagName === 'BUTTON' && !element.getAttribute('onclick')) {
                    const buttonText = element.textContent.trim() || 'Button';
                    const section = element.closest('section')?.className.split(' ')[0] || 'unknown';
                    trackEvent.button(buttonText, section);
                }
            });
            
            // 4. FORM TRACKING
            document.addEventListener('submit', function(e) {
                const form = e.target;
                const formName = form.name || form.id || 'contact-form';
                trackEvent.form(formName, 'submit');
            });
            
            document.addEventListener('focus', function(e) {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                    const form = e.target.closest('form');
                    const formName = form?.name || form?.id || 'contact-form';
                    trackEvent.form(formName, 'start', e.target.name || e.target.type);
                }
            }, true);
            
            // 5. PAGE ENGAGEMENT TRACKING
            const engagementTimes = [15, 30, 60, 120, 300]; // 15s, 30s, 1m, 2m, 5m
            engagementTimes.forEach(seconds => {
                setTimeout(() => {
                    gtag('event', 'page_engagement', {
                        event_category: 'Engagement',
                        event_label: `${seconds}s on page`,
                        engagement_time: seconds,
                        value: Math.floor(seconds / 30) // Progressive value
                    });
                }, seconds * 1000);
            });
            
            // 6. ERROR TRACKING
            window.addEventListener('error', (e) => {
                gtag('event', 'javascript_error', {
                    event_category: 'Error',
                    event_label: e.message,
                    error_message: e.message,
                    error_filename: e.filename,
                    error_line: e.lineno
                });
            });
            
            // 7. PAGE PERFORMANCE
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    gtag('event', 'page_load_time', {
                        event_category: 'Performance',
                        event_label: `${Math.round(loadTime/1000)}s`,
                        load_time: loadTime,
                        value: loadTime < 3000 ? 10 : 0 // Bonus for fast loading
                    });
                }, 100);
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoTracking);
    } else {
        initAutoTracking();
    }
    
})();