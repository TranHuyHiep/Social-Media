window.onload = loadData()
function loadData() {
    getlike(); 
}

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
            //numFriend = response.data.length;
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
                            <button id ="${comment.id}" style="border: 0; "  onclick = "newLikeComment(1, ${comment.id})">
                                <i class="ti-thumb-up " ></i><span> ${comment.like_count}</span>
                            </button>
                            <a>
                                <i  class="ti-thumb-down dislike " id= "${comment.id}5"></i>
                            </a>
                        </div>
                    </div>
                </li>
                `;
            });
            $("#list-comments").html($str);
            //const targetDiv = document.querySelector('#list-post');
            //targetDiv.innerHTML = str;
            
          }
    
          //$("#num-friend").html(numFriend);
        },
    });
}
function newLikeComment(user_id, comment_id){
    var s = ""+comment_id;
    console.log(s);
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
        alert("Sent friend request");
        //getRecommenFriend();
    })
    .fail(function (errorThrown) {
        //console.log("Lỗi");
        console.error("Lỗi: ", errorThrown);
    });
    document.getElementById(s.toString()).disabled = true;

}
function newLikeComment(user_id, comment_id){
    var s = ""+comment_id;
    console.log(s);
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
        //alert("Sent friend request");
        location.reload ();
        //getRecommenFriend();
    })
    .fail(function (errorThrown) {
        //console.log("Lỗi");
        console.error("Lỗi: ", errorThrown);
    });
    document.getElementById(s.toString()).disabled = true;

}
// $(document).on('click','.dislike', function(e){
//     console.log("da nhan");
//     var id_comment = this.id;
//     console.log(id_comment);
//     $.ajax({
//         type: "POST",
//         url:'http://localhost/socical-media/controller/likescontroller/DeleteLikesPost.php',
//         //"method": "POST",
//         headers: {
//         "Content-Type": "application/json"
//         },
//         data: JSON.stringify({
//             "user_id": 1,
//             "comments_id": id_comment
//         }),
//         success: function (response) {
//             //alert("Thanh cong");
//             console.log("ss");
//         },
//         error: function (error) {
//             $("#response").html("Lỗi: " + JSON.stringify(error));
//         }
//     });
// });