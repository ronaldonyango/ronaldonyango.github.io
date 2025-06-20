// js/main.js
import ComponentLoader from './components/ComponentLoader.js';
import NetworkMonitor from './components/NetworkMonitor.js';
import PortfolioWebsite from './components/PortfolioWebsite.js';

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏁 DOM Content Loaded');
    NetworkMonitor.monitor();
    NetworkMonitor.checkFileSystem();
    
    // Start component loading
    window.componentLoader = new ComponentLoader();
    
    // Initialize portfolio after components are loaded
    setTimeout(() => {
        window.portfolioInstance = new PortfolioWebsite();
    }, 500);
});

// Global error handlers
window.addEventListener('error', (event) => {
    console.error('🚨 Global Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const lines = document.querySelectorAll('.connection-line');
    if (document.hidden) {
        lines.forEach(line => line.style.animationPlayState = 'paused');
    } else {
        lines.forEach(line => line.style.animationPlayState = 'running');
    }
});