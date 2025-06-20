class SkillConstellations {
    constructor() {
        this.skillDomains = {
            'strategy-constellation': {
                primary: ['Go-to-Market Strategy'],
                secondary: ['Market Expansion', 'Product Launch', 'Strategic Communications'],
                tertiary: ['User Research', 'Competitive Analysis', 'Product Positioning']
            },
            'operations-constellation': {
                primary: ['Cross-functional Leadership'],
                secondary: ['Process Optimization', 'Quality Assurance', 'Issue Resolution'],
                tertiary: ['SLA Management', 'Documentation', 'Workflow Design']
            },
            'analytics-constellation': {
                primary: ['Business Intelligence'],
                secondary: ['Python', 'SQL', 'Data Analysis'],
                tertiary: ['Custom Reports', 'Performance Metrics', 'Dashboard Analytics']
            },
            'technical-constellation': {
                primary: ['End-to-End Testing'],
                secondary: ['API Testing', 'Database Testing', 'App Testing'],
                tertiary: ['Automation Tools', 'Testing Frameworks', 'Technical Documentation']
            },
            'leadership-constellation': {
                primary: ['Strategic Initiative Management'],
                secondary: ['Team Coordination', 'Stakeholder Alignment', 'Product Lifecycle'],
                tertiary: ['Change Management', 'Communication', 'Executive Support']
            },
            'social-constellation': {
                primary: ['Mental Health Advocacy'],
                secondary: ['Community Impact', 'Youth Development', 'Board Leadership'],
                tertiary: ['Partnership Building', 'Program Implementation', 'Social Innovation']
            }
        };

        this.init();
    }

    init() {
        Object.entries(this.skillDomains).forEach(([domainId, skills]) => {
            this.createConstellation(domainId, skills);
        });

        this.animateConnectionLines();
    }

    createSkillNode(text, type) {
        const node = document.createElement('div');
        node.className = `skill-node ${type}`;
        
        // Optimize text wrapping
        let displayText = text;
        if (text.length > 12) {
            const words = text.split(' ');
            if (words.length > 1) {
                const midpoint = Math.ceil(words.length / 2);
                displayText = words.slice(0, midpoint).join(' ') + '\n' + 
                             words.slice(midpoint).join(' ');
            }
        }
        
        node.textContent = displayText;
        
        // Add efficient hover effects
        node.addEventListener('mouseenter', this.highlightConnections.bind(this));
        node.addEventListener('mouseleave', this.removeHighlight.bind(this));
        
        return node;
    }

    createConstellation(containerId, skills) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Set container properties
        Object.assign(container.style, {
            position: 'relative',
            width: '100%',
            height: '340px'
        });
        
        const centerX = 170;
        const centerY = 170;

        // Create nodes with optimized positioning
        this.createNodes(container, skills, centerX, centerY);
        this.createConnections(container, skills, centerX, centerY);
    }

    createNodes(container, skills, centerX, centerY) {
        // Primary nodes (center)
        skills.primary.forEach(skill => {
            const node = this.createSkillNode(skill, 'primary');
            node.style.left = `${centerX - 45}px`;
            node.style.top = `${centerY - 45}px`;
            container.appendChild(node);
        });

        // Secondary nodes
        const secondaryRadius = 100;
        skills.secondary.forEach((skill, index) => {
            const angle = (index * 360 / skills.secondary.length) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * secondaryRadius - 35;
            const y = centerY + Math.sin(angle) * secondaryRadius - 35;
            
            const node = this.createSkillNode(skill, 'secondary');
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            container.appendChild(node);
        });

        // Tertiary nodes
        const tertiaryRadius = 160;
        skills.tertiary.forEach((skill, index) => {
            const angle = ((index * 360 / skills.tertiary.length) + 30) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * tertiaryRadius - 27.5;
            const y = centerY + Math.sin(angle) * tertiaryRadius - 27.5;
            
            const node = this.createSkillNode(skill, 'tertiary');
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            container.appendChild(node);
        });
    }

    createConnections(container, skills, centerX, centerY) {
        const secondaryRadius = 100;
        const tertiaryRadius = 160;

        // Primary to secondary connections
        skills.secondary.forEach((skill, index) => {
            const angle = (index * 360 / skills.secondary.length) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * secondaryRadius;
            const y = centerY + Math.sin(angle) * secondaryRadius;
            
            const line = this.createConnectionLine(centerX, centerY, x, y);
            container.appendChild(line);
        });

        // Secondary to tertiary connections
        skills.tertiary.forEach((skill, index) => {
            const angle = ((index * 360 / skills.tertiary.length) + 30) * Math.PI / 180;
            const x = centerX + Math.cos(angle) * tertiaryRadius;
            const y = centerY + Math.sin(angle) * tertiaryRadius;

            // Find nearest secondary node
            let minDistance = Infinity;
            let nearestSecondary = null;
            
            skills.secondary.forEach((secondarySkill, secIndex) => {
                const secAngle = (secIndex * 360 / skills.secondary.length) * Math.PI / 180;
                const secX = centerX + Math.cos(secAngle) * secondaryRadius;
                const secY = centerY + Math.sin(secAngle) * secondaryRadius;
                const distance = Math.sqrt((x - secX) ** 2 + (y - secY) ** 2);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestSecondary = { x: secX, y: secY };
                }
            });

            if (nearestSecondary) {
                const line = this.createConnectionLine(nearestSecondary.x, nearestSecondary.y, x, y);
                line.style.opacity = '0.3';
                container.appendChild(line);
            }
        });
    }

    createConnectionLine(x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'connection-line';
        
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        Object.assign(line.style, {
            width: `${length}px`,
            left: `${x1}px`,
            top: `${y1}px`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 50%'
        });
        
        return line;
    }

    highlightConnections(event) {
        const container = event.target.parentElement;
        const lines = container.querySelectorAll('.connection-line');
        
        lines.forEach(line => {
            line.style.opacity = parseFloat(line.style.opacity || '0.3') * 2;
            line.style.background = 'linear-gradient(90deg, rgba(99, 102, 241, 0.6), rgba(236, 72, 153, 0.6))';
        });
        
        event.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
    }

    removeHighlight(event) {
        const container = event.target.parentElement;
        const lines = container.querySelectorAll('.connection-line');
        
        lines.forEach(line => {
            line.style.opacity = parseFloat(line.style.opacity || '0.6') / 2;
            line.style.background = 'linear-gradient(90deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3))';
        });
        
        event.target.style.boxShadow = '';
    }

    animateConnectionLines() {
        setInterval(() => {
            const lines = document.querySelectorAll('.connection-line');
            lines.forEach(line => {
                const opacity = Math.random() * 0.3 + 0.1;
                line.style.opacity = opacity;
                setTimeout(() => {
                    line.style.opacity = '0.2';
                }, 500);
            });
        }, 3000);
    }
}

export default SkillConstellations;