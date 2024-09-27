import {loadTheme} from "./themes.js"

export const rootCSS = document.querySelector(":root");

window.onload = () => {
    loadTheme();
}

let loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", () => location.replace("/users/0001/landing"))

let downloadButton = document.getElementById("downloadBtn");
downloadButton.addEventListener("click", () => location.replace("/users/0001/landing"))