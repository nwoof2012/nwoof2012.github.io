let current = 0;
let isTransitioning = false;

const isRetinaMobile = window.matchMedia(
    "screen and (max-width: 1024px) and (max-height: 1024px) and (-webkit-min-device-pixel-ratio: 2)"
).matches;

var currentIndex = 0;

const images = document.querySelectorAll('.scrollJackContent');

const nextButtonDesktop = document.querySelectorAll('.nextBtn')[0];
const prevButtonDesktop = document.querySelectorAll('.prevBtn')[0];

const nextButtonMobile = document.querySelectorAll('.nextBtnMobile')[0];
const prevButtonMobile = document.querySelectorAll('.prevBtnMobile')[0];

var sections = document.querySelectorAll("[data-image-index]");
if (isRetinaMobile) sections = document.querySelectorAll(".scrollJackBoxMobile");
const stinger = document.querySelector(".stinger");

var sectionCount = sections.length;

console.log(sections.length);

let visibleSections = new Map();

function goToSection(nextIndex) {
    if (isTransitioning) return;

    isTransitioning = true;

    const direction = nextIndex > currentIndex ? "down" : "up";

    stinger.classList.add("active", direction);

    setTimeout(() => {
        sections[currentIndex].classList.remove("active");
        sections[nextIndex].classList.add("active");
        currentIndex = nextIndex;
    }, 425);

    setTimeout(() => {
        stinger.className = "stinger";
        isTransitioning = false;
    }, 850);
}

function updateActiveButtons(index) {
    if (isRetinaMobile) {
        nextButtonMobile.classList.remove('disabled');
        prevButtonMobile.classList.remove('disabled');
        if (index <= 0) prevButtonMobile.classList.add('disabled');
        else if (index >= sections.length - 1) nextButtonMobile.classList.add('disabled');
    } else {
        nextButtonDesktop.classList.remove('disabled');
        prevButtonDesktop.classList.remove('disabled');
        if (index <= 0) prevButtonDesktop.classList.add('disabled');
        else if (index >= sectionCount - 1) nextButtonDesktop.classList.add('disabled');
    }
}

function updateActiveImage(index) {
    images.forEach(img => img.removeAttribute('id'));
    if (images[index]) images[index].id = 'selectedContent';
}

function scrollToSection(index) {
    if (index >= 0 && index <= sectionCount - 1)
    goToSection(index);
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

window.addEventListener(
    "wheel",
    (event) => {
        event.preventDefault();

        if (event.deltaY > 0) {
            scrollToSection(currentIndex + 1);
        } else {
            scrollToSection(currentIndex - 1);
        }
    },
    { passive: false }
);

function loadScrollJack() {
    currentIndex = 0;
    updateActiveButtons(currentIndex);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = [...sections].indexOf(entry.target);
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

sections.forEach(section => observer.observe(section));