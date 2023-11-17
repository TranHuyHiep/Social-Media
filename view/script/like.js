window.onload = loadData()
function loadData() {
    //getlike();
    loadData1(); 
    
}
var s;
window.globalVar = 1;
function getlike(id){
    var id_post = id;
    $.ajax({
        type: "GET",
        url:'http://localhost/socical-media/controller/commentscontroller/GetCommentsByIdPost.php?id='+id_post,
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
            $("#list-comments"+""+id_post).html($str);
          }
        },
    });
}

function newLikeComment(user_id,post_id, comment_id){
    var check1 = 1;
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
                        "post_id": post_id,
                        "comments_id": comment_id
                    })
                }
                $.ajax(requests).done(function (response) {
                    $.toast({
                        heading: 'You liked comment',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                })
                .fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                });
                var s = post_id;
                    getlike(s);
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
                $.toast({
                    heading: 'You unliked comment',
                    text: '',
                    showHideTransition: 'slide',
                    icon: 'success',
                    loaderBg: '#fa6342',
                    position: 'bottom-right',
                    hideAfter: 3000,
                });
                getlike(post_id);
            })
            .fail(function (errorThrown) {
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
                    $.toast({
                        heading: 'Comment has been deleted',
                        text: '',
                        showHideTransition: 'slide',
                        icon: 'success',
                        loaderBg: '#fa6342',
                        position: 'bottom-right',
                        hideAfter: 3000,
                    });
                })
                .fail(function (errorThrown) {
                    console.error("Lỗi: ", errorThrown);
                });
            } else {
                $.toast({
                    heading: "You cannot delete other people's comments",
                    text: "Fail",
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



function loadData1() {
    var settings = {
        "url": "http://localhost/socical-media/controller/postscontroller/ViewPost.php",
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
                            <img src="images/resources/nearly1.jpg" alt="">
                        </figure>
                        <div class="friend-name">
                            <div class="more">
                                <div class="more-post-optns"><i class="ti-more-alt"></i>
                                    <ul>
                                        <li><i class="fa fa-pencil-square-o"></i>Edit Post
                                        </li>
                                        <li><i class="fa fa-trash-o"></i>Delete Post</li>
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
                            <ins><a href="time-line.html" title="">Jack Carter</a> Post
                                Album</ins>
                            <span><i class="fa fa-globe"></i> published: September,15 2020
                                19:PM </span>
                        </div>
                        <div class="post-meta">
                            <div id="">
                                ${posts.content}
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
                                            <ins>20</ins>
                                        </span>
                                    </li>
                                </ul>
                                <div class="users-thumb-list">
                                    <a data-toggle="tooltip" title="" href="#" data-original-title="Anderw">
                                        <img alt="" src="images/resources/userlist-1.jpg">
                                    </a>
                                    <a data-toggle="tooltip" title="" href="#" data-original-title="frank">
                                        <img alt="" src="images/resources/userlist-2.jpg">
                                    </a>
                                    <a data-toggle="tooltip" title="" href="#" data-original-title="Sara">
                                        <img alt="" src="images/resources/userlist-3.jpg">
                                    </a>
                                    <a data-toggle="tooltip" title="" href="#" data-original-title="Amy">
                                        <img alt="" src="images/resources/userlist-4.jpg">
                                    </a>
                                    <a data-toggle="tooltip" title="" href="#" data-original-title="Ema">
                                        <img alt="" src="images/resources/userlist-5.jpg">
                                    </a>
                                    <span><strong>You</strong>, <b>Sarah</b> and <a href="#" title="">24+ more</a> liked</span>
                                </div>
                            </div>
                        </div>
                        <div  class="coment-area" style="display: block;">
                            <ul class="we-comet" id="list-comments${posts.id}">
                            </ul>
                            <ul class="we-comet">
                                <li class="post-comment">
                                    <div class="comet-avatar">
                                        <img src=" images/resources/nearly1.jpg" alt="">
                                    </div>
                                    <div class="post-comt-box">
                                        <form id="save_comment" method="post">
                                            <textarea id="myInput" name ="content_comment"></textarea>
                                            <button value = "${posts.id}" id="${posts.id} "onclick = "submitComent()">
                                            
                                            </button>
                                        </form>	
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
                    </div>

                </div>
            </div>
            `
        }).join('');


        targetDiv.innerHTML = str;
    });
}
function showcomment(id){
    getlike(id);
}

