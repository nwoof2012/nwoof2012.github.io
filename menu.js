/*function toggleMenu() {
    var menuObject = document.getElementById("nav");
    if(menuObject.style.display = "none") {
        menuObject.style.display = "block";
    } else {
        menuObject.style.display = "none";
    }
}*/

const button = document.getElementsByClassName('menu-mobile-btn')[0];
var menuObject = document.querySelector("nav");
menuObject.style.top = '-100vh';
var container = document.querySelector("html");
button.addEventListener("click", function() {
    //do your stuff 
    if (menuObject.style.top != '-100vh') {
        menuObject.style.top = '-100vh';
        container.classList.remove("scroll-hide");
    } else {
        menuObject.style.top = 0;
        container.classList.add("scroll-hide");
    }
    console.log("wof");
});