const isRetinaMobile = window.matchMedia(
    "screen and (max-width: 1024px) and (max-height: 1024px) and (-webkit-min-device-pixel-ratio: 2)"
).matches;

const images = document.querySelectorAll('.scrollJackContent');
const sections = document.querySelectorAll('[data-image-index]');
const sectionsMobile = document.querySelectorAll('.scrollJackBoxMobile');

let sectionCount = sectionsMobile.length;

if(!isRetinaMobile) sectionCount = sections.length;

const nextButtonDesktop = document.querySelectorAll('.nextBtn')[0];
const prevButtonDesktop = document.querySelectorAll('.prevBtn')[0];

const nextButtonMobile = document.querySelectorAll('.nextBtnMobile')[0];
const prevButtonMobile = document.querySelectorAll('.prevBtnMobile')[0];

function updateActiveImage(index) {
    images.forEach(img => img.removeAttribute('id'));
    if (images[index]) images[index].id = 'selectedContent';
}

let visibleSections = new Map();
let currentIndex = 0;

function updateActiveButtons(index) {
    if(isRetinaMobile) {
        nextButtonMobile.classList.remove('disabled');
        prevButtonMobile.classList.remove('disabled');
        if (index <= 0) prevButtonMobile.classList.add('disabled');
        else if (index >= sectionsMobile.length - 1) nextButtonMobile.classList.add('disabled');
    } else {
        nextButtonDesktop.classList.remove('disabled');
        prevButtonDesktop.classList.remove('disabled');
        if (index <= 0) prevButtonDesktop.classList.add('disabled');
        else if (index >= sectionCount - 1) nextButtonDesktop.classList.add('disabled');
    }
}


function scrollToSection(index) {
    if (index >= 0 && index < sectionCount) {
        currentIndex = index;
        if(isRetinaMobile)
        {
            sectionsMobile[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        } else {
            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

nextButtonMobile.addEventListener('click', () => {
    scrollToSection(currentIndex + 1);
});

prevButtonMobile.addEventListener('click', () => {
    scrollToSection(currentIndex - 1);
});

nextButtonDesktop.addEventListener('click', () => {
    scrollToSection(currentIndex + 1);
});

prevButtonDesktop.addEventListener('click', () => {
    scrollToSection(currentIndex - 1);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = parseInt(entry.target.dataset.imageIndex, 10);
        if (entry.isIntersecting) {
            visibleSections.set(index, entry.intersectionRatio);
            currentIndex = index;
        } else {
            visibleSections.delete(index);
        }
    });

    currentIndex = Math.min(Math.max(currentIndex, 0), sectionCount - 1);
    updateActiveButtons(currentIndex);

    if (visibleSections.size > 0) {
        const best = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0];
        updateActiveImage(best[0] - 1);
    } else {
        images.forEach(img => img.removeAttribute('id'));
    }
}, {
    root: document.querySelector('.container'),
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    rootMargin: '0px',
});

if(isRetinaMobile) sectionsMobile.forEach(section => observer.observe(section));
else sections.forEach(section => observer.observe(section));
