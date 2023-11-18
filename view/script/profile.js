$(document).ready(function () {
    // Lấy user_id từ query parameter trong URL
    var user_id = getParameterByName("id");

    // Gọi API để lấy thông tin người dùng bằng user_id
    $.ajax({
        type: "GET",
        url: API + "/usercontroller/GetUserByID.php?id=" + user_id, // Thay thế bằng URL API thực tế
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                // Cập nhật thông tin người dùng trên trang web
                var userInfo = response;
                $("#full_name3").text(userInfo.full_name);
                //$("#full_name1").text(userInfo.full_name);
                $("#avatar3").attr("src", "images/" + userInfo.avatar_url);
                //$("#avatar1").attr("src", "images/" + userInfo.avatar_url);
            } else {
                $.toast({
                    heading: 'User not found',
                    text: 'User not found',
                    showHideTransition: 'slide',
                    icon: 'success',
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                    hideAfter: 3000,
                });
            }
        },
        error: function (error) {
            console.log("Lỗi: " + JSON.stringify(error));
        }
    });
});
$(document).ready(function () {
    var user_id = getParameterByName("id");
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
            }
        },
        error: function () {
            console.log("Lỗi trong quá trình gửi yêu cầu Ajax.");
        }
    });
});
// Hàm để lấy query parameter từ URL
function getParameterByName(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(window.location.search);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// $(document).ready(function () {
//     let user_id = localStorage.getItem("user_id")
//     // Sử dụng Ajax để gửi yêu cầu để lấy thông tin người dùng từ API
//     $.ajax({
//         url: API + '/usercontroller/GetUserInfoByUserId.php?id='+user_id,
//         method: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             // Kiểm tra xem yêu cầu Ajax đã thành công hay không
//             if (data.status === "error") {
//                 console.log("Không thể lấy thông tin người dùng.");
//             } else {
//                 // Điền dữ liệu từ API vào các trường form
//                 $("#study_at").val(data.study_at);
//                 $("#working_at").val(data.working_at);
//                 $("#favorites").val(data.favorites);
//                 $("#other_info").val(data.other_info);
//                 $("#date_of_birth").val(data.date_of_birth);
//             }
//         },
//         error: function () {
//             console.log("Lỗi trong quá trình gửi yêu cầu Ajax.");
//         }
//     });
// });

