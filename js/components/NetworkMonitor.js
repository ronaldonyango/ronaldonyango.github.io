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

export default NetworkMonitor;