$("#login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        return;
    }
    if(!password || password.trim() === ""){
        alert("Must not be resisted Password");
        return;
    }
    var data = {
        email: email,
        password: password
    };

    $.ajax({
        type: "GET",
        url: API + "/loginscontroller/Login.php?email=" + data.email + "&password=" + data.password,



        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                if(response.role==0){
                    // Đăng nhập thành công, bạn có thể thực hiện hành động phù hợp ở đây
                
                alert("Login successful!")
                localStorage.setItem('user_id', response.user_id);
                window.location.href = "../view/index.html"
                }
                else{
                    alert("The account does not exist \n the email password is incorrec")
                    
                } 
                
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                console.log("Đăng nhập không thành công: " + response.message);
            }
        },
        error: function (error) {
            alert("The account does not exist \n the email password is incorrec")
            console.log(error);
        }
    });
});


$(document).ready(function () {
    $("#register-button").click(function () {
        var full_name = $("#full_name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var enterpassword = $("#enterpassword").val();
        var avatar_url = document.getElementById("avatar_url").files[0];
        var date_of_birth = $("#date_of_birth").val();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!full_name || full_name.trim() === ""){
            alert("Must not be resisted Name");
            return;
        }
        if (!emailRegex.test(email)) {
            alert("Invalid email. Please try again.");
            //$("#response").html("Email không hợp lệ. Vui lòng thử lại.");
            return;
        }
        if (password.length < 6) {
            $("#password").val("");
            $("#enterpassword").val("");
            alert("Password must have at least 6 characters. Please try again.");
            return;
        }
        if (password !== enterpassword) {
            // Mật khẩu và nhập lại mật khẩu không khớp
            $("#password").val("");  // Xóa trường mật khẩu
            $("#enterpassword").val("");  // Xóa trường nhập lại mật khẩu
            // $("#response").html("Mật khẩu không khớp. Vui lòng thử lại.");
            alert("Password incorrect. Please try again");
            return;  // Dừng xử lý tiếp theo
        }
        if (avatar_url) {
            var allowedExtensions = ["jpg", "png"];
            var fileName = avatar_url.name;
            var fileExtension = fileName.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                $("#response").html("Chỉ chấp nhận file với đuôi .jpg và .png cho avatar. Vui lòng thử lại.");
                avatarInput.value = "";  // Clear the file input
                return;
            }
        }

        var formData = new FormData();
        formData.append("full_name", full_name);
        formData.append("email", email);
        formData.append("password", password);
        // formData.append("avatar_url", avatar_url);
        // formData.append("date_of_birth", date_of_birth);
        if (avatar_url) {
            formData.append("avatar_url", avatar_url);
        }

        if (date_of_birth) {
            formData.append("date_of_birth", date_of_birth);
        }

        $.ajax({
            type: "POST",
            url: API + "/loginscontroller/register.php",
            data: formData,
            contentType: false, // Không sử dụng contentType và processData để cho phép dữ liệu gửi dưới dạng FormData
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    
                    // alert("Registration successfull!")
                    window.location.href = "../view/login.html";
                } else {
                    alert("Registration failed!\n Account already exists")
                  
                }
            },
            error: function (error) {
                alert("Registration failed!\n Account already exists")
                
            }
        });
    });
});
// Hàm để đăng xuất người dùng
function logout() {
    // Xóa dữ liệu người dùng trong Local Storage
     localStorage.removeItem('user_id'); // Đây là một ví dụ, bạn có thể lưu nhiều thông tin khác trong Local Storage
  
}
  
  