import {loadTheme} from "./themes.js"

export const rootCSS = document.querySelector(":root");

window.onload = () => {
    loadTheme();
}



