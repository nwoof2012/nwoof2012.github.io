const images = document.querySelectorAll('.scrollJackContent');
const sections = document.querySelectorAll('.section');

function updateActiveImage(index) {
    // Remove active id from all images
    images.forEach(img => img.removeAttribute('id'));

    // Apply id to the current image
    if(index >= 0) {
        if (images[index]) {
            images[index].id = 'selectedContent';
        }
    }
}

let visibleSections = new Map();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = parseInt(entry.target.dataset.imageIndex, 10);
        if (entry.isIntersecting) {
            visibleSections.set(index, entry.intersectionRatio);
        } else {
            visibleSections.delete(index);
        }
    });

    if (visibleSections.size > 0) {
        // Find the section that's most visible
        const best = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
        updateActiveImage(best[0]);
    } else {
        // If no sections are visible, remove the active id
        images.forEach(img => img.removeAttribute('id'));
    }
}, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    rootMargin: '0px',
});

sections.forEach(section => observer.observe(section));
