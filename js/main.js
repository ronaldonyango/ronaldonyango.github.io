import ComponentLoader from './components/ComponentLoader.js';
import NetworkMonitor from './components/NetworkMonitor.js';
import PortfolioWebsite from './components/PortfolioWebsite.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    NetworkMonitor.monitor();
    NetworkMonitor.checkFileSystem();
    window.componentLoader = new ComponentLoader();
    setTimeout(() => {
        window.portfolioInstance = new PortfolioWebsite();
    }, 500);
});

window.addEventListener('error', (event) => {
    console.error('Global Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
});

document.addEventListener('visibilitychange', () => {
    const lines = document.querySelectorAll('.connection-line');
    if (document.hidden) {
        lines.forEach(line => line.style.animationPlayState = 'paused');
    } else {
        lines.forEach(line => line.style.animationPlayState = 'running');
    }
});