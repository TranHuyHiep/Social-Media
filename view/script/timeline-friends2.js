let user_id = localStorage.getItem("user_id")
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
                        <div class="friend-block">
                            <div class="more-opotnz">3
                                <i class="fa fa-ellipsis-h"></i>
                                <ul>
                                    <li><a href="#" title="">Block</a></li>
                                    <li><a href="#" title="">UnBlock</a></li>
                                    <li><a href="#" title="">Mute Notifications</a></li>
                                    <li><a href="#" title="">hide from friend list</a></li>
                                </ul>
                            </div>
                            <figure>
                                <img src="../../view/images/${user.avatar_url}" alt="" style="height: 84px; width: 84px;">
                            </figure>

                            <div class="frnd-meta">
                                <div class="frnd-name">
                                    <a href="#" title="">${user.full_name}</a>
                                    <span>${user.date_of_birth}</span>
                                </div>
                                <a class="send-mesg" href="#" title="">Message</a>
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




window.onload = loadData;