import { db, save, load } from "../data/database.js";
load();

const emailElement = document.querySelector("#email-input");
const phoneNumberElement = document.querySelector("#phone-number-input");
const passwordElement = document.querySelector("#password-input");
const dateElement = document.querySelector("#date-input");
const resultElement = document.querySelector("#result");
const registerBtnElement = document.querySelector("#register-button");

const showError = (msg, el = null) => {
    resultElement.innerHTML = msg;
    resultElement.classList.add("error-message");
    el?.classList.add("is-error");
};
const showSuccess = () => {
    emailElement.value = "";
    phoneNumberElement.value = "";
    passwordElement.value = "";
    dateElement.value = "";
    document.querySelectorAll(`input[name="gender-input"]`)
        .forEach(el => el.checked = false);

    resultElement.innerHTML = "Account successfully created";
    resultElement.classList.add("success-message");
};
document.addEventListener("input", () => {
    resultElement.innerHTML = "";
    resultElement.classList.remove("error-message", "success-message");
    [emailElement, phoneNumberElement, passwordElement, dateElement]
        .forEach(el => el.classList.remove("is-error"));
});
// regular expressions
emailElement.addEventListener("input", () => {
    emailElement.value = emailElement.value.replace(/[^a-zA-Z0-9@._-]/g, "");
});

passwordElement.addEventListener("input", () => {
    passwordElement.value = passwordElement.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "");
});

phoneNumberElement.addEventListener("input", () => {
    phoneNumberElement.value = phoneNumberElement.value.replace(/[^0-9+]/g, "");
});

dateElement.addEventListener("input", () => {
    dateElement.value = dateElement.value.replace(/[^0-9./]/g, "");
});

registerBtnElement.addEventListener("click", () => {
    const genderElement = document.querySelector(`input[name="gender-input"]:checked`);
    const dateOfRegister = new Date()
    if (!emailElement.value) return showError("Please enter your email.", emailElement);
    if (!emailElement.value.includes("@")) return showError("Email is invalid.", emailElement);
    if (emailElement.value.length <= 3) return showError("Email is short.", emailElement);
    if (phoneNumberElement.value.length < 3) return showError("Enter your phone number in the <br> following format: +1XXXXXXXXXX", phoneNumberElement);
    if (!passwordElement.value) return showError("Please enter your password.", passwordElement);
    if (passwordElement.value.length < 8) return showError("Password is short.", passwordElement);
    if (!dateElement.value) return showError("Please enter your date of birth.", dateElement);
    if (!genderElement) return showError("Please select your gender.");

    db.users.push({
        email: emailElement.value,
        phoneNumber: phoneNumberElement.value,
        password: passwordElement.value,
        dateOfBirth: dateElement.value,
        dateOfRegister: dateOfRegister.toLocaleDateString(),
        gender: genderElement.value,
        isLogin: false,
        restored: false,
    });

    save();
    showSuccess();

});


