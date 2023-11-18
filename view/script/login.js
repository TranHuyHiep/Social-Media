$("#login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $.toast({
            heading: 'Invalid email format',
            text: "Please enter a valid email address",
            showHideTransition: 'fade',
            icon: 'error',
            hideAfter: 7000,
            loaderBg: '#fa6342',
            position: 'bottom-right',
        });
        
        return;
    }
    if (!password || password.trim() === "") {
        $.toast({
            heading: 'Must not be resisted Password',
            text: 'Must not be resisted Password',
            showHideTransition: 'fade',
            icon: 'error',
            hideAfter: 7000,
            loaderBg: '#fa6342',
            position: 'bottom-right',
        });
        
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
                if (response.role == 0) {
                    $.toast({
                        heading: 'Registration successfull',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    alert("Login successful!")
                    localStorage.setItem('user_id', response.user_id);
                    window.location.href = "../view/index.html"
                }
                else {
                    $.toast({
                        heading: 'The account does not exist',
                        text: "The email or password is incorrect",
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 7000,
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                    });
                }
            } else {
                // Đăng nhập không thành công, hiển thị thông báo lỗi
                console.log("Đăng nhập không thành công: " + response.message);
            }
        },
        error: function (error) {
            $.toast({
                heading: 'The account does not exist',
                text: "The email or password is incorrect",
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
            console.error(error);
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
        if (!full_name || full_name.trim() === "") {
            $.toast({
                heading: 'Invalid Name',
                text: 'Name is not blank',
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
            return;
        }
        if (!emailRegex.test(email)) {
            $.toast({
                heading: 'Invalid Email',
                text: 'Invalid email. Please try again.',
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
            return;
        }
        if (password.length < 6) {
            $("#password").val("");
            $("#enterpassword").val("");
            $.toast({
                heading: 'Invalid Password',
                text: 'Password must have at least 6 characters',
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
            return;
        }
        if (password !== enterpassword) {
            // Mật khẩu và nhập lại mật khẩu không khớp
            $("#password").val("");  // Xóa trường mật khẩu
            $("#enterpassword").val("");  // Xóa trường nhập lại mật khẩu
            $.toast({
                heading: 'Invalid Re-Password',
                text: 'Re-Password incorrect.',
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
            return;  // Dừng xử lý tiếp theo
        }
        if (avatar_url) {
            var allowedExtensions = ["jpg", "png"];
            var fileName = avatar_url.name;
            var fileExtension = fileName.split(".").pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                $.toast({
                    heading: 'Invalid File Image',
                    text: 'Only accept .jpg or .png for Avatar',
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });
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
                    $.toast({
                        heading: 'Registration successfull',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    alert("Registration successfull")
                    window.location.href = "../view/login.html";
                } else {
                    $.toast({
                        heading: 'Registration failed',
                        text: 'Account already exists',
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 7000,
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                    });
                }
            },
            error: function (error) {
                $.toast({
                    heading: 'Registration failed',
                    text: 'Account already exists',
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });
            }
        });
    });
});
// Hàm để đăng xuất người dùng
function logout() {
    // Xóa dữ liệu người dùng trong Local Storage
    localStorage.removeItem('user_id'); // Đây là một ví dụ, bạn có thể lưu nhiều thông tin khác trong Local Storage

}

