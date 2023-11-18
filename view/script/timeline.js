window.onload = loadDataFriend()
function loadDataFriend() {
    listFriendRequest()
    getRecommenFriend()
}
function getRecommenFriend() {
    let user_id = localStorage.getItem("user_id")
    $.ajax({
        type: 'GET',
        url: API + '/userrelacontroller/getrecommenfriend.php?id=' + user_id,
        headers: {
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
        },
        success: function (response) {
            var numFriend = 0;
            if (response.data == null) {
                const targetDiv = document.querySelector('#recomment-friends');
                targetDiv.innerHTML = "No recommend friends";
            } else {
                numFriend = response.data.length;
                let str = response.data.map(function (user) {
                    return `
                    <li>
                        <img src="../../view/images/${user.avatar_url}" style="height: 118.25px; width: auto;" alt="">
                        <div class="sugtd-frnd-meta">
                            <a href="#" title="">${user.full_name}</a>
                            <span>1 mutual friend</span>
                            <ul class="add-remove-frnd">
                                <li class="add-tofrndlist">
                                    <a onclick="addFriend(${user_id}, ${user.id})" title="Add Friend">
                                        <i class="fa fa-user-plus"></i></a>
                                    </a>
                                </li>
                                <li class="remove-frnd"><a href="#" title="remove friend"><i
                                            class="fa fa-user-times"></i></a></li>
                            </ul>
                        </div>
                    </li>
                    `
                }).join('');

                const targetDiv = document.querySelector('#recomment-friends');
                targetDiv.innerHTML = str;

                // delete carousel
                $(".suggested-frnd-caro").data('owlCarousel').destroy();

                // add carousel
                $('.suggested-frnd-caro').owlCarousel({
                    items: 4,
                    loop: true,
                    margin: 10,
                    autoplay: false,
                    autoplayTimeout: 1500,
                    smartSpeed: 1000,
                    autoplayHoverPause: true,
                    nav: true,
                    dots: false,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1,
                        },
                        600: {
                            items: 4,

                        },
                        1000: {
                            items: 4,
                        }
                    }
                });
            }
        },
        error: function (errorThrown) {
            console.error("Lỗi getRecommenFriend: ", errorThrown);
            const targetDiv = document.querySelector('#recomment-friends');
            targetDiv.innerHTML = "No recommend friends";
        }
    });
}

function addFriend(follower, following) {
    var settings = {
        "url": API + "/userrelacontroller/addfriend.php",
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
                heading: 'Sent friend request',
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
            console.error("Lỗi addFriend: ", errorThrown);
            getRecommenFriend();
        });
}

function listFriendRequest() {
    let id = localStorage.getItem("user_id")
    var settings = {
        "url": API + "/userrelacontroller/listfriendrequest.php?id=" + id,
        "method": "GET"
    };
    const targetDiv = document.querySelector('#friend-requests');

    $.ajax(settings)
        .done(function (response) {
            console.log(response);
            if (response.data == null) {
                targetDiv.innerHTML = "No Friend request";
            } else {
                let str = response.data.map(function (user) {
                    return `
                        <li>
                            <figure><img src="../../view/images/${user.avatar_url}" alt="">
                            </figure>
                            <div class="friend-meta">
                                <h4><a href="time-line.html" title="">${user.full_name}</a></h4>
                                <a href="#" title="" class="underline" onclick="acceptFriend(${user.id}, ${id})">Accept</a>
                                <a href="#" title="" class="underline" onclick="rejectFriend(${user.id}, ${id})">Reject</a>
                            </div>
                        </li>
                    `
                }).join('');
                targetDiv.innerHTML = str;
            }
        })
        .fail(function (errorThrown) {
            console.error("Lỗi: listFriendRequest", errorThrown);
            targetDiv.innerHTML = "No Friend request";
        });
}

function acceptFriend(follower, following) {
    event.preventDefault();

    var settings = {
        "url": API + "/userrelacontroller/acceptfriend.php",
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
                heading: 'Accepted friend',
                text: '',
                showHideTransition: 'slide',
                icon: 'success',
                loaderBg: '#fa6342',
                position: 'bottom-right',
                hideAfter: 3000,
            });
            loadDataFriend();
        })
        .fail(function (errorThrown) {
            console.error("Lỗi: ", errorThrown);
            loadDataFriend();
        });
}

function rejectFriend(follower, following) {
    event.preventDefault();

    var settings = {
        "url": API + "/userrelacontroller/rejectfriend.php",
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
                heading: 'Reject friend request',
                text: '',
                showHideTransition: 'slide',
                icon: 'success',
                loaderBg: '#fa6342',
                position: 'bottom-right',
                hideAfter: 3000,
            });
            loadDataFriend();
        })
        .fail(function (errorThrown) {
            console.error("Lỗi: rejectFriend", errorThrown);
            loadDataFriend();
        });
    loadDataFriend();
}