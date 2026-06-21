import {users, save, load} from "../data/database.js"
load()
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
    const genderActualValue = genderElement.value
    const showError = (msg, el = null) => {
        resultElement.innerHTML = msg;
        resultElement.classList.add("error-message")
        el?.classList.add("is-error");
    };

    if (!emailElement.value) return showError("Please enter your email.", emailElement);
    if (!emailElement.value.includes("@")) return showError("Email is invalid", emailElement)
    if (emailElement.value.length >= 32) return showError("Email is long.", emailElement);
    if (emailElement.value.length <= 3) return showError("Email is short.", emailElement);
    if (phoneNumberElement.value.length <= 7 || phoneNumberElement.value.length >= 15) return showError("Enter your phone number in the <br> following format: +1XXXXXXXXXX", phoneNumberElement);
    if (!passwordElement.value) return showError("Please enter your password.", passwordElement);
    if (passwordElement.value.length >= 64) return showError("Password is long.", passwordElement);
    if (passwordElement.value.length >= 8) return showError("Password is short.", passwordElement);
    if (!dateElement.value) return showError("Please enter your date of birth.", dateElement);
    if (!genderActualValue) return showError("Please enter your gender", genderElement);

    setTimeout(() => {
        success()
    }, 900)

    users.push(new class {
        constructor() {
            this.email = emailElement.value.trim();
            this.number = phoneNumberElement.value;
            this.password = passwordElement.value;
            this.dateOfBirth = dateElement.value;
            this.gender = genderActualValue
        }
    }());

    setTimeout(() => {
        save()
    }, 3000)
    
    console.log(users)
});

