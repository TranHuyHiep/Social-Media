var numComment = 0;
$(document).ready(function () {
    $("#post").click(function () {
        // Lấy dữ liệu từ form
        var postContent = $("#postContent").val();
        var userId = localStorage.getItem("user_id");
        var url = $("#url")[0].files[0];

        // Tạo FormData để chứa dữ liệu
        var formData = new FormData();
        formData.append("content", postContent);
        formData.append("user_id", userId);
        formData.append("url", url);

        // Gửi Ajax request
        $.ajax({
            type: "POST",
            url: API + "/postscontroller/CreatePost.php",  // Thay thế URL_TO_YOUR_PHP_FILE.php bằng đường dẫn đến tệp PHP xử lý API của bạn
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $.toast({
                    heading: 'Create a post successfuly',
                    text: '',
                    showHideTransition: 'slide',
                    icon: 'success',
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                    hideAfter: 3000,
                });
                console.log(response);
                // Xử lý phản hồi từ server tại đây
            },
            error: function (error) {
                console.error(error);
                // Xử lý lỗi tại đây
            }
        });
    });
});

// function submitPost() {
//     var userId = localStorage.getItem("user_id")
//     var postContent = document.getElementById("postContent").value;
//     //alert(postContent);
//     var settings = {
//         "url": API + "/postscontroller/CreatePost.php",
//         "method": "POST",
//         "timeout": 0,
//         "headers": {
//         },
//         "data": JSON.stringify({
//             "content": postContent,
//             "id": userId

//         }),
//     };

