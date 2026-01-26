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
            "Uganda": {
                capital: "Kampala",
                duration: "2023-Present",
                role: "Senior Product Operations",
                achievements: "Expanding MESH community and optimizing product-market fit. Streamlining operations for local market nuances and merchant engagement while driving cross-border integration.",
                flagImage: "https://flagsapi.com/UG/flat/64.png",
                color: "#F9D423"
            },
            "Tanzania": {
                capital: "Dodoma",
                duration: "2024-Present",
                role: "Senior Product Operations",
                achievements: "Led smooth product launch and market entry strategy for expansion. Implemented structured issue resolution frameworks ensuring 90% SLA adherence. Conducted comprehensive market analysis.",
                flagImage: "https://flagsapi.com/TZ/flat/64.png",
                color: "#4ECDC4"
            },
            "Malawi": {
                capital: "Lilongwe",
                duration: "2024-Present",
                role: "Strategic Advisor",
                achievements: "Strategic advisory on product expansion and community impact initiatives. Leveraging data to drive user engagement in emerging tech corridors and supporting local entrepreneurship ecosystems.",
                flagImage: "https://flagsapi.com/MW/flat/64.png",
                color: "#E1306C"
            },
            "Nigeria": {
                capital: "Abuja",
                duration: "2023-Present",
                role: "Senior Product Operations",
                achievements: "Spearheading product operations for high-growth markets. Implemented robust analytics framework to monitor real-time growth and merchant success in the West African hub.",
                flagImage: "https://flagsapi.com/NG/flat/64.png",
                color: "#008751"
            },
            "South Africa": {
                capital: "Cape Town",
                duration: "2023-Present",
                role: "Senior Product Operations",
                achievements: "Driving operational excellence and scalability for product ecosystems. Focused on cross-border logistics and merchant payment solutions to enhance regional trade efficiency.",
                flagImage: "https://flagsapi.com/ZA/flat/64.png",
                color: "#007A33"
            },
            "Togo": {
                capital: "Lomé",
                duration: "2024-Present",
                role: "Senior Product Operations",
                achievements: "Market entry strategy and regulatory compliance. Building foundational networks for product adoption in the Francophone West African region with focus on sustainable growth.",
                flagImage: "https://flagsapi.com/TG/flat/64.png",
                color: "#FFCE00"
            },
            "Cameroon": {
                capital: "Yaoundé",
                duration: "2024-Present",
                role: "Product Operations Lead",
                achievements: "Executing product roadmaps and localizing user experiences. Bridging the gap between technology and traditional trade systems to foster digital transformation.",
                flagImage: "https://flagsapi.com/CM/flat/64.png",
                color: "#007A5E"
            },
            "Benin Republic": {
                capital: "Porto-Novo",
                duration: "2024-Present",
                role: "Senior Product Operations",
                achievements: "Leading go-to-market strategy and execution in Benin Republic. Driving high adoption rates through data-driven decision making and strategic market analysis.",
                flagImage: "https://flagsapi.com/BJ/flat/64.png",
                color: "#FCD116"
            },
            "Myanmar": {
                capital: "Naypyidaw",
                duration: "2023-Present",
                role: "Global Product Initiatives",
                achievements: "Leading global product initiatives and remote operations. Driving social impact through technology in complex, high-stakes environments and facilitating cross-cultural collaboration.",
                flagImage: "https://flagsapi.com/MM/flat/64.png",
                color: "#FECB00"
            },
            "Zambia": {
                capital: "Lusaka",
                duration: "2024-Present",
                role: "Senior Product Operations",
                achievements: "Successfully launched and expanded our product within 7 months. Coordinated cross-functional teams to execute strategic initiatives and reduced support queries.",
                flagImage: "https://flagsapi.com/ZM/flat/64.png",
                color: "#198A00"
            },
            "Mozambique": {
                capital: "Maputo",
                duration: "2024-Present",
                role: "Strategic Planning",
                achievements: "Strategic planning for market penetration and community development. Enhancing product accessibility for diverse linguistic and demographic groups in the SADC region.",
                flagImage: "https://flagsapi.com/MZ/flat/64.png",
                color: "#D21034"
            }
        };

        this.activeCountry = null;
        this.previousCountry = null;
        this.init();
    }

    init() {
        this.setupCareerMap();
    }

    setupCareerMap() {
        console.log('Setting up SVG career map...');

        const updateCareerCard = (country) => {
            console.log(`Updating career card for: ${country}`);

            const data = this.careerData[country];
            if (!data) return;

            const elements = this.getOrCreateCardElements();
            if (!elements.careerCard) return;

            // Transition out
            elements.careerCard.classList.remove('active');

            setTimeout(() => {
                this.updateCardContent(elements, data, country);

                // Set accent color for the card's decorative top border
                elements.careerCard.style.setProperty('--card-accent', data.color);

                // Transition in
                elements.careerCard.classList.add('active');
                console.log(`✅ Career card updated for ${country}`);
            }, 300);
        };

        this.setupSVGCountryHandlers(updateCareerCard);
        this.setupMarkerHandlers(updateCareerCard);

        // Highlight all countries that have data
        this.highlightAllImpactedCountries();

        // Initialize with Kenya and trigger sequential animation
        setTimeout(() => {
            this.animateJourneySequence(updateCareerCard);
        }, 1000);

        this.addSVGCareerMapStyles();
    }

    highlightAllImpactedCountries() {
        Object.keys(this.careerData).forEach(country => {
            const el = this.getCountryElement(country);
            if (el) {
                el.style.fill = '#cbd5e1'; // Subtle grey-blue for impacted countries
                el.style.stroke = 'rgba(255,255,255,0.5)';
                el.style.strokeWidth = '1';
                el.classList.add('impacted-country');
            }
        });
    }

    animateJourneySequence(updateCallback) {
        const countries = [
            "Kenya", "Uganda", "Tanzania", "Zambia", "Malawi",
            "Mozambique", "South Africa", "Nigeria", "Benin Republic",
            "Togo", "Cameroon"
        ];

        // Optionally auto-play sequence or just start with Kenya
        this.updateToCountry('Kenya', updateCallback);
    }

    updateToCountry(countryName, updateCallback) {
        if (this.activeCountry === countryName) return;

        this.previousCountry = this.activeCountry;
        this.activeCountry = countryName;

        updateCallback(countryName);
        this.updateSVGCountryStates(countryName);

        if (this.previousCountry) {
            this.drawImpactPath(this.previousCountry, this.activeCountry);
        }
    }

    drawImpactPath(fromCountry, toCountry) {
        const svg = document.getElementById('africa-map');
        if (!svg) return;

        const fromEl = this.getCountryElement(fromCountry);
        const toEl = this.getCountryElement(toCountry);

        if (!fromEl || !toEl) return;

        const fromPoint = this.getElementCenter(fromEl, svg);
        const toPoint = this.getElementCenter(toEl, svg);

        // Remove old links and markers
        svg.querySelectorAll('.impact-link, .impact-traveler').forEach(el => el.remove());

        // Create new path - using elliptical arc with fixed sweep
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const dx = toPoint.x - fromPoint.x;
        const dy = toPoint.y - fromPoint.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;

        const pathData = `M${fromPoint.x},${fromPoint.y}A${dr},${dr} 0 0,1 ${toPoint.x},${toPoint.y}`;
        path.setAttribute('d', pathData);
        path.setAttribute('class', 'impact-link');
        path.setAttribute('stroke', this.careerData[toCountry].color);
        path.id = 'impactPath';

        svg.appendChild(path);

        // Add traveling marker (Airplane-like icon)
        const traveler = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        traveler.setAttribute('class', 'impact-traveler');

        // Use createElementNS for traveler parts to ensure visibility
        const airplaneIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        airplaneIcon.setAttribute('d', 'M-10,-6 L12,0 L-10,6 L-5,0 Z');
        airplaneIcon.setAttribute('fill', this.careerData[toCountry].color);
        airplaneIcon.setAttribute('stroke', 'white');
        airplaneIcon.setAttribute('stroke-width', '1.5');
        traveler.appendChild(airplaneIcon);

        const animateMotion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        animateMotion.setAttribute('dur', '2s');
        animateMotion.setAttribute('repeatCount', 'infinite');
        animateMotion.setAttribute('path', pathData);
        animateMotion.setAttribute('rotate', 'auto');

        traveler.appendChild(animateMotion);
        svg.appendChild(traveler);

        // Add impact pulse at the destination
        setTimeout(() => {
            this.createImpactPulse(toPoint.x, toPoint.y, this.careerData[toCountry].color, svg);
        }, 1500);
    }

    getElementCenter(el, svg) {
        const bbox = el.getBBox();
        return {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
    }

    getCountryElement(countryName) {
        return document.querySelector(`svg path[id*="${countryName}" i]`) ||
            document.querySelector(`svg [data-country*="${countryName}" i]`);
    }

    createImpactPulse(x, y, color, svg) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '10');
        circle.setAttribute('class', 'impact-pulse');
        circle.setAttribute('fill', color);

        svg.appendChild(circle);
        setTimeout(() => circle.remove(), 2000);
    }

    setupSVGCountryHandlers(updateCallback) {
        const selectors = [
            'svg [data-country]',
            'svg path[data-country]',
            'svg g[data-country]',
            'svg [id*="kenya" i], svg [id*="tanzania" i], svg [id*="zambia" i], svg [id*="benin republic" i]',
            'svg path[id*="kenya" i], svg path[id*="tanzania" i], svg path[id*="zambia" i], svg path[id*="benin republic" i], svg path[id*="uganda" i], svg path[id*="malawi" i], svg path[id*="nigeria" i], svg path[id*="south africa" i], svg path[id*="togo" i], svg path[id*="cameroon" i], svg path[id*="mozambique" i]',
            'svg .kenya, svg .tanzania, svg .zambia, svg .benin republic, svg .uganda, svg .malawi, svg .nigeria, svg .south-africa, svg .togo, svg .cameroon, svg .mozambique',
            'svg path.kenya, svg path.tanzania, svg path.zambia, svg path.benin republic, svg path.uganda, svg path.malawi, svg path.nigeria, svg path.south-africa, svg path.togo, svg path.cameroon, svg path.mozambique',
            'svg [title*="Kenya" i], svg [title*="Tanzania" i], svg [title*="Zambia" i], svg [title*="Benin Republic" i], svg [title*="Uganda" i], svg [title*="Malawi" i], svg [title*="Nigeria" i], svg [title*="South Africa" i], svg [title*="Togo" i], svg [title*="Cameroon" i], svg [title*="Mozambique" i]'
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

        if (foundCountries.size === 0) {
            this.setupGenericSVGHandler(updateCallback);
        }

        return foundCountries;
    }

    extractCountryName(element) {
        let country = element.getAttribute('data-country');
        if (country) return this.normalizeCountryName(country);

        const id = element.getAttribute('id') || '';
        if (id.toLowerCase().includes('kenya')) return 'Kenya';
        if (id.toLowerCase().includes('tanzania')) return 'Tanzania';
        if (id.toLowerCase().includes('zambia')) return 'Zambia';
        if (id.toLowerCase().includes('benin republic')) return 'Benin Republic';
        if (id.toLowerCase().includes('uganda')) return 'Uganda';
        if (id.toLowerCase().includes('malawi')) return 'Malawi';
        if (id.toLowerCase().includes('nigeria')) return 'Nigeria';
        if (id.toLowerCase().includes('south africa')) return 'South Africa';
        if (id.toLowerCase().includes('togo')) return 'Togo';
        if (id.toLowerCase().includes('cameroon')) return 'Cameroon';
        if (id.toLowerCase().includes('mozambique')) return 'Mozambique';
        if (id.toLowerCase().includes('myanmar')) return 'Myanmar';

        const className = element.getAttribute('class') || '';
        if (className.toLowerCase().includes('kenya')) return 'Kenya';
        if (className.toLowerCase().includes('tanzania')) return 'Tanzania';
        if (className.toLowerCase().includes('zambia')) return 'Zambia';
        if (className.toLowerCase().includes('benin republic')) return 'Benin Republic';
        if (className.toLowerCase().includes('uganda')) return 'Uganda';
        if (className.toLowerCase().includes('malawi')) return 'Malawi';
        if (className.toLowerCase().includes('nigeria')) return 'Nigeria';
        if (className.toLowerCase().includes('south-africa')) return 'South Africa';
        if (className.toLowerCase().includes('togo')) return 'Togo';
        if (className.toLowerCase().includes('cameroon')) return 'Cameroon';
        if (className.toLowerCase().includes('mozambique')) return 'Mozambique';
        if (className.toLowerCase().includes('myanmar')) return 'Myanmar';

        const title = element.getAttribute('title') || '';
        if (title.toLowerCase().includes('kenya')) return 'Kenya';
        if (title.toLowerCase().includes('tanzania')) return 'Tanzania';
        if (title.toLowerCase().includes('zambia')) return 'Zambia';
        if (title.toLowerCase().includes('benin republic')) return 'Benin Republic';
        if (title.toLowerCase().includes('uganda')) return 'Uganda';
        if (title.toLowerCase().includes('malawi')) return 'Malawi';
        if (title.toLowerCase().includes('nigeria')) return 'Nigeria';
        if (title.toLowerCase().includes('south africa')) return 'South Africa';
        if (title.toLowerCase().includes('togo')) return 'Togo';
        if (title.toLowerCase().includes('cameroon')) return 'Cameroon';
        if (title.toLowerCase().includes('mozambique')) return 'Mozambique';
        if (title.toLowerCase().includes('myanmar')) return 'Myanmar';

        return null;
    }

    normalizeCountryName(name) {
        const normalized = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const validCountries = [
            'Kenya', 'Uganda', 'Tanzania', 'Malawi', 'Nigeria',
            'South Africa', 'Togo', 'Cameroon', 'Benin Republic',
            'Myanmar', 'Zambia', 'Mozambique'
        ];
        return validCountries.find(country =>
            country.toLowerCase() === normalized.toLowerCase()
        ) || null;
    }

    setupCountryClickHandler(element, country, updateCallback) {
        console.log(`Setting up click handler for ${country}`);

        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.3s ease';

        const originalFill = element.getAttribute('fill') || element.style.fill;
        const originalStroke = element.getAttribute('stroke') || element.style.stroke;

        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log(`🖱️ SVG Country clicked: ${country}`);

            this.updateToCountry(country, updateCallback);

            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });

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

        element.setAttribute('data-country-handler', country);
    }

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

            svg.style.transform = 'scale(0.98)';
            setTimeout(() => {
                svg.style.transform = 'scale(1)';
            }, 100);
        });

        console.log('Generic SVG handler set up - click anywhere on the map to cycle through countries');
    }

    updateSVGCountryStates(activeCountry) {
        document.querySelectorAll('svg path[id]').forEach(element => {
            element.classList.remove('active-country');
            const country = this.extractCountryName(element);
            if (country && this.careerData[country]) {
                element.style.fill = '#cbd5e1'; // Impacted base color
            } else {
                element.style.fill = '#D3D3D3'; // Default grey
            }
            element.style.filter = 'none';
            element.style.opacity = '1';
        });

        document.querySelectorAll('.marker').forEach(marker => {
            marker.classList.remove('active-marker');
            marker.style.background = '';
            marker.style.transform = '';
        });

        const data = this.careerData[activeCountry];
        if (data) {
            document.querySelectorAll(`[data-country-handler="${activeCountry}"]`).forEach(element => {
                element.classList.add('active-country');
                element.style.fill = data.color;
                element.style.filter = `drop-shadow(0 0 15px ${data.color}80)`;
                element.style.opacity = '1';
            });

            const marker = document.querySelector(`.marker[data-country="${activeCountry}"]`);
            if (marker) {
                marker.classList.add('active-marker');
                marker.style.background = data.color;
                marker.style.transform = 'scale(1.2) translateY(-5px)';
            }
        }
    }

    highlightSVGCountry(country) {
        this.updateSVGCountryStates(country);
    }
    getOrCreateCardElements() {
        let careerCard = document.getElementById('career-card');

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

    updateCardContent(elements, data, country) {
        if (elements.countryName) {
            elements.countryName.textContent = country;
            elements.countryName.style.color = data.color;
        }

        if (elements.capital) {
            elements.capital.textContent = `Capital: ${data.capital}`;
        }
        if (elements.duration) {
            elements.duration.textContent = data.duration;
            elements.duration.style.background = data.color;
        }

        if (elements.role) {
            elements.role.textContent = data.role;
        }
        if (elements.achievements) {
            elements.achievements.textContent = data.achievements;
        }

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

    addSVGCareerMapStyles() {
        if (document.getElementById('svg-career-map-styles')) return;

        const style = document.createElement('style');
        style.id = 'svg-career-map-styles';
        style.textContent = `
            /* SVG Interactive Styles */
            svg [data-country-handler] {
                cursor: pointer !important;
                transition: all 0.3s ease !important;
            }

            svg [data-country-handler]:hover {
                filter: brightness(1.1) saturate(1.2) !important;
            }

            svg [data-country-handler].active-country {
                filter: brightness(1.2) saturate(1.4) !important;
                stroke: #fff !important;
                stroke-width: 3 !important;
            }
        `;

        document.head.appendChild(style);
    }

    setupMarkerHandlers(updateCallback) {
        const markers = document.querySelectorAll('.marker[data-country]');
        console.log(`Setting up ${markers.length} marker handlers...`);

        markers.forEach(marker => {
            const countryAttribute = marker.getAttribute('data-country');
            const country = this.normalizeCountryName(countryAttribute);

            if (!country || !this.careerData[country]) {
                console.warn(`Marker country "${countryAttribute}" (normalized: "${country}") not found in careerData`);
                return;
            }

            marker.style.cursor = 'pointer';
            marker.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`📍 Marker clicked: ${country}`);
                this.updateToCountry(country, updateCallback);

                if (window.innerWidth < 768) {
                    const section = document.getElementById('impact-journey');
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    enableDebugMode() {
        const debug = document.createElement('div');
        debug.className = 'debug-info';
        debug.style.display = 'block';
        document.body.appendChild(debug);

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