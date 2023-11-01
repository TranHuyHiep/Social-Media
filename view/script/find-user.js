
$(document).ready(function () {
    $("#search-form").submit(function (e) {
        e.preventDefault();

        var searchValue = $("#search-input").val();

        // Thực hiện yêu cầu AJAX để tìm kiếm người dùng
        $.ajax({
            type: "GET",
            url: API+"usercontroller/FindUser.php?name=" + searchValue, // Thay thế URL của API tìm kiếm ở đây
            dataType: "json",
            success: function (response) {
                console.log(response);
                // Xóa nội dung hiển thị trước đó trên sidebar
                $("#search-results-sidebar").empty();

                // Lặp qua kết quả tìm kiếm và thêm chúng vào phần sidebar
                for (var i = 0; i < response.length; i++) {
                    var user = response[i];

                    // Tạo phần tử HTML để hiển thị thông tin người dùng
                    var userHtml = `
                        <div class="search-result-sidebar">
                            <h5 class="full_name">${user.full_name}</h5>
                            <img src="${user.avatar_url}" alt="" class="user-avatar">
                            <span class="status f-online"></span>
                        </div>
                    `;

                    // Thêm phần tử vào phần sidebar
                    $("#search-results-sidebar").append(userHtml);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
