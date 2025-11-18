const isRetinaMobile = window.matchMedia(
    "screen and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)"
).matches;

const images = document.querySelectorAll('.scrollJackContent');
const sections = document.querySelectorAll('[data-image-index]');
const sectionsMobile = document.querySelectorAll('.scrollJackBoxMobile');

function updateActiveImage(index) {
    images.forEach(img => img.removeAttribute('id'));
    if (images[index]) images[index].id = 'selectedContent';
}

let visibleSections = new Map();
let currentIndex = 0;

function scrollToSection(index) {
    if (index >= 0 && index < sectionsMobile.length) {
        currentIndex = index;
        sectionsMobile[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

document.getElementById('nextBtn').addEventListener('click', () => {
    scrollToSection(currentIndex + 1);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    scrollToSection(currentIndex - 1);
});

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
        const best = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
        updateActiveImage(best[0]);
    } else {
        images.forEach(img => img.removeAttribute('id'));
    }
}, {
    root: document.querySelector('.container'),
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    rootMargin: '0px',
});

sections.forEach(section => observer.observe(section));
