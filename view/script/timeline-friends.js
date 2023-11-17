let user_id = localStorage.getItem("user_id")
window.onload = loadData;
loadInforUser();

function loadInforUser() {
    let user_id = localStorage.getItem("user_id")
    $.ajax({
        type: "GET",
        url: API + "/usercontroller/GetUserByID.php?id=" + user_id, // Thay thế bằng URL API thực tế
        dataType: "json",
        success: function (response) {
            if (response.status === "success") {
                // Cập nhật thông tin người dùng trên trang web
                var userInfo = response;
                $("#user_name").text(userInfo.full_name);
                $("#user_name1").text(userInfo.full_name);
                $("#user_avatar").attr("src", "../../view/images/" + userInfo.avatar_url);
                $("#user_avatar1").attr("src", "../../view/images/" + userInfo.avatar_url);

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
}

function loadData() {
    $.ajax({
        type: 'GET',
        url: API + '/userrelacontroller/getbyid.php?id=' + user_id,
        headers: {
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
        },
        success: function (response) {
            var numFriend = 0;
            if (response.data == null) {

            } else {
                numFriend = response.data.length;
                let $str = response.data.map(function (user) {
                    return `<div class="col-lg-3 col-md-6 col-sm-6">
                                <div class="friend-box">
                                    <figure>
                                        <img src="images/resources/frnd-cover1.jpg" alt="">
                                    </figure>
                                    <div class="frnd-meta">
                                        <img src="../../view/images/${user.avatar_url}" style="width: 88px; height: 88px;" alt="">
                                        <div class="frnd-name">
                                            <a href="#" title="">${user.full_name}</a>
                                            <span style="max-width: 100px; display: inline-block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${user.email}</span>
                                        </div>
                                        <ul class="frnd-info">
                                            <li><span>Friends:</span> 223 (2 mutule friends)</li>
                                            <li style="max-width: 220px; display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><span>Favorites:</span> ${user.favorites}</li>
                                            <li style="max-width: 220px; display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><span>Study at:</span> ${user.study_at}</li>
                                            <li style="max-width: 220px; display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"><span>Other info:</span> ${user.other_info}</li>
                                            <li><span>Since:</span>${user.created_at}</li>
                                        </ul>
                                        <a class="send-mesg" href="#" title="">Message</a>
                                        <div class="more-opotnz">
                                            <i class="fa fa-ellipsis-h"></i>
                                            <ul>
                                                <li><a href="#" title="">Block</a></li>
                                                <li><a href="#" title="">UnBlock</a></li>
                                                <li><a href="#" title="">Mute Notifications</a></li>
                                                <li><a href="#" title="">hide from friend list</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                });
                $('#list-friend').html($str);
            }

            $('#num-friend').html(numFriend);
        }
    });
}

function deleteFriend(follower, following) {
    var settings = {
        "url": API + "/userrelacontroller/deletefriend.php",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "follower": follower,
            "following": following
        }),
    };

    $.ajax(settings)
        .done(function (response) {
            $.toast({
                heading: 'Delete friend successfull',
                text: '',
                showHideTransition: 'slide',
                icon: 'success',
                loaderBg: '#fa6342',
                position: 'bottom-right',
                hideAfter: 3000,
            });
            getRecommenFriend();
        })
        .fail(function (errorThrown) {
            console.error("Lỗi: ", errorThrown);
            $.toast({
                heading: 'Delete friend failed',
                text: '',
                showHideTransition: 'fade',
                icon: 'error',
                hideAfter: 7000,
                loaderBg: '#fa6342',
                position: 'bottom-right',
            });
            getRecommenFriend();
        });
}