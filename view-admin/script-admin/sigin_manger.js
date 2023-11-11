$("#signin").click(function () {
    var data = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    $.ajax({
        type: "GET",
        url: "http://localhost:81/Social-Media/admin-controller/signin_controller/Signin.php?email=" + data.email + "&password=" + data.password,



        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                // Đăng nhập thành công, bạn có thể thực hiện hành động phù hợp ở đây
                console.log("Đăng nhập thành công.");
                localStorage.setItem('user_id', response.user_id);
                window.location.href = "../pages/user-manager.html"
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                console.log("Đăng nhập không thành công: " + response.message);
            }
        },
        error: function (error) {
            alert("Đăng nhập không thành công!")
            console.log(error);
        }
    });
});
