const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const errorText = document.getElementById("errorText");

const loginButton = document.getElementById("loginButton");
const signUpButton = document.getElementById("signUpButton");

const SESSION_USER_KEY = "session.user.key";


// Brings user back to landing page due to not being signed in yet
document.getElementById("titleLogoContainer").addEventListener("click", () => {
    location.replace("/");
})

loginButton.addEventListener("click", () => {

    if(emailInput.value == "" || passwordInput.value == ""){
        errorText.innerText = "Not all inputs are filled.";
        errorText.style.opacity = "1";
        return;
    }

    errorText.style.opacity = "0";

    // This code will only run if there was no error in the data the user entered. 
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
    })
    .then(res => {
        let json = res.json();
        return json;

    })
    .then(data => {
        console.log(data);
        const id = data._id || null;
        if(id != null){
            sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(data));
            location.replace("/users/" + id + "/landing");
        } else {
            console.log(data)
            errorText.innerText = data.message;
            errorText.style.opacity = "1";
        }
    })

})

signUpButton.addEventListener("click", () => location.replace("/sign-up"));
