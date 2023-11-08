
function submitPost() {
    var userId = localStorage.getItem("user_id");
    var postContent = document.getElementById("postContent").value;
    //alert(postContent);
    var settings = {
        "url": API + "/postscontroller/CreatePost.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
        },
        "data": JSON.stringify({
            "content": postContent,
            "id": userId
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log("submitPost: ", response);
        loadData();
    }).fail(function (errorThrown) {
        console.error("Lỗi submitPost: ", errorThrown);
        getRecommenFriend();
    });
}

loadData();
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
                $("#user_avatar2").attr("src", "../../view/images/" + userInfo.avatar_url);

            } else {
                alert("Không tìm thấy thông tin người dùng");
            }
        },
        error: function (error) {
            console.log("Lỗi: " + JSON.stringify(error));
            // alert("Đã xảy ra lỗi khi gọi API");
        }
    });
}

function newLikeComment(user_id, post_id, comment_id) {
    var check1 = 1;
    //var checked = false;
    //alert(post_id)
    $.ajax({
        type: "POST",
        url: API + "/likescontroller/GetLikeCommentById.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            user_id: user_id,

            comments_id: comment_id
        }),
        success: function (response) {
            //console.log(response);
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data == null) {
                //var s = ""+comment_id;
                var requests = {
                    "url": API + '/likescontroller/NewLikesComment.php',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_id": user_id,
                        "post_id": post_id,
                        "comments_id": comment_id
                    })
                }
                $.ajax(requests).done(function (response) {
                    console.log("Them like thanh cong");

                    //$("#list-comments").load(location.href + " #list-comments"); 
                    getlike(post_id);

                }).fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                    getlike(post_id);
                });
            } else {
                var requests = {
                    "url": API + '/likescontroller/DeleteLikesComment.php',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_id": user_id,
                        "comments_id": comment_id
                    })
                }
                $.ajax(requests).done(function (response) {
                    console.log("Xoa thanh cong");
                    getlike(post_id);
                }).fail(function (errorThrown) {
                    //console.log("Lỗi");
                    console.error("Lỗi: ", errorThrown);
                    getlike(post_id);
                });
            }
        },
        error: function (error) {
            console.log(error);
        },

    });
}
function deleteLikeComment(comment_id) {
    console.log(window.globalVar);
    $.ajax({
        type: "POST",
        url: API + "/commentscontroller/CheckComment.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id: comment_id,
            user_id: window.globalVar
        }),
        success: function (response) {
            console.log(response);
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data != null) {
                var requests = {
                    "url": API + '/commentscontroller/DeleteCommentPost.php?id=' + comment_id,
                    "method": "POST",
                }
                $.ajax(requests).done(function (response) {
                    //alert("Sent friend request");
                    console.log("Xoa comment thanh cong");
                    //getRecommenFriend();
                })
                    .fail(function (errorThrown) {
                        //console.log("Lỗi");
                        console.error("Lỗi: ", errorThrown);
                    });
            } else {
                alert("Ban khong the xoa comment cua nguoi khac");
            }
        },
        error: function (error) {
            console.log(error);
        },

    });
}

