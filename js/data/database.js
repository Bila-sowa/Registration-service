const db = {
    users: []
};
const save = () => {
    localStorage.setItem("dataBase", JSON.stringify(db.users))
}
const load = () => {
    const uploadData = localStorage.getItem("dataBase")
    if(uploadData) {
        db.users = JSON.parse(uploadData)
    }
};
export {
    db,
    save,
    load
}