$(document).ready(function () {
    console.log(localStorage.getItem('user_id'));
    // Gọi API để lấy thông tin người dùng
    $.ajax({
        type: "GET",
        url: API + "usercontroller/GetUserByID.php", // Thay thế bằng URL API thực tế
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                // Cập nhật thông tin người dùng trên trang web
                var userInfo = response;
                $("#full_name").text(userInfo.full_name);
                $("#avatar").attr("src", "images/"+userInfo.avatar_url);
            } else {
                alert("Không tìm thấy thông tin người dùng");
            }
        },
        error: function (error) {
            console.log("Lỗi: " + JSON.stringify(error));
            alert("Đã xảy ra lỗi khi gọi API");
        }
    });
});

$(document).ready(function() {
    // Sử dụng Ajax để gửi yêu cầu để lấy thông tin người dùng từ API
    $.ajax({
        url: API + 'usercontroller/GetUserInfoByUserId.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
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
            }
        },
        error: function() {
            console.log("Lỗi trong quá trình gửi yêu cầu Ajax.");
        }
    });
});




$(document).ready(function() {
    // Gán sự kiện click vào nút "Save"
    $("#saveButton").click(function() {
        // Lấy dữ liệu từ các trường input
        var study_at = $("#study_at").val();
        var working_at = $("#working_at").val();
        var favorites = $("#favorites").val();
        var other_info = $("#other_info").val();
        var date_of_birth = $("#date_of_birth").val();

        // Gửi yêu cầu AJAX để cập nhật thông tin người dùng
        $.ajax({
            url: 'http://localhost:81/Social-Media/controller/usercontroller/UpdateUserInfo.php', // Thay thế URL_API_CUA_BAN bằng URL của API cập nhật thông tin
            method: 'POST',
            data: {
                study_at: study_at,
                working_at: working_at,
                favorites: favorites,
                other_info: other_info,
                date_of_birth: date_of_birth
            },
            dataType: 'json',
            success: function(data) {
                if (data.status === "success") {
                    alert("Thông tin đã được cập nhật thành công.");
                } else {
                    alert("Có lỗi xảy ra khi cập nhật thông tin.");
                }
            },
            error: function() {
                alert("Lỗi trong quá trình gửi yêu cầu AJAX.");
            }
        });
    });
});