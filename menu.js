const button = document.getElementsByClassName('menu-mobile-btn')[0];
var menuObject = document.querySelector("nav");
menuObject.style.top = '-100vh';
var container = document.querySelector("html");
button.addEventListener("click", function() {
    if (menuObject.style.top != '-150vh') {
        menuObject.style.top = '-150vh';
        container.classList.remove("scroll-hide");
    } else {
        menuObject.style.top = 0;
        container.classList.add("scroll-hide");
    }
});