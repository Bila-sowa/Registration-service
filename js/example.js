function checkForm(el){
    var username = el.username.value;
    var email = el.email.value;
    var userpassword = el.password.value;
    var gender = el.gender.value;

    var error = "";
    if(username.length < 2)
        error = "Имя слишком маленькое";
    else if(email.length < 2 )
        error = "Емаил слишком маленький";
    else if(userpassword.length < 2)
        error = "Пароль слишком маленький"
    else if(gender === null)
        error = "Гендер не указан"
    else if(username.length > 18)
        error = "Имя слишком большое";
    


    if(error != "")
        document.getElementById("Error").innerText = error;
    else{
        window.location = "https://fakecrime.bio/cyde"
    }
    

    return false;
}


