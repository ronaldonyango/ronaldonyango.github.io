class Analytics {
    constructor() {
        this.init();
    }

    init() {
        const trackableElements = document.querySelectorAll('.btn, .project-link, .contact-card a');

        trackableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                // Replace this with actual tracking logic
                console.log(`Tracked interaction with: ${e.target}`);
            });
        });
    }
}

export default Analytics;
