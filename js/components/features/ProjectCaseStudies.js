class ProjectCaseStudies {
    constructor() {
        this.modal = document.getElementById('project-modal');
        this.closeBtn = document.querySelector('.close-modal');
        this.openBtns = document.querySelectorAll('.open-case-study');

        this.init();
    }

    init() {
        if (!this.modal) return;

        this.openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.openModal(e));
        });

        this.closeBtn.addEventListener('click', () => this.closeModal());

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    openModal(e) {
        const card = e.target.closest('.project-card');
        const title = card.querySelector('.project-title').textContent;
        const s = card.getAttribute('data-star-s');
        const t = card.getAttribute('data-star-t');
        const a = card.getAttribute('data-star-a');
        const r = card.getAttribute('data-star-r');

        document.getElementById('modal-title').textContent = title;
        const modalBody = document.querySelector('.modal-body');

        // Remove existing content if any (except title)
        const existingContent = modalBody.querySelector('.project-narrative');
        if (existingContent) existingContent.remove();

        const contentDiv = document.createElement('div');
        contentDiv.className = 'project-narrative';

        contentDiv.innerHTML = `
            <p class="narrative-lead">${s}</p>
            <p class="narrative-block"><strong>The Objective:</strong> ${t}</p>
            <p class="narrative-block"><strong>Strategic Approach:</strong> ${a}</p>
            <div class="narrative-result">
                <span>Outcome</span>
                <p>${r}</p>
            </div>
        `;

        document.getElementById('modal-title').textContent = title;
        modalBody.appendChild(contentDiv);

        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

export default ProjectCaseStudies;