//     $.ajax(settings).done(function (response) {
//         console.log("submitPost: ", response);
//         loadData();
//     }).fail(function (errorThrown) {
//         console.error("Lỗi submitPost: ", errorThrown);
//         getRecommenFriend();
//     });
// }

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
                $("#user_avatar").attr("src", "../../view/images/" + userInfo.avatar_url);
                $("#user_avatar1").attr("src", "../../view/images/" + userInfo.avatar_url);
                localStorage.setItem("user_avatar", userInfo.avatar_url)

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
//vanh code :))
//Ham them Moi/Huy like comment
//Kiểm tra xem người dùng hiện tại đã like comment chưa
//Nếu chưa thì thực hiện thêm mới
//Nếu rồi thì thực hiện xóa
function newLikeComment(post_id, comment_id) {
    var user_id = localStorage.getItem("user_id");
    console.log(user_id);
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
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data == null) {
                var requests = {
                    "url": API + '/likescontroller/NewLikesComment.php',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_id": user_id,

                        "comments_id": comment_id
                    })
                }
                $.ajax(requests).done(function (response1) {
                    $.toast({
                        heading: 'You just liked the comment',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    getComment(post_id);

                }).fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                    getComment(post_id);
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
                $.ajax(requests).done(function (response1) {
                    $.toast({
                        heading: 'You just unliked the comment',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    getComment(post_id);
                }).fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                    getComment(post_id);
                });
            }
        },
        error: function (error) {
            console.log(error);
        },

    });
}
//Hàm xóa comment bài post
//Kiểm tra xem đây có phải comment của người dùng hiện tại hay không
//Nếu phải thì thực hiện xóa
//Không thì không cho phép xóa comment
function deleteComment(comment_id, post_id) {
    var userId = localStorage.getItem("user_id")
    console.log(userId);
    $.ajax({
        type: "POST",
        url: API + "/commentscontroller/CheckComment.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id: comment_id,
            user_id: userId
        }),
        success: function (response) {
            console.log(response);
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data != null) {
                var requests = {
                    "url": API + '/commentscontroller/DeleteCommentPost.php?id=' + comment_id,
                    "method": "POST",
                }
                $.ajax(requests).done(function (response1) {
                    $.toast({
                        heading: 'Delete comments  successfull',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    //loadData();
                    getComment(post_id);
                })
                    .fail(function (errorThrown) {
                        console.error("Lỗi: ", errorThrown);
                        //loadData();
                        getComment(post_id);
                    });
            } else {
                $.toast({
                    heading: 'Delete invalid',
                    text: "You cannot delete other people's comments",
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });
                
            }
        },
        error: function (error) {
            console.log(error);
        },

    });
}
//Hàm lấy danh sách comment của 1 bài post
function getComment(id) {
    //var comment_id = id;

    const user_avatar = localStorage.getItem("user_avatar")
    var id_post = id;
    // const replyForm = document.getElementById(`coment-area${id_post}`);

    // if (replyForm.style.display === 'none' || replyForm.style.display === '') {
    //     replyForm.style.display = 'block';
    // } else {
    //     replyForm.style.display = 'none';
    // }
    let user_id = localStorage.getItem("user_id")
    $.ajax({
        type: "GET",
        url: API + '/commentscontroller/GetCommentsByIdPost.php?id=' + id_post,
        headers: {
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
        },
        success: function (response) {

            if (response.data == null) {
                console.log("no");
            } else {
                numComment = response.data.length;
                let $str = response.data.map(function (comment) {
                    return `
                  <li>
                    <div class="comet-avatar">
                        <img src="../../view/images/${comment.avatar_url}" alt="">
                    </div>
                    <div class="we-comment">
                        <h5><a href="time-line.html" title="">${comment.full_name}</a></h5>
                        <div style="padding: 5px;">
                        <p id ="currentcontentComment${comment.id}">${comment.content}</p>
                        </div>
                        <div id="editComment${comment.id}" style="display: none;">
                            <textarea id="editedContentComment${comment.id}"></textarea>
                            <button class=" post-btn" id="saveButton" onclick="saveEditComment(${comment.id},${comment.post_id})" >SAVE</button>
                            </div>
                        <div class="inline-itms">
                            <span>${countTime(comment.created_at)}</span>
                            
                            <a id ="${comment.id}" style="border: 0; "  onclick = "newLikeComment(${comment.post_id}, ${comment.id})">
                                <i class="fa fa-heart " ></i><span> ${comment.like_count}</span>
                            </a>
                            <a class="we-reply" title="Reply" onclick="showReplyForm(${comment.id})"><i class="fa fa-reply"></i></a>
                            <ul id="nestedComments${comment.id}" class="nested-comments" style="display: none;">

                            </ul>
                            <div id="replyForm${comment.id}" style="display: none;">
                                <textarea id="newReplyContent${comment.id}" placeholder="Type your reply here"></textarea>
                                <button class="post-btn" onclick="addNewReply(${comment.id},${comment.post_id},${comment.id})">Post Reply</button>
                            </div>
                            
                            <div class="more">
                                <div class="more-post-optns"><i class="ti-more-alt"></i>
                                    <ul>
                                        <li onclick = "UpdateComment(${comment.id})"><i class="fa fa-pencil-square-o"></i>Edit Comment</li>
                                        <li onclick = "deleteComment(${comment.id},${comment.post_id})"><i class="fa fa-trash-o"></i>Delete Comment</li>
                                        
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
                
                `;
                });
                var str1 = "" + numComment;
                $("#list-comments" + "" + id_post).html($str);
                $("#numCm" + id_post).html(str1);
            }
            var str2 = `
                <li class="post-comment">
                        <div class="comet-avatar">
                            <img src="../../view/images/${user_avatar}" style="width: 30px; height: 30px;" alt="">
                        </div>
                        <div class="post-comt-box">
                            <form method="post">
                                <textarea id= "myInput${id_post}" placeholder="Post your comment"></textarea>
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
                            </form>
                            <button class = "post-btn" type="submitComment"  onclick="submitComment(${user_id},${id_post})">ADD</button>
                        </div>
                    </li>
                `;
            $("#new-cm" + "" + id_post).html(str2);
        },
    });
}

