class CareerMap {
    constructor() {
        this.careerData = {
            "Kenya": {
                capital: "Nairobi",
                duration: "2018-Present",
                role: "Senior Product Operations | Co-Founder & Board Chair",
                achievements: "Co-founded Amazing Minds Africa mental health initiative impacting 200,000+ youths with 17% reduction in campus suicide rates. Led successful launch of MESH networking platform growing user base to 150K+ microentrepreneurs.",
                flagImage: "https://flagsapi.com/KE/flat/64.png",
                color: "#FF6B6B"
            },
            "Tanzania": {
                capital: "Dodoma", 
                duration: "2024-Present",
                role: "Senior Product Operations",
                achievements: "Led smooth product launch and market entry strategy for expansion. Implemented structured issue resolution frameworks ensuring 90% SLA adherence. Conducted comprehensive market analysis and user research to optimize product-market fit for East African markets.",
                flagImage: "https://flagsapi.com/TZ/flat/64.png",
                color: "#4ECDC4"
            },
            "Zambia": {
                capital: "Lusaka",
                duration: "2024-Present", 
                role: "Senior Product Operations",
                achievements: "Successfully launched and expanded our product within 7 months. Coordinated cross-functional teams (Sales, Product, Engineering, Operations) to execute strategic initiatives. Developed comprehensive testing and documentation processes that reduced support queries and enhanced user experience across new markets.",
                flagImage: "https://flagsapi.com/ZM/flat/64.png",
                color: "#45B7D1"
            },
            "Benin": {
                capital: "Porto-Novo",
                duration: "2024-Present",
                role: "Senior Product Operations",
                achievements: "Leading go-to-market strategy and execution in Benin Republic and West African markets. Driving high adoption rates through data-driven decision making and strategic market analysis. Establishing operational frameworks for sustainable growth in emerging markets while maintaining high success rates.",
                flagImage: "https://flagsapi.com/BJ/flat/64.png", 
                color: "#96CEB4"
            }
        };

        this.init();
    }

    init() {
        this.setupCareerMap();
    }

