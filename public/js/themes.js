import {rootCSS} from "./index.js";

const changeThemeBtn = document.getElementById("themeBtn");
const changeIcon = document.getElementById("changeIcon");

/*
* Gets the current theme from local storage and applies it to the root
*/
function loadTheme(){
    let theme = localStorage.getItem("theme");
    if(theme == null) {
        localStorage.setItem("theme", "sunny");
    }
    rootCSS.setAttribute("data-theme", theme);
    changeIcon.setAttribute("data-theme", theme);
    changeIcon.src = "../resources/ionicons/" + theme + ".svg";
}

/*
* Changes the theme icon and set the new theme in local storage.
*/
changeThemeBtn.addEventListener("click", () => {
    let dataTheme = changeIcon.getAttribute("data-theme");
    console.log(getComputedStyle(rootCSS).getPropertyValue("--wave-color-1"))

    document.getElementById("wave1").style.fill="red";

    if (dataTheme == "sunny") {
        changeIcon.src = "../resources/ionicons/moon.svg";
        
        changeIcon.setAttribute("data-theme", "moon");
        changeIcon.setAttribute("alt", "🌙");
        rootCSS.setAttribute("data-theme", "moon");
    } else {
        changeIcon.src = "../resources/ionicons/sunny.svg";
        changeIcon.setAttribute("alt", "☀️");
        rootCSS.setAttribute("data-theme", "sunny");
        changeIcon.setAttribute("data-theme", "sunny");

    }

    localStorage.setItem("theme", changeIcon.getAttribute("data-theme"));
});

export {loadTheme};