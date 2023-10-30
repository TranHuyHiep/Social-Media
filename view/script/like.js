window.onload = loadData()
function loadData() {
    getlike(); 
}
window.globalVar = 1;
function getlike(){
    $.ajax({
        type: "GET",
        url:'http://localhost/socical-media/controller/commentscontroller/GetCommentsByIdPost.php?id=1',
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
                            <a id ="${comment.id}" style="border: 0; "  onclick = "newLikeComment(2, ${comment.id})">
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
            $("#list-comments").html($str);
          }
        },
    });
}

function newLikeComment(user_id, comment_id){
    var check1 = 1;
    //var checked = false;
    $.ajax({
        type: "POST",
        url: "http://localhost/socical-media/controller/likescontroller/GetLikeCommentById.php",
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
                    "url":'http://localhost/socical-media/controller/likescontroller/NewLikesComment.php',
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
                    console.log("Them like thanh cong");
                })
                .fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                });
            } else {
                var requests = {
                "url":'http://localhost/socical-media/controller/likescontroller/DeleteLikesComment.php',
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
            })
            .fail(function (errorThrown) {
                //console.log("Lỗi");
                console.error("Lỗi: ", errorThrown);
            });
            }
        },
        error: function (error) {
          console.log(error);
        },
        
    });
}
function deleteLikeComment(comment_id){
    console.log(window.globalVar);
    $.ajax({
        type: "POST",
        url: "http://localhost/socical-media/controller/commentscontroller/CheckComment.php",
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
                    "url":'http://localhost/socical-media/controller/commentscontroller/DeleteCommentPost.php?id=' + comment_id,
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