    setupCareerMap() {
        console.log('Setting up SVG career map...');
        
        // Function to update career card with smooth animations
        const updateCareerCard = (country) => {
            console.log(`Updating career card for: ${country}`);
            
            const data = this.careerData[country];
            if (!data) {
                console.warn(`No data found for country: ${country}`);
                return;
            }

            // Get or create career card elements
            const elements = this.getOrCreateCardElements();
            
            if (!elements.careerCard) {
                console.error('Could not create or find career card');
                return;
            }

            // Add loading state
            elements.careerCard.classList.add('updating');
            
            // Fade out current content
            elements.careerCard.style.opacity = '0.5';
            elements.careerCard.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                // Update all content
                this.updateCardContent(elements, data, country);
                
                // Fade in new content
                elements.careerCard.style.opacity = '1';
                elements.careerCard.style.transform = 'translateY(0)';
                elements.careerCard.style.display = 'block';
                
                // Remove loading state
                elements.careerCard.classList.remove('updating');
                
                console.log(`✅ Career card updated successfully for ${country}`);
            }, 200);
        };

        // Setup SVG country click handlers
        this.setupSVGCountryHandlers(updateCareerCard);
        
        // Initialize with Kenya
        setTimeout(() => {
            updateCareerCard('Kenya');
            this.highlightSVGCountry('Kenya');
        }, 500);

        // Add enhanced styles
        this.addSVGCareerMapStyles();
    }

    // Setup click handlers for SVG countries
    setupSVGCountryHandlers(updateCallback) {
        // Multiple strategies to find SVG countries
        const selectors = [
            // Common SVG country selectors
            'svg [data-country]',
            'svg path[data-country]',
            'svg g[data-country]',
            'svg [id*="kenya" i], svg [id*="tanzania" i], svg [id*="zambia" i], svg [id*="benin" i]',
            'svg path[id*="kenya" i], svg path[id*="tanzania" i], svg path[id*="zambia" i], svg path[id*="benin" i]',
            // Class-based selectors
            'svg .kenya, svg .tanzania, svg .zambia, svg .benin',
            'svg path.kenya, svg path.tanzania, svg path.zambia, svg path.benin',
            // Title-based selectors
            'svg [title*="Kenya" i], svg [title*="Tanzania" i], svg [title*="Zambia" i], svg [title*="Benin" i]'
        ];

        let foundCountries = new Set();
        
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                console.log(`Selector "${selector}" found ${elements.length} elements`);
                
                elements.forEach(element => {
                    const country = this.extractCountryName(element);
                    if (country && this.careerData[country]) {
                        foundCountries.add(country);
                        this.setupCountryClickHandler(element, country, updateCallback);
                    }
                });
            } catch (error) {
                console.warn(`Error with selector "${selector}":`, error);
            }
        });

        console.log(`Found countries in SVG:`, Array.from(foundCountries));

        // If no countries found, set up generic SVG click handler
        if (foundCountries.size === 0) {
            this.setupGenericSVGHandler(updateCallback);
        }

        return foundCountries;
    }

    // Extract country name from SVG element
    extractCountryName(element) {
        // Try data-country attribute first
        let country = element.getAttribute('data-country');
        if (country) return this.normalizeCountryName(country);

        // Try id attribute
        const id = element.getAttribute('id') || '';
        if (id.toLowerCase().includes('kenya')) return 'Kenya';
        if (id.toLowerCase().includes('tanzania')) return 'Tanzania';
        if (id.toLowerCase().includes('zambia')) return 'Zambia';
        if (id.toLowerCase().includes('benin')) return 'Benin';

        // Try class attribute
        const className = element.getAttribute('class') || '';
        if (className.toLowerCase().includes('kenya')) return 'Kenya';
        if (className.toLowerCase().includes('tanzania')) return 'Tanzania';
        if (className.toLowerCase().includes('zambia')) return 'Zambia';
        if (className.toLowerCase().includes('benin')) return 'Benin';

        // Try title attribute
        const title = element.getAttribute('title') || '';
        if (title.toLowerCase().includes('kenya')) return 'Kenya';
        if (title.toLowerCase().includes('tanzania')) return 'Tanzania';
        if (title.toLowerCase().includes('zambia')) return 'Zambia';
        if (title.toLowerCase().includes('benin')) return 'Benin';

        return null;
    }

    // Normalize country name
    normalizeCountryName(name) {
        const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const validCountries = ['Kenya', 'Tanzania', 'Zambia', 'Benin'];
        return validCountries.find(country => 
            country.toLowerCase() === normalized.toLowerCase()
        ) || null;
    }

    // Setup click handler for individual country element
    setupCountryClickHandler(element, country, updateCallback) {
        console.log(`Setting up click handler for ${country}`);
        
        // Make element interactive
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s ease';
        
        // Store original styles
        const originalFill = element.getAttribute('fill') || element.style.fill;
        const originalStroke = element.getAttribute('stroke') || element.style.stroke;
        
        // Add click event
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🖱️ SVG Country clicked: ${country}`);
            
            // Update career card
            updateCallback(country);
            
            // Update visual state
            this.updateSVGCountryStates(country);
            
            // Add click animation
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });

        // Add hover effects
        element.addEventListener('mouseenter', () => {
            if (!element.classList.contains('active-country')) {
                element.style.opacity = '0.8';
                element.style.filter = 'brightness(1.1)';
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!element.classList.contains('active-country')) {
                element.style.opacity = '1';
                element.style.filter = 'none';
            }
        });

        // Store reference for later use
        element.setAttribute('data-country-handler', country);
    }

    // Setup generic SVG handler as fallback
    setupGenericSVGHandler(updateCallback) {
        console.log('Setting up generic SVG click handler...');
        
        const svg = document.querySelector('svg');
        if (!svg) {
            console.warn('No SVG found on page');
            return;
        }

        let clickCount = 0;
        const countries = Object.keys(this.careerData);
        
        svg.addEventListener('click', (e) => {
            console.log('Generic SVG clicked, cycling through countries...');
            
            const country = countries[clickCount % countries.length];
            updateCallback(country);
            
            clickCount++;
            
            // Visual feedback
            svg.style.transform = 'scale(0.98)';
            setTimeout(() => {
                svg.style.transform = 'scale(1)';
            }, 100);
        });

        console.log('Generic SVG handler set up - click anywhere on the map to cycle through countries');
    }

    // Update SVG country visual states
    updateSVGCountryStates(activeCountry) {
        // Remove active state from all countries
        document.querySelectorAll('[data-country-handler]').forEach(element => {
            element.classList.remove('active-country');
            element.style.filter = 'none';
            element.style.opacity = '0.7';
        });

        // Add active state to selected country
        document.querySelectorAll(`[data-country-handler="${activeCountry}"]`).forEach(element => {
            element.classList.add('active-country');
            element.style.filter = 'brightness(1.2) saturate(1.3)';
            element.style.opacity = '1';
        });
    }

    // Highlight specific SVG country
    highlightSVGCountry(country) {
        this.updateSVGCountryStates(country);
    }

    // Get or create career card elements
    getOrCreateCardElements() {
        let careerCard = document.getElementById('career-card');
        
        // If card doesn't exist, create it
        if (!careerCard) {
            console.log('Creating career card...');
            careerCard = this.createCareerCard();
        }

        return {
            careerCard,
            countryName: careerCard.querySelector('#country-name, .country-name'),
            capital: careerCard.querySelector('#capital, .capital'),
            duration: careerCard.querySelector('#duration, .duration'),
            role: careerCard.querySelector('#role, .role'),
            achievements: careerCard.querySelector('#achievements, .achievements'),
            countryFlag: careerCard.querySelector('#country-flag, .country-flag')
        };
    }

    // Create career card if it doesn't exist
    createCareerCard() {
        const careerCard = document.createElement('div');
        careerCard.id = 'career-card';
        careerCard.innerHTML = `
            <div class="card-header">
                <div id="country-flag" class="country-flag"></div>
                <div class="card-title-section">
                    <h2 id="country-name" class="country-name">Select a country</h2>
                    <p id="capital" class="capital">Click on a country in the map</p>
                </div>
                <span id="duration" class="duration"></span>
            </div>
            <div class="card-content">
                <h3 id="role" class="role">Position</h3>
                <p id="achievements" class="achievements">Click on a country in the map to see career details and achievements.</p>
            </div>
        `;

        // Find best location to insert the card
        const targetContainers = [
            '.career-section',
            '.map-section', 
            '.content-wrapper',
            'main',
            'body'
        ];

        let container = null;
        for (const selector of targetContainers) {
            container = document.querySelector(selector);
            if (container) break;
        }

        if (container) {
            container.appendChild(careerCard);
            console.log('Career card created and added to:', container.tagName);
        }

        return careerCard;
    }

    // Update card content
    updateCardContent(elements, data, country) {
        // Update country name
        if (elements.countryName) {
            elements.countryName.textContent = country;
            elements.countryName.style.color = data.color;
        }

        // Update capital
        if (elements.capital) {
            elements.capital.textContent = `Capital: ${data.capital}`;
        }

        // Update duration
        if (elements.duration) {
            elements.duration.textContent = data.duration;
            elements.duration.style.background = data.color;
        }

        // Update role
        if (elements.role) {
            elements.role.textContent = data.role;
        }

        // Update achievements
        if (elements.achievements) {
            elements.achievements.textContent = data.achievements;
        }

        // Update flag
        if (elements.countryFlag) {
            elements.countryFlag.innerHTML = '';
            
            const flagImg = document.createElement('img');
            flagImg.src = data.flagImage;
            flagImg.alt = `${country} flag`;
            flagImg.style.cssText = `
                width: 48px;
                height: 32px;
                border-radius: 6px;
                border: 1px solid rgba(255,255,255,0.3);
                object-fit: cover;
            `;
            
            flagImg.onerror = () => {
                elements.countryFlag.innerHTML = `
                    <div style="
                        width: 48px; 
                        height: 32px; 
                        background: ${data.color}; 
                        border-radius: 6px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: bold;
                        font-size: 0.9rem;
                    ">${country.substring(0, 2).toUpperCase()}</div>
                `;
            };
            
            elements.countryFlag.appendChild(flagImg);
        }
    }

    // Enhanced styles for SVG map integration
    addSVGCareerMapStyles() {
        if (document.getElementById('svg-career-map-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'svg-career-map-styles';
        style.textContent = `
            /* Career Card Styles */
            #career-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 16px;
                box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
                padding: 32px;
                margin: 24px auto;
                max-width: 600px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            #career-card[style*="block"], #career-card[style*="opacity: 1"] {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            #career-card.updating {
                pointer-events: none;
            }

            .card-header {
                display: flex;
                align-items: center;
                gap: 24px;
                margin-bottom: 28px;
                padding-bottom: 20px;
                border-bottom: 2px solid rgba(255, 255, 255, 0.15);
            }

            .card-title-section h2 {
                margin: 0 0 8px 0;
                font-size: 2rem;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .card-title-section p {
                margin: 0;
                opacity: 0.9;
                font-size: 1.1rem;
            }

            .duration {
                background: rgba(255, 255, 255, 0.2);
                padding: 10px 18px;
                border-radius: 25px;
                font-weight: 600;
                font-size: 0.95rem;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                white-space: nowrap;
            }

            .card-content h3 {
                font-size: 1.4rem;
                margin-bottom: 16px;
                color: rgba(255, 255, 255, 0.95);
                font-weight: 600;
            }

            .card-content p {
                font-size: 1.05rem;
                line-height: 1.7;
                color: rgba(255, 255, 255, 0.9);
                margin: 0;
            }

            .country-flag {
                flex-shrink: 0;
            }

            /* SVG Country Styles */
            svg [data-country-handler] {
                cursor: pointer !important;
                transition: all 0.3s ease !important;
            }

            svg [data-country-handler]:hover {
                opacity: 0.8 !important;
                filter: brightness(1.1) !important;
                transform: scale(1.02) !important;
            }

            svg [data-country-handler].active-country {
                filter: brightness(1.2) saturate(1.3) !important;
                opacity: 1 !important;
                stroke: #fff !important;
                stroke-width: 2 !important;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                #career-card {
                    margin: 16px;
                    padding: 24px;
                }
                
                .card-header {
                    flex-direction: column;
                    text-align: center;
                    gap: 16px;
                }
                
                .card-title-section h2 {
                    font-size: 1.6rem;
                }
                
                .duration {
                    padding: 8px 16px;
                    font-size: 0.9rem;
                }
            }

            /* Loading Animation */
            #career-card.updating::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                animation: shimmer 1.5s infinite;
                border-radius: 16px;
                pointer-events: none;
            }

            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            /* Debug Helper */
            .debug-info {
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 10000;
                display: none;
            }
        `;
        
        document.head.appendChild(style);
    }

    // Debug helper function
    enableDebugMode() {
        const debug = document.createElement('div');
        debug.className = 'debug-info';
        debug.style.display = 'block';
        document.body.appendChild(debug);

        // Log SVG structure
        const svg = document.querySelector('svg');
        if (svg) {
            debug.innerHTML = `SVG found. Countries detected: checking...`;
            console.log('SVG structure:', svg);
            console.log('SVG children:', svg.children);
        } else {
            debug.innerHTML = 'No SVG found on page';
        }
    }
}

export default CareerMap;