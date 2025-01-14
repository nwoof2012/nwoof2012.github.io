var button = document.getElementsByClassName('menu-mobile-btn')[0];
var menuObject = document.querySelector("nav");
var menuParent = document.getElementsByClassName('nav-parent')[0];
var themeButton = document.getElementsByClassName('theme-button')[0];
var container = document.querySelector("html");

var menuToggle = false;

button.addEventListener("click", function() {
    if (menuToggle) {
        menuParent.classList.remove("open");
        container.classList.remove("scroll-hide");
        button.classList.remove("invert");
        menuToggle = false;
    } else {
        menuParent.classList.add("open");
        container.classList.add("scroll-hide");
        button.classList.add("invert");
        menuToggle = true;
    }
});


var colorScheme = localStorage.getItem("currentTheme");

const body = document.querySelector("body");

if (!localStorage.getItem("currentTheme")) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        colorScheme = 1;
    } else {
        colorScheme = 0;
    }
}

setCurrentTheme();

themeButton.addEventListener("click", event => {
    if(colorScheme == 1) {
        colorScheme = 0;
    } else {
        colorScheme = 1;
    }
    localStorage.setItem("currentTheme",colorScheme);
    setCurrentTheme();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";

    if(newColorScheme == "dark") colorScheme = 1;

    if (newColorScheme == "light") colorScheme = 0;
    
    localStorage.setItem("currentTheme", colorScheme);

    setCurrentTheme();
});

function setCurrentTheme() {
    if (colorScheme == 1) {
        body.classList.remove("light");
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
    }
}