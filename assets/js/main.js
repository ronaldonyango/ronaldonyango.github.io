function getPageLoadTime() {
    if (window.performance && window.performance.getEntriesByType) {
        var entries = window.performance.getEntriesByType("navigation");
        if (entries.length > 0) {
            var navTiming = entries[0];
            var pageLoadTime = navTiming.loadEventEnd - navTiming.startTime;
            return Math.round(((pageLoadTime / 1000) + Number.EPSILON) * 100) / 100;
        }
    }
}