//Hàm hiện list comment của 1 bài post 
function showcomment(id) {
    getComment(id);

}
//Hàm Like/Unlike bài post
function likePost(post_id) {
    let user_id = localStorage.getItem("user_id")
    // check xem nguoi dung da like bai post hay chua
    // neu chua thi thuc hien them moi like post
    // neu roi thi thuc hien xoa like post
    $.ajax({
        type: "POST",
        url: API + "/likescontroller/CheckLikedPost.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            user_id: user_id,
            post_id: post_id
        }),
        success: function (response) {
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data == null) {
                var requests = {
                    "url": API + '/likescontroller/NewLikesPost.php',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_id": user_id,
                        "post_id": post_id,

                    })
                }
                $.ajax(requests).done(function (response1) {
                    if ($.isFunction($.fn.toast)) {
                        $.toast({
                            heading: 'You just liked the Post',
                            text: '',
                            showHideTransition: 'slide',
                            icon: 'success',
                            loaderBg: '#fa6342',
                            position: 'bottom-right',
                            hideAfter: 3000,
                        });
                    }
                    loadData();

                }).fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                    loadData();
                });

            } else {
                var requests = {
                    "url": API + '/likescontroller/DeleteLikesPost.php',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_id": user_id,
                        "post_id": post_id
                    })
                }
                $.ajax(requests).done(function (response1) {
                    if ($.isFunction($.fn.toast)) {
                        $.toast({
                            heading: 'You just unliked the post',
                            text: '',
                            showHideTransition: 'slide',
                            icon: 'success',
                            loaderBg: '#fa6342',
                            position: 'bottom-right',
                            hideAfter: 3000,
                        });
                    }
                    loadData();
                }).fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                    loadData();
                });
            }
        },
        error: function (error) {
            console.log(error);
        },
    });
    loadData();

}
//Hàm thêm mới 1 comment vào bài post
function submitComment(user_id, post_id) {
    var content = document.getElementById("myInput" + post_id).value;
    console.log(content);
    var requests = {
        "url": API + '/commentscontroller/NewCommentsPost.php',
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "user_id": user_id,
            "post_id": post_id,
            "content": content
        })
    }
    $.ajax(requests).done(function (response) {
        $.toast({
            heading: 'You just commented',
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#fa6342',
            position: 'bottom-right',
            hideAfter: 3000,
        });
        getComment(post_id);
    })
        .fail(function (errorThrown) {
            console.error("Lỗi: ", errorThrown);
            getComment(post_id);
        });
}
//Hàm kiểm tra trc khi người dùng muốn sửa comment
//Kiểm tra xem đây có phải là comment của người dùng hiện tại hay không
//Nếu phải thì hiện form sửa comment
//Không thì không cho phép sửa comment
function UpdateComment(comment_id) {
    var userId = localStorage.getItem("user_id")
    $.ajax({
        type: "POST",
        url: API + "/commentscontroller/CheckComment.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id: comment_id,
            user_id: userId
        }),
        success: function (response) {
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data != null) {
                document.getElementById('editComment' + comment_id).style.display = 'block';
                const currentContent = document.getElementById('currentcontentComment' + comment_id).innerText;
                document.getElementById('editedContentComment' + comment_id).value = currentContent;
            } else {
                $.toast({
                    heading: 'Edit comment fail',
                    text: "You cannot edit other people's comments",
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });
            }
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function showReplyForm(comment_id) {
    const nestedComments = document.getElementById(`nestedComments${comment_id}`);

    if (nestedComments.style.display === 'none' || nestedComments.style.display === '') {
        nestedComments.style.display = 'block';
    } else {
        nestedComments.style.display = 'none';
    }
    var id_comment = comment_id;
    let user_id = localStorage.getItem("user_id")
    $.ajax({
        type: "GET",
        url: API + '/commentscontroller/GetCommentByIdComment.php?id=' + id_comment,
        headers: {
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
        },
        success: function (response) {

            if (response.data == null) {
                console.log("no");
            } else {
                //numComment = response.data.length;
                let $str = response.data.map(function (comment) {
                    return `
                  <li>
                    <div class="comet-avatar">
                        <img src="../../view/images/${comment.avatar_url}" alt="">
                    </div>
                    <div class="we-comment">
                        <h5><a href="time-line.html" title="">${comment.full_name}</a></h5>
                        <p id ="currentcontentComment${comment.id}">${comment.content}</p>
                        <div id="editComment${comment.id}" style="display: none;">
                            <textarea id="editedContentComment${comment.id}"></textarea>
                            <button class=" post-btn" id="saveButton" onclick="saveEditComment(${comment.id},${comment.post_id})" >SAVE</button>
                            </div>
                        <div class="inline-itms">
                            <span>${countTime(comment.created_at)}</span>
                            <a id ="${comment.id}" style="border: 0; "  onclick = "newLikeComment(${comment.post_id}, ${comment.id})">
                                <i class="fa fa-heart " ></i><span> ${comment.like_count}</span>
                            </a>
                            <a class="we-reply" title="Reply" onclick="showReplyForm(${comment.id})"><i class="fa fa-reply"></i></a>
                            <ul id="nestedComments${comment.id}" class="nested-comments" style="display: none;">
                                
                            </ul>
                            <div id="replyForm${comment.id}" style="display: none;">
                                <textarea id="newReplyContent${comment.id}" placeholder="Type your reply here"></textarea>
                                <button class="post-btn" onclick="addNewReply(${comment.id},${comment.post_id},${comment.id})">Post Reply</button>
                            </div>
                            
                            <div class="more">
                                <div class="more-post-optns"><i class="ti-more-alt"></i>
                                    <ul>
                                        <li onclick = "UpdateComment(${comment.id})"><i class="fa fa-pencil-square-o"></i>Edit Comment</li>
                                        <li onclick = "deleteComment(${comment.id}, ${comment.post_id})"><i class="fa fa-trash-o"></i>Delete Comment</li>
                                        
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </li>
                
                `;
                });
                //var str1 = "" + numComment;
                $("#nestedComments" + "" + id_comment).html($str);
                //$("#numCm" + id_post).html(str1);
            }
        },
    });



    const replyForm = document.getElementById(`replyForm${comment_id}`);

    if (replyForm.style.display === 'none' || replyForm.style.display === '') {
        replyForm.style.display = 'block';
    } else {
        replyForm.style.display = 'none';
    }
}
function addNewReply(comment_id, post_id, parent_comment_id) {
    var editedContent = document.getElementById('newReplyContent' + comment_id).value;
    var userId = localStorage.getItem("user_id")
    $.ajax({
        type: "POST",
        url: API + "/commentscontroller/NewCommentInComment.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            user_id: userId,
            post_id: post_id,
            parent_comment_id: parent_comment_id,
            content: editedContent
        }),
        success: function (response) {
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data != null) {
                //loadData();
                $.toast({
                    heading: 'You responded successfully',
                    text: '',
                    showHideTransition: 'slide',
                    icon: 'success',
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                    hideAfter: 3000,
                });
                getComment(post_id);
                //showReplyForm(comment_id);
            } else {
                //loadData();
                getComment(post_id);
                //showReplyForm(comment_id);
            }
        },
        error: function (error) {
            console.log(error);
            getComment(post_id);
        },
    });
}
//Hàm sửa comment
function saveEditComment(comment_id, post_id) {
    var userId = localStorage.getItem("user_id")
    console.log(userId);
    //check xem day co phai comment cua minh hay la ko
    $.ajax({
        type: "POST",
        url: API + "/commentscontroller/CheckComment.php",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            id: comment_id,
            user_id: userId
        }),
        success: function (response) {
            // Kiểm tra xem dữ liệu phản hồi có phải là null không
            if (response.data != null) {
                var UserId = localStorage.getItem("user_id")
                var editedContent = document.getElementById('editedContentComment' + comment_id).value;
                console.log(editedContent);
                var requests = {
                    "url": API + '/commentscontroller/UpdateComment.php?',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_id": UserId,
                        "id": comment_id,
                        "content": editedContent
                    })
                }
                $.ajax(requests).done(function (response1) {
                    $.toast({
                        heading: 'Updated comment successfully',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                    // loadData();
                    getComment(post_id);
                })
                    .fail(function (errorThrown) {
                        showcomment(postId);
                        console.error("Lỗi: ", errorThrown);
                        // loadData();
                        getComment(post_id);
                    });
            } else {
                $.toast({
                    heading: "Delete failed",
                    text: "You cannot delete other people's comments",
                    showHideTransition: 'fade',
                    icon: 'error',
                    hideAfter: 7000,
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                });

            }
        },
        error: function (error) {
            console.log(error);
        },

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
        result = daysDifference + (daysDifference === 1 ? " d" : " d");
    } else if (hoursDifference > 0) {
        result = hoursDifference + (hoursDifference === 1 ? " h" : " h");
    } else {
        result = minutesDifference + (minutesDifference === 1 ? " mn" : " mn");
    }

    return result;
}
//end
function loadData() {
    let user_id = localStorage.getItem("user_id")
    console.log(user_id);
    var settings = {
        "url": API + "/postscontroller/ViewPost.php?id=" + user_id,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        const targetDiv = document.querySelector('#postedContent');
        const user_avatar = localStorage.getItem("user_avatar")
        const user_id = localStorage.getItem("user_id")
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
                                    <ul>
                                        
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
                            published: ${posts.created_at} </span>
                            </div>
                            <div class="post-meta">
                            <div id="currentcontent">
                                ${posts.content}
                            </div>
                            
                            <div id="editForm" style="display: none;">
                            <textarea id="editedContent"></textarea>
                            <button onclick="saveEditedPost(${posts.id})">Lưu</button>
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
                                        <div class="likes heart" title="Like/Dislike" onclick = "likePost(${posts.id})">❤
                                            <span>${posts.like_count}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <span id = "${posts.id}" class="comment" onclick = "showcomment(${posts.id})" title="Comments">
                                            <i class="fa fa-commenting"></i>
                                            <ins id ="numCm${posts.id}"></ins>
                                        </span>
                                    </li>

                                    <li>
                                        <span>
                                            <i class="fa fa-share-alt" onclick="formload(${posts.id}) "></i>
                                        </span>
                                    </li>
                                </ul>   
                            </div>
                        </div>
                        <div class="coment-area" id = "coment-area${posts.id}" style="display: block;">
                            <ul class="we-comet" id="list-comments${posts.id}">
                            </ul>
                            <ul class="we-comet" style = "margin-top: 15px;" id="new-cm${posts.id}">
                    
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-sharepost" id="modal-sharepost${posts.id}" style="display: none; background-color: rgba(0,0,0,0.4); padding-top: 100px;">
            <div class="central-meta postbox" 
                style="  
                background-color: #fefefe;
                margin: auto;
                padding: 20px;
                border: 1px solid #888;
                width: 60%;
                display: block;
                ">
                <span class="create-post">Share post <span id="closetab" style="color: #aaaaaa;float: right;font-size: 28px;font-weight: bold;color: #000; text-decoration: none; cursor: pointer;"">&times;</span></span>
                <div class="new-postbox">
                    <figure>
                    <img src="../../view/images/${user_avatar}" style="width: 30px; height: 30px;" alt="">

                    </figure>
                    <div class=" newpst-input">
                        <form id="postForm" method="post">
                            <textarea id="shareContent" rows="2"
                                placeholder="Share some what you are thinking?"></textarea>
                        </form>
                        <div id="sharedContent">

                        </div>
                    </div>
                    <div class="attachments">
                        <ul>
                            <li>
                                <span class="add-loc">
                                    <i class="fa fa-map-marker"></i>
                                </span>
                            </li>
                            <li>
                                <i class="fa fa-music"></i>
                                <label class="fileContainer">
                                    <input type="file">
                                </label>
                            </li>
                            <li>
                                <i class="fa fa-image"></i>
                                <label class="fileContainer">
                                    <input type="file">
                                </label>
                            </li>
                            <li>
                                <i class="fa fa-video-camera"></i>
                                <label class="fileContainer">
                                    <input type="file">
                                </label>
                            </li>
                            <li>
                                <i class="fa fa-camera"></i>
                                <label class="fileContainer">
                                    <input type="file">
                                </label>
                            </li>
                            <li class="preview-btn">
                                <button class="post-btn-preview" type="submit"
                                    data-ripple="">Preview</button>
                            </li>
                        </ul>
                        <button class="post-btn" type="submitPost" data-ripple=""
                            onclick="share(${posts.id}, ${user_id})">Share</button>

                    </div>

                    <div class="add-location-post">
                        <span>Drag map point to selected area</span>
                        <div class="row">

                            <div class="col-lg-6">
                                <label class="control-label">Lat :</label>
                                <input type="text" class="" id="us3-lat" />
                            </div>
                            <div class="col-lg-6">
                                <label>Long :</label>
                                <input type="text" class="" id="us3-lon" />
                            </div>
                        </div>
                        <!-- map -->
                        <div id="us3"></div>
                    </div>
                </div>
            </div><!-- add post new box -->
        </div><!-- centerl meta -->
            `
        }).join('');


        targetDiv.innerHTML = str;
    });
}
function sharePost(id) {
    var modal = document.getElementById("modal-sharepost" + id);
    var span = document.getElementById("closetab");
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block"
    modal.style.position = "fixed";
    modal.style.zIndex = 9999;
    modal.style.top = "0%";
    modal.style.left = "0%";
    modal.style.width = "100vw"
    modal.style.height = "100vh"
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
}
function loadSharePost(id) {

    var settings = {
        "url": API + "/postscontroller/ViewSharePost.php?id=" + id,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        const targetDiv = document.querySelector('#sharedContent');
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
                                    <ul>
                                        
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
                            published: ${posts.created_at} </span>
                            </div>
                            <div class="post-meta">
                            <div id="currentcontent">
                                ${posts.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }).join('');
        targetDiv.innerHTML = str;
    });
}
function formload(id) {
    loadSharePost(id)

    sharePost(id)
}
function share(post_id, user_id) {
    var shareContent = document.getElementById("shareContent").value;
    console.log(shareContent);
    var settings = {
        "url": API + "/postscontroller/SharePost.php",
        "method": "POST",
        "timeout": 0,
        "headers": {
        },
        "data": JSON.stringify({
            "content": shareContent,
            "user_id": user_id,
            "shared_post_id": post_id
        }),
    };

    $.ajax(settings).done(function (response) {
        $.toast({
            heading: 'Share post successful',
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#fa6342',
            position: 'bottom-right',
            hideAfter: 3000,
        });
        console.log("sharePost: ", response);
        loadData();
    }).fail(function (errorThrown) {
        console.error("Lỗi sharePost: ", errorThrown);
    });
}
