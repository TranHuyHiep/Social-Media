window.onload = function () {
    loadData();
    setInterval(loadData, 10000);
}
function loadData() {
    // TODO update id
    var id = 1;
    var settings = {
        "url": API + "/messengercontroller/getallmessagebyuser.php?id=" + id,
        "method": "GET",
        "timeout": 0,
    };
    const targetDiv = document.querySelector('#list-message');

    $.ajax(settings).done(function (response) {
        if (response.data == null) {

        } else {
            let str = response.data.map(function (mess) {
                return `
                <li class="nav-item unread">
                    <a class="active" href="" data-toggle="tab" onclick="getMessageToUser(${mess.id})">
                        <figure><img src="${mess.avatar_url}" alt="">
                            <span class="status f-online"></span>
                        </figure>
                        <div class="user-name">
                            <h6 class="">${mess.full_name}</h6>
                            <span>${mess.content} - ${countTime(mess.created_at)}</span>
                        </div>
                        <div class="more">
                            <div class="more-post-optns"><i class="ti-more-alt"></i>
                                <ul>
                                    <li><i class="fa fa-bell-slash-o"></i>Mute</li>
                                    <li><i class="ti-trash"></i>Delete</li>
                                    <li><i class="fa fa-folder-open-o"></i>Archive</li>
                                    <li><i class="fa fa-ban"></i>Block</li>
                                    <li><i class="fa fa-eye-slash"></i>Ignore Message</li>
                                    <li><i class="fa fa-envelope"></i>Mark Unread</li>
                                </ul>
                            </div>
                        </div>
                    </a>
                </li>
                `
            }).join('');
            targetDiv.innerHTML = str;
        }
    });
}

function getMessageToUser(user_id) {

    loadUserDetail(user_id)
    characterInfor(user_id)
    // TODO update id
    var id = 1;
    var settings = {
        "url": API + "/messengercontroller/getmessagetouser.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "from": id,
            "to": user_id
        }),
    };
    const targetDiv = document.querySelector('#conservations');

    $.ajax(settings).done(function (response) {
        $.ajax(settings).done(function (response) {
            if (response.data == null) {

            } else {
                let str = ``;
                for (let i = 0; i < response.data.length; i++) {
                    let mess = response.data[i];
                    str +=
                        `
                    <li class="${mess.user_to == id ? "you" : "me"}">
                        ${mess.user_to == id ? '<figure><img src="' + mess.avartar_url + '" alt=""></figure>' : ''}
                        <div class="text-box">
                            <p>${mess.content}</p>
                            <span><i class="ti-check"></i><i class="ti-check"></i>${mess.created_at}</span>
                        </div>
                    </li>
                    `
                }
                targetDiv.innerHTML = str;
            }
        });
    }).fail(function (response) {
        console.error("getMessageToUser: ", response);
    })
}

function loadUserDetail(user_id) {
    var settings = {
        "url": API + "/usercontroller/getuserbyid.php?id=" + user_id,
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
    };
    const targetDiv = document.querySelector('#mesg-area-head');

    $.ajax(settings).done(function (response) {
        let str = 
        `
        <div class="active-user">
            <figure><img src="${response.avatar_url}" alt="">
                <span class="status f-away"></span>
            </figure>
            <div>
                <h6 class="unread">${response.full_name}</h6>
                <span>Away</span>
            </div>
        </div>
        <ul class="live-calls">
            <li><span class="fa fa-phone"></span></li>
            <li><span class="fa fa-video"></span></li>
            <li><span class="fa fa-info-circle"></span></li>
            <li>
                <div class="dropdown">
                    <button class="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ti-view-grid"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item audio-call" href="#" ><i class="ti-headphone-alt"></i>Voice Call</a>
                        <a href="#" class="dropdown-item video-call"><i class="ti-video-camera"></i>Video Call</a>
                        <hr>
                        <a href="#" class="dropdown-item"><i class="ti-server"></i>Clear History</a>
                        <a href="#" class="dropdown-item"><i class="ti-hand-stop"></i>Block Contact</a>
                        <a href="#" class="dropdown-item"><i class="ti-trash"></i>Delete Contact</a>
                    </div>
                </div>
            </li>
        </ul>
        `
        targetDiv.innerHTML = str;
    });
}

function characterInfor(user_id) {
    var settings = {
        "url": API + "/usercontroller/getuserbyid.php?id=" + user_id,
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
    };
    const targetDiv = document.querySelector('#charter-info');

    $.ajax(settings).done(function (response) {
        let str = 
        `
        <figure><img src="${response.avatar_url}" alt=""></figure>
        <h6>${response.full_name}</h6>
        <span>Online</span>
        <div class="userabout">
            <span>About</span>
            <p>I love reading, traveling and discovering new things. You need to be happy in life.</p>
            <ul>
                <li><span>Phone:</span> +123976980</li>
                <li><span>Website:</span> <a href="#" title="">www.abc.com</a></li>
                <li><span>Email:</span> <a href="http://wpkixx.com/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="a0d3c1cdd0ccc5e0c7cdc1c9cc8ec3cfcd">[email&#160;protected]</a></li>
                <li><span>Phone:</span> Ontario, Canada</li>
            </ul>
            <div class="media">
                <span>Media</span>
                <ul>
                    <li><img src="images/resources/audio-user1.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user2.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user3.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user4.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user5.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user6.jpg" alt=""></li>
                    <li><img src="images/resources/admin2.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user1.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user4.jpg" alt=""></li>
                    <li><img src="images/resources/audio-user3.jpg" alt=""></li>
                </ul>
            </div>
        </div>
        `
        targetDiv.innerHTML = str;
    });

    
}

function countTime(created_at_string) {
    let created_at = new Date(created_at_string);
    let now = new Date();

    let timeDifference = now - created_at; // Khoảng thời gian ở dạng miligisecond

    let minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Chuyển đổi sang phút
    let hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Chuyển đổi sang giờ
    let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Chuyển đổi sang ngày

    let result;

    if (daysDifference > 0) {
        result = daysDifference + (daysDifference === 1 ? " ngày" : " ngày");
    } else if (hoursDifference > 0) {
        result = hoursDifference + (hoursDifference === 1 ? " giờ" : " giờ");
    } else {
        result = minutesDifference + (minutesDifference === 1 ? " phút" : " phút");
    }

    return result;
}