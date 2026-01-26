class ComponentLoader {
    constructor() {
        this.components = [
            'header', 'hero', 'impact-dashboard', 'experience',
            'projects', 'impact-journey', 'about', 'education',
            'tech-stack', 'skills', 'contact', 'footer'
        ];
        this.loadedComponents = {};
    }

    async loadAll() {
        console.log('🚀 Starting component loading sequence...');
        const promises = this.components.map(component => this.loadComponent(component));

        await Promise.allSettled(promises);

        const loadedCount = Object.values(this.loadedComponents).filter(c => c.status === 'loaded').length;
        console.log(`📊 Loading Summary: ${loadedCount}/${this.components.length} components ready.`);

        // Dispatch completion event
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    async loadComponent(componentName) {
        const container = document.getElementById(`${componentName}-component`);
        if (!container) {
            console.error(`❌ Container not found for ${componentName}`);
            this.loadedComponents[componentName] = { status: 'error' };
            return;
        }

        try {
            const response = await fetch(`components/${componentName}.html?t=${Date.now()}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.text();
            container.innerHTML = data;

            this.loadedComponents[componentName] = { status: 'loaded' };
            console.log(`✅ ${componentName} loaded.`);
        } catch (error) {
            console.error(`❌ Failed to load ${componentName}:`, error);
            this.loadedComponents[componentName] = { status: 'error' };
        }
    }
}

export default ComponentLoader;