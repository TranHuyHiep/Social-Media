function loadDataNotification() {
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
                $('#number-noti-outer').html(numnotification);
                $('#number-noti').html(numnotification + " New Notifications");

                var $str = notifications.map(function (notification) {
                    return `
                    <li>
                        <div>
                            <figure>
                                <img src="images/${notification.avatar}" style="width: 40px; height: 40px;" alt="">
                            </figure>
                            <div class="mesg-meta">
                                <h6><a href="../../view/postbyid.html?id=${notification.link}" title="">${notification.content}</a></h6>
                                <span><b>Your Friend</b></span>
                                <i>${notification.create_at}</i>
                            </div>
                            <div class="add-del-friends">
                                <a href="#" title=""><i class="fa fa-heart"></i></a>
                                <a href="#" title=""><i class="fa fa-trash"></i></a>
                            </div>
                        </div>
                    </li>
                    `;
                });

                $('#list-notification').html($str);
            } else {
                // debugger
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
loadDataNotification();
