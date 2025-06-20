// ComponentLoader.js - Traditional script version
class ComponentLoader {
    constructor() {
        this.components = [
            'header', 'hero', 'about', 'experience',
            'impact-journey', 'projects', 'skills',
            'education', 'contact', 'footer'
        ];
        this.loadedComponents = {};
        this.debugPanel = document.getElementById('debug-status');
        this.init();
    }

    init() {
        console.log('🚀 Starting component loading...');
        this.updateDebugPanel();
        this.loadComponents();
    }

    async loadComponents() {
        const promises = this.components.map(component => this.loadComponent(component));
        
        try {
            await Promise.allSettled(promises);
            console.log('✅ All component loading attempts completed');
            this.finalizeLoading();
        } catch (error) {
            console.error('❌ Error in component loading:', error);
        }
    }

    async loadComponent(componentName) {
        const startTime = Date.now();
        const container = document.getElementById(`${componentName}-component`);
        const containerElement = document.querySelector(`[data-component="${componentName}"]`);
        
        if (!container) {
            console.error(`❌ Container not found for ${componentName}`);
            this.loadedComponents[componentName] = { status: 'error', error: 'Container not found' };
            this.updateDebugPanel();
            return;
        }

        try {
            console.log(`🔄 Loading ${componentName}...`);
            this.loadedComponents[componentName] = { status: 'loading', startTime };
            this.updateDebugPanel();

            const response = await fetch(`components/${componentName}.html`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.text();
            const loadTime = Date.now() - startTime;

            if (data.trim() === '') {
                throw new Error('Empty component file');
            }

            // Insert the component content
            container.innerHTML = data;
            
            // Update visual indicators
            if (containerElement) {
                containerElement.classList.add('loaded');
            }

            this.loadedComponents[componentName] = {
                status: 'loaded',
                loadTime,
                size: data.length
            };

            console.log(`✅ ${componentName} loaded successfully (${loadTime}ms, ${data.length} chars)`);

        } catch (error) {
            console.error(`❌ Failed to load ${componentName}:`, error);
            
            // Update visual indicators
            if (containerElement) {
                containerElement.classList.add('error');
            }

            this.loadedComponents[componentName] = {
                status: 'error',
                error: error.message,
                loadTime: Date.now() - startTime
            };
        }

        this.updateDebugPanel();
    }

    updateDebugPanel() {
        if (!this.debugPanel) return;

        const statusHtml = this.components.map(component => {
            const status = this.loadedComponents[component];
            if (!status) {
                return `<div class="status pending">⏳ ${component}: Pending</div>`;
            }

            switch (status.status) {
                case 'loading':
                    return `<div class="status pending">🔄 ${component}: Loading...</div>`;
                case 'loaded':
                    return `<div class="status loaded">✅ ${component}: Loaded (${status.loadTime}ms)</div>`;
                case 'error':
                    return `<div class="status error">❌ ${component}: ${status.error}</div>`;
                default:
                    return `<div class="status pending">❓ ${component}: Unknown</div>`;
            }
        }).join('');

        this.debugPanel.innerHTML = statusHtml;
    }

    finalizeLoading() {
        const loadedCount = Object.values(this.loadedComponents).filter(c => c.status === 'loaded').length;
        const errorCount = Object.values(this.loadedComponents).filter(c => c.status === 'error').length;

        console.log(`📊 Loading Summary: ${loadedCount} loaded, ${errorCount} errors`);

        // Initialize features after components are loaded
        setTimeout(() => {
            this.initializeFeatures();
        }, 500);

        // Update debug panel header
        const debugHeader = document.querySelector('.debug-info h4');
        if (debugHeader) {
            if (errorCount === 0) {
                debugHeader.innerHTML = '✅ All Components Loaded';
                debugHeader.style.color = '#4CAF50';
            } else {
                debugHeader.innerHTML = `⚠️ ${loadedCount}/${this.components.length} Components Loaded`;
                debugHeader.style.color = '#ff9800';
            }
        }
    }

    initializeFeatures() {
        console.log('🎯 Initializing JavaScript features...');
        
        try {
            // Check if PortfolioWebsite class exists
            if (typeof PortfolioWebsite !== 'undefined') {
                console.log('✅ PortfolioWebsite class found, initializing...');
                window.portfolioInstance = new PortfolioWebsite();
            } else {
                console.log('⚠️ PortfolioWebsite class not found, will be loaded by main.js');
            }
        } catch (error) {
            console.error('❌ Error initializing features:', error);
        }
    }
}

// Network status monitoring
class NetworkMonitor {
    static monitor() {
        if ('navigator' in window && 'onLine' in navigator) {
            const updateStatus = () => {
                const status = navigator.onLine ? 'Online' : 'Offline';
                console.log(`🌐 Network Status: ${status}`);
            };
            
            window.addEventListener('online', updateStatus);
            window.addEventListener('offline', updateStatus);
            updateStatus();
        }
    }

    static checkFileSystem() {
        console.log('📁 Checking file system structure...');
        
        // Try to fetch a component to test the setup
        fetch('components/header.html')
            .then(response => {
                if (response.ok) {
                    console.log('✅ Component directory is accessible');
                } else {
                    console.error('❌ Component directory may not exist or be accessible');
                }
            })
            .catch(error => {
                console.error('❌ Error accessing components:', error);
                console.log('💡 Make sure you have a "components" directory with HTML files');
            });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏁 DOM Content Loaded');
    NetworkMonitor.monitor();
    NetworkMonitor.checkFileSystem();
    
    // Start component loading
    window.componentLoader = new ComponentLoader();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    console.log('🏁 DOM Already Loaded');
    NetworkMonitor.monitor();
    NetworkMonitor.checkFileSystem();
    window.componentLoader = new ComponentLoader();
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('🚨 Global Error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

// Make ComponentLoader available globally
export default ComponentLoader;
export { NetworkMonitor };