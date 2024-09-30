// fetch("/test")
// .then(res => res.json())
// .then(data => console.log(data));


const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const confirmPasswordInput = document.getElementById("confirmPasswordInput");

const inputs = [
    firstNameInput, 
    lastNameInput, 
    emailInput,
    passwordInput,
    confirmPasswordInput
]

const signUpButton = document.getElementById("signUpButton");
const loginButton = document.getElementById("loginButton");

const errorText = document.getElementById("errorText");

signUpButton.addEventListener("click", () => {

    let areInputsFilled = true;

    inputs.forEach(input => {
        if(input.value == "")
            areInputsFilled = false;
    })

    // Check for possible errors. There there is one, return. 
    if(!areInputsFilled){
        errorText.innerText = "Not all inputs are filled.";
        errorText.style.opacity = "1";
        return;
    }

    if(passwordInput.value != confirmPasswordInput.value){
        errorText.innerText = "The password you entered does not match.";
        errorText.style.opacity = "1";
        return;
    }

    errorText.style.opacity = "0";
    // If this code executes, that means that there was no error in the data that the user entered
    
    
    
    fetch("/sign-up/adamtomas@gmail.com")
    .then(res => res.json())
    .then(data => console.log(data));

    fetch("/sign-up/adamtomasevans1212@gmail.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            password: passwordInput.value,
            email: emailInput.value,
            incomes: [],
            expenses: [],
            balances: [],
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));


    // fetch(`/sign-up/${emailInput.value}`, {
    //     method: "POST",
    //     body: JSON.stringify({
    //         firstName: firstNameInput.value,
    //         lastName: lastNameInput.value,
    //         password: passwordInput.value,
    //         email: emailInput.value,
    //         incomes: [],
    //         expenses: [],
    //         balances: [],
    //     })
    // })
    // .then(res => res.json())


})

// Redirect to login page if they want to login and not sign up
loginButton.addEventListener("click", () => location.replace("/login"));