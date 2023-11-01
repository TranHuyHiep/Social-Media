window.onload = loadData;

function loadData() {
    $.ajax({
        type: 'GET',
        url: API + '/userrelacontroller/getbyid.php?id=1',
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
                                        <img src="${user.avatar_url}" style="width: 88px; height: 88px;" alt="">
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
            alert("Delte Friend");
            getRecommenFriend();
        })
        .fail(function (errorThrown) {
            console.error("Lỗi: ", errorThrown);
            getRecommenFriend();
        });
}