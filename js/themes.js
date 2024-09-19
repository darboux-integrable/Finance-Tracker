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
    changeIcon.setAttribute("name", theme);
}

/*
* Changes the theme icon and set the new theme in local storage.
*/
changeThemeBtn.addEventListener("click", () => {
    let dataTheme = changeIcon.getAttribute("name");

    if (dataTheme === "sunny") {
        changeIcon.setAttribute("name", "moon");
        rootCSS.setAttribute("data-theme", "moon");
    } else {
        changeIcon.setAttribute("name", "sunny");
        rootCSS.setAttribute("data-theme", "sunny");
    }

    localStorage.setItem("theme", changeIcon.getAttribute("name"));
});

export {loadTheme};