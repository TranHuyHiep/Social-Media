var post_id = getParameterByName("id", window.location.href);

// Make an AJAX request to fetch the post data
$.ajax({
    type: "GET",
    url: API + "/notificationscontroller/GetPostById.php?post_id=" + post_id,
    dataType: "json",
    success: function (response) {
        // Check if the API request was successful
        if (response.id) {
            console.log(response);
            // Use the post data to update your HTML content
            var userHtml = `
                                    <div class="central-meta item" style="display: inline-block;">
                                    <div class="user-post">
                                        <div class="friend-info">
                                            <figure>
                                                <img src="../../view/images/${response.avatar_url}" alt="">
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
                                                <ins><a href="time-line.html" title="">${response.full_name}</a> Post
                                                    Album</ins>
                                                <span>
                                                <img src="./images/${response.access_modifier}.png" width=15px" />${response.access_modifier}
                                                published: ${response.created_at} </span>
                                                </div>
                                                <div class="post-meta">
                                                <div id="currentcontent">
                                                    ${response.content}
                                                </div>
                                                <div> 
                        ${response.url ? `<div style="max-width: 150px;">  <img src="./images/${response.url}" /></div>` : ``}
                         </div>
                                                <div id="editForm" style="display: none;">
                                                <textarea id="editedContent"></textarea>
                                                <button onclick="saveEditedPost(${response.id})">Lưu</button>
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
                                                            <div class="likes heart" title="Like/Dislike" onclick = "likePost(${response.id})">❤
                                                                <span>${response.like_count}</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <span id = "${response.id}" class="comment" onclick = "showcomment(${response.id})" title="Comments">
                                                                <i class="fa fa-commenting"></i>
                                                                <ins id ="numCm${response.id}"></ins>
                                                            </span>
                                                        </li>
                                    
                                                        <li>
                                                            <span>
                                                                <i class="fa fa-share-alt" onclick="formload(${response.id}) "></i>
                                                            </span>
                                                        </li>
                                                    </ul>   
                                                </div>
                                            </div>
                                            <div class="coment-area" id = "coment-area${response.id}" style="display: block;">
                                                <ul class="we-comet" id="list-comments${response.id}">
                                                </ul>
                                                <ul class="we-comet" style = "margin-top: 15px;" id="new-cm${response.id}">
                                        
                                                </ul>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    </div>
                                    <div class="modal-sharepost" id="modal-sharepost${response.id}" style="display: none; background-color: rgba(0,0,0,0.4); padding-top: 100px;">
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
                                    `;

            // Assuming #post is the container where you want to display the post
            $("#post").html(userHtml);
        } else {
            // Handle the case where the API request was not successful or data is not in the expected format
            $("#post").html("<p>Error fetching post data.</p>");
        }
    },
    error: function (error) {
        // Handle the AJAX error
        console.log("An error occurred during the AJAX request:", error);
        $("#post").html("<p>Error fetching post data.</p>");
    }
});

// Function to extract query parameters from the URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

