loadData()
function loadData() {
    var search = "hom";
    var settings = {
        "url": API + "/postscontroller/FindPost.php?name=" + search,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(1111);
        const targetDiv = document.querySelector('#searchContent');
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
                                            <ins id ="numCm"></ins>
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
                        <div class="coment-area" style="display: block;">
                            <ul class="we-comet" id="list-comments${posts.id}">
                            </ul>
                            <ul class="we-comet">
                                <li class="post-comment">
                                    <div class="comet-avatar">
                                        <img src="../../view/images/${user_avatar}" style="width: 30px; height: 30px;" alt="">
                                    </div>
                                    <div class="post-comt-box">
                                        <form method="post">
                                            <textarea id= "myInput" placeholder="Post your comment"></textarea>
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
                                        <button type="submitComment"  onclick="submitComment(${user_id},${posts.id})">Them</button>
                                    </div>
                                </li>
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