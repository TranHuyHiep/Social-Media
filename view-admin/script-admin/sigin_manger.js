$("#signin").click(function () {
    var data = {
        email: $("#email").val(),
        password: $("#password").val()
    };

    $.ajax({
        type: "GET",
        url: API + "/loginscontroller/Login.php?email=" + data.email + "&password=" + data.password,



        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                if (response.role == 1) {
                    $.toast({
                        heading: 'Login successfull',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    alert("Login successfull")
                    localStorage.setItem('user_id', response.user_id);
                    window.location.href = "../pages/user-manager.html"
                }
                else {
                    $.toast({
                        heading: 'Login fail',
                        text: "Login fail",
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 7000,
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                    });
                }
            } else {
                $.toast({
                    heading: 'Login fail',
                    text: "Login fail",
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
                heading: 'Login fail',
                text: "Login fail",
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
        }
    });
});