function getlike(id) {
    var id_post = id;

    $.ajax({
        type: "GET",
        url: API + '/commentscontroller/GetCommentsByIdPost.php?id=' + id_post,
        headers: {
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
        },
        success: function (response) {
            //var numFriend = 0;
            if (response.data == null) {
                console.log("no");
            } else {
                let $str = response.data.map(function (comment) {
                    return `
                  <li>
                    <div class="comet-avatar">
                        <img src="images/resources/nearly3.jpg" alt="">
                    </div>
                    <div class="we-comment">
                        <h5><a href="time-line.html" title="">${comment.full_name}</a></h5>
                        <p>${comment.content}</p>
                        <div class="inline-itms">
                            <span>1 year ago</span>
                            <a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
                            <a id ="${comment.id}" style="border: 0; "  onclick = "newLikeComment(1,${comment.post_id}, ${comment.id})">
                                <i class="fa fa-heart " ></i><span> ${comment.like_count}</span>
                            </a>
                            <div class="more">
                                <div class="more-post-optns"><i class="ti-more-alt"></i>
                                    <ul>
                                        <li ><i class="fa fa-pencil-square-o"></i>Edit Comment</li>
                                        <li onclick = "deleteLikeComment(${comment.id})"><i class="fa fa-trash-o"></i>Delete Comment</li>
                                        
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
                `;
                });
                $("#list-comments" + "" + id_post).html($str);
            }
        },
    });
}
function showcomment(id) {
    //console.log(id);
    getlike(id);

}
function loadData() {
    var user_id = localStorage.getItem('user_id');
    var settings = {
        "url": API + "/postscontroller/ListTimelinePost.php?user_id=" + user_id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        const targetDiv = document.querySelector('#postedContent');
        var str = response.data.map(function (posts) {
            return `

            <div class="central-meta item" style="display: inline-block;">
                <div class="user-post">
                    <div class="friend-info">
                        <figure>
                            <img src="../../view/images/${posts.avatar_url}" alt="">
                        </figure>
                        <div class="friend-name"> 
                            <div class="more">
                                <div class="more-post-optns"><i class="ti-more-alt"></i>
                                    <ul><li>
                                        <select class="myComboBox" id="myComboBox${posts.id}" onchange="updatePrivacy(${posts.id})">
                                            <option value = "" hidden>Select privacy</option>
                                            <option value = "public" >Public</option>
                                            <option value = "follower" >Follower</option>
                                            <option value = "private" >Private</option>
                                        </select>
                                        </li>
                                        <li onclick="updatePost()"><i class="fa fa-pencil-square-o"></i>Edit Post
                                        </li>
                                        
                                        <li onclick="deletePost(${posts.id})"><i class="fa fa-trash-o"> Delete Post </i></li>
                                        <li class="bad-report"><i class="fa fa-flag"></i>Report Post</li>
                                        <li><i class="fa fa-address-card-o"></i>Boost This
                                            Post</li>
                                        <li><i class="fa fa-clock-o"></i>Schedule Post</li>
                                        <li><i class="fa fa-wpexplorer"></i>Select as
                                            featured</li>
                                        <li><i class="fa fa-bell-slash-o"></i>Turn off
                                            Notifications</li>
                                    </ul>
                                </div>
                            </div>
                            <ins><a href="time-line.html" title="">${posts.full_name}</a> Post
                                Album</ins>
                            <span>
                                <img src="./images/${posts.access_modifier}.png" width=15px" />${posts.access_modifier}
                                
                            published: ${posts.updated_at ? `updated ${posts.updated_at}` : `created ${posts.created_at}`}
                            </span >
                        </div >
                        <div class="post-meta">
                            <div id="currentcontent">
                                ${posts.content}
                            </div>
                            <div id="editForm" style="display: none;">
                            <textarea id="editedContent"></textarea>
                            <button class="saveButton" id="saveButton" onclick="saveEditedPost(${posts.id})" >Lưu</button>
                            </div>
                            <figure>
                                <ul class="like-dislike">
                                    <li><a class="bg-purple" href="#" title="Save to Pin Post"><i class="fa fa-thumb-tack"></i></a></li>
                                    <li><a class="bg-blue" href="#" title="Like Post"><i class="ti-thumb-up"></i></a></li>
                                    <li><a class="bg-red" href="#" title="dislike Post"><i class="ti-thumb-down"></i></a></li>
                                </ul>
                            </figure>
                            <div class="we-video-info">
                                <ul>
                                    <li>
                                        <span class="views" title="views">
                                            <i class="fa fa-eye"></i>
                                            <ins>1.2k</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <div class="likes heart" title="Like/Dislike" onclick = "likePost(1,${posts.id})">❤
                                            <span>${posts.like_count}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span id = "${posts.id}" class="comment" onclick = "showcomment(${posts.id})" title="Comments">
                                            <i class="fa fa-commenting"></i>
                                            <ins>52</ins>
                                        </span>
                                    </li>

                                    <li>
                                        <span>
                                            <a class="share-pst" href="#" title="Share">
                                                <i class="fa fa-share-alt"></i>
                                            </a>
                                           
                                        </span>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                        <div class="coment-area" style="display: block;">
                            <ul class="we-comet" id="list-comments${posts.id}">
                            </ul>
                            <ul class="we-comet">
                                <li class="post-comment">
                                    <div class="comet-avatar">
                                        <img src="images/resources/nearly1.jpg" alt="">
                                    </div>
                                    <div class="post-comt-box">
                                        <form method="post">
                                            <textarea placeholder="Post your comment"></textarea>
                                            <div class="add-smiles">
                                                <div class="uploadimage">
                                                    <i class="fa fa-image"></i>
                                                    <label class="fileContainer">
                                                        <input type="file">
                                                    </label>
                                                </div>
                                                <span class="em em-expressionless" title="add icon"></span>
                                                <div class="smiles-bunch">
                                                    <i class="em em---1"></i>
                                                    <i class="em em-smiley"></i>
                                                    <i class="em em-anguished"></i>
                                                    <i class="em em-laughing"></i>
                                                    <i class="em em-angry"></i>
                                                    <i class="em em-astonished"></i>
                                                    <i class="em em-blush"></i>
                                                    <i class="em em-disappointed"></i>
                                                    <i class="em em-worried"></i>
                                                    <i class="em em-kissing_heart"></i>
                                                    <i class="em em-rage"></i>
                                                    <i class="em em-stuck_out_tongue"></i>
                                                </div>
                                            </div>

                                            <button type="submit"></button>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div >

                </div >
            </div >
            `
        }).join('');


        targetDiv.innerHTML = str;
    });
}


function deletePost(id) {

    var settings = {
        "url": API + "/postscontroller/DeletePost.php",
        "method": "POST",
        "headers": {
        },
        "data": JSON.stringify({
            "id": id
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        loadData();
        //alert("Bạn đã xóa bài viết!");
    });

}

function updatePost() {
    document.getElementById('currentcontent').style.display = 'none';
    document.getElementById('editForm').style.display = 'block';
    const currentContent = document.getElementById('currentcontent').innerText;
    document.getElementById('editedContent').value = currentContent;

}
function updatePrivacy(id) {
    var access_modifier = document.getElementById("myComboBox" + id).value;
    if (access_modifier == "") return;
    var settings = {
        "url": API + "/postscontroller/UpdatePrivacy.php",
        "method": "PUT",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "id": id,
            "access_modifier": access_modifier
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        //alert("ban da update quyen rieng tu");
        loadData();
    });
}
function saveEditedPost(id) {

    var editedContent = document.getElementById('editedContent').value;
    //alert(editedContent);


    var settings = {
        "url": API + "/postscontroller/UpdatePost.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "content": editedContent,
            "id": id
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log("editPost: ", response);
        loadData();
    }).fail(function (errorThrown) {
        console.error("Lỗi editPost: ", errorThrown);

    });

}

