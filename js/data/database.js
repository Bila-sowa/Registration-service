let users = [
    {
        email: "SomeEmail@gmail.com",
        phoneNumber: "0961452409",
        password: "SomeSecretPassword.com",
        dateOfBirth: "09.07.2003",
        gender: "Male",
    },
];
const save = () => {
    localStorage.setItem("dataBase", JSON.stringify(users))
}
const load = () => {
    const uploadData = localStorage.getItem("dataBase")
    console.log(uploadData)
    if(uploadData) {
        users = JSON.parse(uploadData)
    }
};
export {
    users,
    save,
    load
}