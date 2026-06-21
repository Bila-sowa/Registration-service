let users = [];
const save = () => {
    localStorage.setItem("dataBase", JSON.stringify(users))
}
const load = () => {
    const uploadData = localStorage.getItem("dataBase")
    if(uploadData) {
        users = JSON.parse(uploadData)
    }
};
export {
    users,
    save,
    load
}