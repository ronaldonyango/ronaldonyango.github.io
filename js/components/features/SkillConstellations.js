class SkillConstellations {
    constructor() {
        this.skillDomains = {
            'strategy-constellation': {
                color: '#22c55e',
                primary: ['Go-to-Market Strategy'],
                secondary: ['Market Expansion', 'Product Launch', 'Strategic Communications'],
                tertiary: ['User Research', 'Competitive Analysis', 'Product Positioning']
            },
            'operations-constellation': {
                color: '#3b82f6',
                primary: ['Cross-functional Leadership'],
                secondary: ['Process Optimization', 'Quality Assurance', 'Issue Resolution'],
                tertiary: ['SLA Management', 'Documentation', 'Workflow Design']
            },
            'analytics-constellation': {
                color: '#8b5cf6',
                primary: ['Business Intelligence'],
                secondary: ['Python', 'SQL', 'Data Analysis'],
                tertiary: ['Custom Reports', 'Performance Metrics', 'Dashboard Analytics']
            },
            'technical-constellation': {
                color: '#f59e0b',
                primary: ['End-to-End Testing'],
                secondary: ['API Testing', 'Database Testing', 'App Testing'],
                tertiary: ['Automation Tools', 'Testing Frameworks', 'Technical Documentation']
            },
            'leadership-constellation': {
                color: '#ef4444',
                primary: ['Strategic Initiative Management'],
                secondary: ['Team Coordination', 'Stakeholder Alignment', 'Product Lifecycle'],
                tertiary: ['Change Management', 'Communication', 'Executive Support']
            },
            'social-constellation': {
                color: '#ec4899',
                primary: ['Mental Health Advocacy'],
                secondary: ['Community Impact', 'Youth Development', 'Board Leadership'],
                tertiary: ['Partnership Building', 'Program Implementation', 'Social Innovation']
            }
        };

        this.nodeSizes = {
            primary: 100,
            secondary: 80,
            tertiary: 65
        };

        this.init();
    }

    init() {
        Object.entries(this.skillDomains).forEach(([domainId, data]) => {
            this.createConstellation(domainId, data);
        });
    }

    createSkillNode(text, type, domainColor) {
        const node = document.createElement('div');
        node.className = `skill-node ${type}`;
        node.textContent = text;

        if (type === 'primary') {
            node.style.background = `linear-gradient(135deg, ${domainColor}, ${this.adjustColor(domainColor, 40)})`;
            node.style.boxShadow = `0 8px 25px ${this.adjustColor(domainColor, 0, 0.4)}`;
        } else {
            node.style.borderColor = this.adjustColor(domainColor, 0, 0.4);
        }

        node.addEventListener('mouseenter', (e) => this.highlightNodeConnections(e, true, domainColor));
        node.addEventListener('mouseleave', (e) => this.highlightNodeConnections(e, false, domainColor));

        return node;
    }

    createConstellation(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const centerX = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;

        this.renderConnections(container, data, centerX, centerY);
        this.renderNodes(container, data, centerX, centerY);
    }

    renderNodes(container, data, centerX, centerY) {
        // Primary
        data.primary.forEach(skill => {
            const node = this.createSkillNode(skill, 'primary', data.color);
            const offset = this.nodeSizes.primary / 2;
            node.style.left = `${centerX - offset}px`;
            node.style.top = `${centerY - offset}px`;
            container.appendChild(node);
        });

        // Secondary
        const secondaryRadius = container.offsetWidth < 450 ? 95 : 120;
        data.secondary.forEach((skill, index) => {
            const angle = (index * (360 / data.secondary.length) - 90) * (Math.PI / 180);
            const x = centerX + Math.cos(angle) * secondaryRadius - (this.nodeSizes.secondary / 2);
            const y = centerY + Math.sin(angle) * secondaryRadius - (this.nodeSizes.secondary / 2);

            const node = this.createSkillNode(skill, 'secondary', data.color);
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            node.setAttribute('data-index', index);
            container.appendChild(node);
        });

        // Tertiary
        const tertiaryRadius = container.offsetWidth < 450 ? 150 : 180;
        data.tertiary.forEach((skill, index) => {
            const angle = (index * (360 / data.tertiary.length) - 45) * (Math.PI / 180);
            const x = centerX + Math.cos(angle) * tertiaryRadius - (this.nodeSizes.tertiary / 2);
            const y = centerY + Math.sin(angle) * tertiaryRadius - (this.nodeSizes.tertiary / 2);

            const node = this.createSkillNode(skill, 'tertiary', data.color);
            node.style.left = `${x}px`;
            node.style.top = `${y}px`;
            node.setAttribute('data-t-index', index);
            container.appendChild(node);
        });
    }

    renderConnections(container, data, centerX, centerY) {
        const secondaryRadius = container.offsetWidth < 450 ? 95 : 120;
        const tertiaryRadius = container.offsetWidth < 450 ? 150 : 180;

        // Primary to Secondary
        data.secondary.forEach((_, index) => {
            const angle = (index * (360 / data.secondary.length) - 90) * (Math.PI / 180);
            const x2 = centerX + Math.cos(angle) * secondaryRadius;
            const y2 = centerY + Math.sin(angle) * secondaryRadius;

            const line = this.createConnectionLine(centerX, centerY, x2, y2);
            line.setAttribute('data-connection', `primary-secondary-${index}`);
            container.appendChild(line);
        });

        // Secondary to Tertiary
        data.tertiary.forEach((_, index) => {
            const angle = (index * (360 / data.tertiary.length) - 45) * (Math.PI / 180);
            const x2 = centerX + Math.cos(angle) * tertiaryRadius;
            const y2 = centerY + Math.sin(angle) * tertiaryRadius;

            let nearestIndex = 0;
            let minDist = Infinity;
            data.secondary.forEach((_, sIndex) => {
                const sAngle = (sIndex * (360 / data.secondary.length) - 90) * (Math.PI / 180);
                const sx = centerX + Math.cos(sAngle) * secondaryRadius;
                const sy = centerY + Math.sin(sAngle) * secondaryRadius;
                const dist = Math.sqrt((x2 - sx) ** 2 + (y2 - sy) ** 2);
                if (dist < minDist) {
                    minDist = dist;
                    nearestIndex = sIndex;
                }
            });

            const sAngle = (nearestIndex * (360 / data.secondary.length) - 90) * (Math.PI / 180);
            const line = this.createConnectionLine(
                centerX + Math.cos(sAngle) * secondaryRadius,
                centerY + Math.sin(sAngle) * secondaryRadius,
                x2, y2
            );
            line.setAttribute('data-connection', `secondary-${nearestIndex}-tertiary-${index}`);
            line.style.opacity = '0.05';
            container.appendChild(line);
        });
    }

    createConnectionLine(x1, y1, x2, y2) {
        const line = document.createElement('div');
        line.className = 'connection-line';

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        Object.assign(line.style, {
            width: `${length}px`,
            left: `${x1}px`,
            top: `${y1}px`,
            transform: `rotate(${angle}deg)`
        });

        return line;
    }

    highlightNodeConnections(e, highlight, color) {
        const node = e.target;
        const container = node.parentElement;
        const type = node.classList.contains('primary') ? 'primary' :
            node.classList.contains('secondary') ? 'secondary' : 'tertiary';

        if (highlight) {
            node.style.background = type === 'primary' ?
                `linear-gradient(135deg, ${color}, ${this.adjustColor(color, 60)})` :
                this.adjustColor(color, 0, 0.2);
            node.style.borderColor = color;
            node.style.boxShadow = `0 0 20px ${this.adjustColor(color, 0, 0.5)}`;
        } else {
            node.style.background = type === 'primary' ?
                `linear-gradient(135deg, ${color}, ${this.adjustColor(color, 40)})` :
                '';
            node.style.borderColor = '';
            node.style.boxShadow = type === 'primary' ? `0 8px 25px ${this.adjustColor(color, 0, 0.4)}` : '';
        }

        // Highlight relevant lines
        const lines = container.querySelectorAll('.connection-line');
        lines.forEach(line => {
            const conn = line.getAttribute('data-connection');
            let isRelated = false;

            if (type === 'primary') isRelated = conn.startsWith('primary-secondary');
            else if (type === 'secondary') {
                const idx = node.getAttribute('data-index');
                isRelated = conn.includes(`secondary-${idx}`);
            } else {
                const idx = node.getAttribute('data-t-index');
                isRelated = conn.includes(`tertiary-${idx}`);
            }

            if (isRelated) {
                line.style.opacity = highlight ? '0.8' : '';
                line.style.background = highlight ? color : '';
                line.style.height = highlight ? '2px' : '';
            }
        });
    }

    adjustColor(hex, amount, alpha = 1) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);

        r = Math.min(255, Math.max(0, r + amount));
        g = Math.min(255, Math.max(0, g + amount));
        b = Math.min(255, Math.max(0, b + amount));

        return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
}

export default SkillConstellations;