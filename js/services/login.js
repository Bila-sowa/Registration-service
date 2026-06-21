import { db, save, load } from "../data/database.js";
load();
console.log(db.users);

const loginElement = document.querySelector("#login-input");
const passwordElement = document.querySelector("#password-input");
const resultElement = document.querySelector("#result");
const loginBtnElement = document.querySelector("#login-button")

const showError = (msg, el = null) => {
    resultElement.innerHTML = msg;
    resultElement.classList.add("error-message");
    el?.classList.add("is-error");
};
const showSuccess = () => {
    loginElement.value = "";
    passwordElement.value = "";

    resultElement.innerHTML = "Login successful.";
    resultElement.classList.add("success-message");
};
document.addEventListener("input", () => {
    resultElement.innerHTML = "";
    resultElement.classList.remove("error-message", "success-message");
    [loginElement, passwordElement]
        .forEach(el => el.classList.remove("is-error"));
});

// regular expressions
loginElement.addEventListener("input", () => {
    loginElement.value = loginElement.value.replace(/[^a-zA-Z0-9@+._-]/g, "");
});

passwordElement.addEventListener("input", () => {
    passwordElement.value = passwordElement.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "");
});

loginBtnElement.addEventListener("click", () => {
    const findUserByEmail = db.users.find((user) => user.email === loginElement.value);
    const findUserByPhoneNumber = db.users.find((user) => user.phoneNumber === loginElement.value);
    
    if (loginElement.value.length <= 3) return showError("Email or phone number is short.", loginElement);
    if (!findUserByEmail && !findUserByPhoneNumber) return showError("The entered email or phone <br> number is incorrect.");
    const password = findUserByEmail.password;
    if (passwordElement.value.length < 8) return showError("Password is short.", passwordElement);
    if (passwordElement.value !== password) return showError("The entered password is incorrect.");
    
    showSuccess()
});

