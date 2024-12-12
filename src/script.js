function toggleProjects() {
        const projectsSection = document.querySelector('.projects-section');
        const chevron = document.querySelector('.chevron');
        
        projectsSection.classList.toggle('hidden');
        chevron.classList.toggle('active');
      }