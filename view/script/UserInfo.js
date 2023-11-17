


$(document).ready(function () {
    console.log(localStorage.getItem('user_id'));
    let user_id = localStorage.getItem("user_id")
    // Gọi API để lấy thông tin người dùng
    $.ajax({
        type: "GET",
        url: API + "/usercontroller/GetUserByID.php?id="+ user_id, // Thay thế bằng URL API thực tế
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                // Cập nhật thông tin người dùng trên trang web
                var userInfo = response;
                $("#full_name").text(userInfo.full_name);
                $("#full_name1").text(userInfo.full_name);
                $("#avatar").attr("src", "images/" + userInfo.avatar_url);
                $("#avatar1").attr("src", "images/" + userInfo.avatar_url);
                $("#email").text(userInfo.email);
            } else {
                $.toast({
                    heading: 'User not found',
                    text: "User not found",
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });
                
            }
        },
        error: function (error) {
            console.log("Lỗi: " + JSON.stringify(error));
        }
    });
});

$(document).ready(function () {
    let user_id = localStorage.getItem("user_id")
    // Sử dụng Ajax để gửi yêu cầu để lấy thông tin người dùng từ API
    $.ajax({
        url: API + '/usercontroller/GetUserInfoByUserId.php?id='+user_id,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Kiểm tra xem yêu cầu Ajax đã thành công hay không
            if (data.status === "error") {
                console.log("Không thể lấy thông tin người dùng.");
            } else {
                // Điền dữ liệu từ API vào các trường form
                $("#study_at").val(data.study_at);
                $("#working_at").val(data.working_at);
                $("#favorites").val(data.favorites);
                $("#other_info").val(data.other_info);
                $("#date_of_birth").val(data.date_of_birth);
                $("#study_at").text(data.study_at); // Change from val to text
                $("#working_at").text(data.working_at); // Change from val to text
                $("#favorites").text(data.favorites); // Change from val to text
                $("#other_info").text(data.other_info); // Change from val to text
                $("#date_of_birth").text(data.date_of_birth);
            }
        },
        error: function () {
            console.log("Lỗi trong quá trình gửi yêu cầu Ajax.");
        }
    });
});





    

    $("#saveButton").click(function () {
        event.preventDefault();
        let user_id = localStorage.getItem("user_id")
        
        // Lấy dữ liệu từ các trường input
        var study_at = $("#study_at").val();
        var working_at = $("#working_at").val();
        var favorites = $("#favorites").val();
        var other_info = $("#other_info").val();
        var date_of_birth = $("#date_of_birth").val();

        // Gửi yêu cầu AJAX để cập nhật thông tin người dùng
        $.ajax({
            url: API + '/usercontroller/UpdateUserInfo.php?id='+user_id, // Thay thế URL_API_CUA_BAN bằng URL của API cập nhật thông tin
            method: 'POST',
            data: {
                study_at: study_at,
                working_at: working_at,
                favorites: favorites,
                other_info: other_info,
                date_of_birth: date_of_birth
            },
            dataType: 'json',
            success: function (data) {
                if (data.status === "success") {
                    $.toast({
                        heading: 'The information has been updated successfully',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                } else {
                    alert("An error occurred while updating information.");
                    $.toast({
                        heading: 'User not found',
                        text: "User not found",
                        showHideTransition: 'fade',
                        icon: 'error',
                        hideAfter: 7000,
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                    });
                    
                }
            },
            error: function () {
                alert("An error occurred while updating information.");
                $.toast({
                    heading: 'User not found',
                    text: "User not found",
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });
            }
        });
    });
