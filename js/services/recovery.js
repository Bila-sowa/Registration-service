import { db, save, load } from "../data/database.js";
load();

const loginElement = document.querySelector("#login-input");
const passwordElement = document.querySelector("#password-input");
const submitBtnElement = document.querySelector("#submit-button");
const resultElement = document.querySelector("#result");
let verifiedUser = null;

const showError = (msg, el = null) => {
    resultElement.innerHTML = msg;
    resultElement.classList.add("error-message");
    el?.classList.add("is-error");
};
const showSuccess = () => {
    loginElement.value = "";
    passwordElement.value = "";

    resultElement.innerHTML = "Login has been recovery.";
    resultElement.classList.add("success-message");
};
document.addEventListener("input", () => {
    resultElement.innerHTML = "";
    resultElement.classList.remove("error-message", "success-message");
});

loginElement.addEventListener("input", () => {
    loginElement.value = loginElement.value.replace(/[^a-zA-Z0-9@+._-]/g, "");
});

passwordElement.addEventListener("input", () => {
    passwordElement.value = passwordElement.value.replace(/[^a-zA-Z0-9!@#$%^&*]/g, "");
});



const levenshteinFunction = (a, b) => {
    const dp = Array.from({ length: b.length + 1 },
    (_, i) => [i, ...Array(a.length).fill(0)]);
    dp[0] = [...Array(a.length + 1).keys()];

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            dp[j][i] = a[i-1] === b[j-1]
            ? dp[j-1][i-1]
            : 1 + Math.min(dp[j-1][i], dp[j][i-1], dp[j-1][i-1]);
        };
    };
    return dp[b.length][a.length];
};
const similarity = (a, b) => {
    if (!a || !b) return 0;
    const maxLen = Math.max(a.length, b.length);
    return Math.round((1 - levenshteinFunction(a, b) / maxLen) * 100);
};
const isMatch = (userWord, user, threshold = 65/*%*/) => {
    const a = userWord.toLowerCase().trim();
    const b = user.toLowerCase().trim();
    return similarity(a, b) >= threshold;
};

submitBtnElement.addEventListener("click", () => {

    if (verifiedUser) {
        const newPassword = passwordElement.value;

        if (newPassword.length < 8 || newPassword.length !== 0) return showError("Password is short.", passwordElement);

        verifiedUser.password = newPassword;
        verifiedUser.restored = true;
        save();

        verifiedUser = null;
        passwordElement.value = "";
        passwordElement.placeholder = "Password";
        passwordElement.classList.remove("highlight");

        return showSuccess();
    }

    if (loginElement.value.length <= 3) return showError("Email or phone number is short.", loginElement);

    const findUser = db.users.find((user) => user.email === loginElement.value || user.phoneNumber === loginElement.value);
    findUser.restored = false
    if (!findUser) return showError("The entered email or phone <br> number is incorrect.", loginElement);

    if (passwordElement.value.length < 8) return showError("Password is short.", passwordElement);

    const similar = isMatch(passwordElement.value, findUser.password)
    console.log(similar)
    if (!similar) return showError("The entered password is incorrect.", passwordElement);

    if (findUser.restored === true) return showError("Email has already been restored.", loginElement);

    verifiedUser = findUser;

    passwordElement.value = "";
    passwordElement.placeholder = "Enter new password";

    resultElement.innerHTML = "Successful recovery.";
});

