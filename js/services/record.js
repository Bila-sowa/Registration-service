import {users, save, load} from "../data/database.js"
const emailElement = document.querySelector("#email-input");
const phoneNumberElement = document.querySelector("#phone-number-input");
const passwordElement = document.querySelector("#password-input");
const dateElement = document.querySelector("#date-input");
const resultElement = document.querySelector("#result")
const genderElement = document.querySelector(`input[name="gender-input"]:checked`);
const registerElement = document.querySelector("#register-button");

const success = () => {
    emailElement.value = ""
    phoneNumberElement.value = ""
    passwordElement.value = ""
    dateElement.value = ""
    genderElement.value = ""

    resultElement.innerHTML = "Account successfully created";
    resultElement.classList.add("success-message");
}
document.addEventListener("input", () => {
    resultElement.innerHTML = "";
    resultElement.classList.remove("error-message");
    resultElement.classList.remove("success-message");
    [ 
        emailElement,
        phoneNumberElement,
        passwordElement, 
        dateElement, 
        genderElement
    ].forEach(el => el.classList.remove("is-error"));
});

registerElement.addEventListener("click", () => {
    const showError = (msg, el = null) => {
        resultElement.innerHTML = msg;
        resultElement.classList.add("error-message")
        el?.classList.add("is-error");
    };

    if (!emailElement.value) return showError("Please enter your email.", emailElement);
    if (emailElement.value.length >= 32) return showError("Email is long.", emailElement);
    if (emailElement.value.length <= 3) return showError("Email is short.", emailElement);
    if (phoneNumberElement.value.length <= 7 || phoneNumberElement.value.length >= 15) return showError("Enter your phone number in the <br> following format: +1XXXXXXXXXX", phoneNumberElement);
    if (!passwordElement.value) return showError("Please enter your password.", passwordElement);
    if (!passwordElement.value.length >= 64) return showError("Password is long.", passwordElement);
    if (!passwordElement.value.length >= 8) return showError("Password is short.", passwordElement);
    if (!dateElement.value) return showError("Please enter your date of birth.", dateElement);
    if (!genderElement.value) return showError("Please enter your gender", genderElement);

    setTimeout(() => {
        success()
    }, 900)
    // users.push(new class {
    // constructor() {
    //     this.email = emailInputElement.value;
    //     this.number = "0961452409";
    //     this.password = "SomeSecretPassword.com";
    //     this.dateOfBirth = "09.07.2003";
    //     this.gender = "Male";
    // }
    // }());

    // console.log(users)
});

