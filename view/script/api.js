const API = "http://localhost/social-Media/controller";

var path = window.location.pathname;
var page = path.split("/").pop();
var userId = localStorage.getItem("user_id");

if (!userId) {
    if(page == "login.html" || page == "register.html" || page == "forgotpassword" 
        || page == "sign-in.html" || page == "sign-up.html") {
    } else {
        window.location.href = "login.html"
    }
}