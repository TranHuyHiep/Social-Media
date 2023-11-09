$("#forgot").click(function () {
    //e.preventDefault();
    var email = $("#email").val();

    $.ajax({
        type: "GET",
        url: API + "/loginscontroller/ForgotPass.php?email=" + email,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                alert("mật khẩu của bạn là: "+response.password);
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                console.log("Đăng nhập không thành công: " + response.message);
            }
        },
        error: function (error) {
            alert("Đăng nhập không thành công!");
            console.log(error);
        }
    });
});
