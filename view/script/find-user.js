

$(document).ready(function () {
    $("#search-form").submit(function (e) {
        e.preventDefault();

        var searchValue = $("#search-input").val();

        // Thực hiện yêu cầu AJAX để tìm kiếm người dùng
        $.ajax({
            type: "GET",
      url: API+"/usercontroller/FindUser.php?name=" + searchValue, // Thay thế URL của API tìm kiếm ở đây
dataType: "json",
            success: function (response) {
                console.log(response);

                // Xóa nội dung hiển thị trước đó trên sidebar
                $("#search-results-sidebar").empty();

                // Kiểm tra xem dữ liệu có tồn tại không
                if (response.data && response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        var user = response.data[i];

                        // Lưu user_id vào localStorage
                        localStorage.setItem('id_friend_' + i, user.user_id);

                        // Truy cập thuộc tính trực tiếp
                        var userHtml = `
                            <div class="pit-friends">
                                <figure><a href="#" title=""><img src="images/${user.avatar_url}" alt="" style="height: 50px;"></a></figure>
                                <div class="pit-frnz-meta">
                                    <a href="../../view/profile.html?id=${user.user_id}" title="">${user.full_name}</a>
                                    <ul class="add-remove-frnd">
                                        <li class="add-tofrndlist">
                                            <a title="Add friend" href="#"><i class="fa fa-user-plus"></i></a>
                                        </li>
                                        <li class="remove-frnd">
                                            <a title="Send Message" href="#"><i class="fa fa-comment"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        `;

                        // Thêm phần tử vào phần sidebar
                        $("#search-results-sidebar").append(userHtml);
                    }
                } else {
                    // Xử lý trường hợp không có dữ liệu
                    console.log("Không tìm thấy kết quả.");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});
