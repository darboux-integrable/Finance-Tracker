import {loadTheme} from "./themes.js"

export const rootCSS = document.querySelector(":root");

window.onload = () => {
    loadTheme();
}

let t = document.getElementById("loginButton");
t.addEventListener("click", () => {
    alert("working");
})



