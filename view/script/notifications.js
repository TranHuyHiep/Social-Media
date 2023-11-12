function loadData() {
    let user_id = localStorage.getItem("user_id")
    $.ajax({
        type: 'GET',
        url: API+'/notificationscontroller/GetNotificationsById.php?id='+ user_id , // Thay API_URL_HERE bằng URL thực tế của API của bạn
        headers: {
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN_HERE' // Thêm mã thông báo xác thực nếu cần
        },
        success: function (response) {
            var numnotification = 0;
            if (response.status === 'success') {
                var notifications = response.data;
                numnotification = notifications.length;

                var $str = notifications.map(function (notification) {
                    return `<li>
                        <figure><img src="images/${notification.avatar}" alt=""></figure>
                        <div class="notifi-meta">
                            <p>${notification.content}</p>
                            <span><i class="fa fa-thumbs-up"></i> ${notification.create_at}</span>
                        </div>
                        <div class="more">
                            <div class="more-post-optns"><i class="ti-more-alt"></i>
                                <ul>
                                    <li><i class="fa fa-bell-slash-o"></i>Mute</li>
                                    <li><i class="fa fa-wpexplorer"></i>Report</li>
                                    <li><i class="fa fa-bell-slash-o"></i>Block</li>
                                </ul>
                            </div>
                        </div>
                        <i class="del ti-close" title="Remove"></i>
                    </li>`;
                });

                $('#list-notification').html($str);
            } else {
                $('#list-notification').html('<p>No notifications found</p>');
            }

            $('#num-notification').html(numnotification);
        },
        error: function () {
            console.log('An error occurred.');
        }
    });
}

// Gọi hàm loadData khi trang được tải
loadData();
