function login() {
    var data = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    $.ajax({
        type: "POST",
        url: API + "/loginscontroller/Login.php?email=" + data.email + "&password=" + data.password,



        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                // Đăng nhập thành công, bạn có thể thực hiện hành động phù hợp ở đây
                console.log("Đăng nhập thành công.");
                localStorage.setItem('user_id', response.user_id);
                window.location.href = "../view/index.html"
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                console.log("Đăng nhập không thành công: " + response.message);
            }
        },
        error: function (error) {
            alert("ko")
            console.log(error);
        }
    });
}


$(document).ready(function () {
    $("#register-button").click(function () {
        var full_name = $("#full_name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var enterpassword = $("#enterpassword").val();
        var avatar_url = document.getElementById("avatar_url").files[0];
        var date_of_birth = $("#date_of_birth").val();

        if (password !== enterpassword) {
            // Mật khẩu và nhập lại mật khẩu không khớp
            $("#password").val("");  // Xóa trường mật khẩu
            $("#enterpassword").val("");  // Xóa trường nhập lại mật khẩu
            $("#response").html("Mật khẩu không khớp. Vui lòng thử lại.");
            return;  // Dừng xử lý tiếp theo
        }

        var formData = new FormData();
        formData.append("full_name", full_name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatar_url", avatar_url);
        formData.append("date_of_birth", date_of_birth);

        $.ajax({
            type: "POST",
            url: API + "/loginscontroller/register.php",
            data: formData,
            contentType: false, // Không sử dụng contentType và processData để cho phép dữ liệu gửi dưới dạng FormData
            processData: false,
            success: function (response) {
                if (response.status === "success") {
                    console.log("Đăng ký thành công.");
                    window.location.href = "../view/login.html";
                } else {
                    $("#response").html("Lỗi: " + response.message);
                }
            },
            error: function (error) {
                $("#response").html("Lỗi: " + JSON.stringify(error));
            }
        });
    });
});