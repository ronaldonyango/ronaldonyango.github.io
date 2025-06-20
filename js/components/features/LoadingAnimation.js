class LoadingAnimation {
    constructor() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
}

export default LoadingAnimation;
