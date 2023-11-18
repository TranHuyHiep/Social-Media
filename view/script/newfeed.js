const settings = {
	async: true,
	crossDomain: true,
	url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '35225ca58emsh1a118b3ea58ac07p12937ajsn550c6e164292',
		'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	let str = '';
	console.log(response);
	response.forEach(element => {
		str +=
			`
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
										<li><i class="fa fa-pencil-square-o"></i>Edit Post</li>
										<li><i class="fa fa-trash-o"></i>Delete Post</li>
										<li class="bad-report"><i class="fa fa-flag"></i>Report Post</li>
										<li><i class="fa fa-address-card-o"></i>Boost This Post</li>
										<li><i class="fa fa-clock-o"></i>Schedule Post</li>
										<li><i class="fa fa-wpexplorer"></i>Select as featured</li>
										<li><i class="fa fa-bell-slash-o"></i>Turn off Notifications</li>
									</ul>
								</div>
							</div>
							<ins><a href="time-line.html" title="">Admin</a> Post Album</ins>
							<span><i class="fa fa-globe"></i> published: September,15 2020 19:PM </span>
						</div>
						<div class="post-meta">
							<p>
								Mene for you! Have a good day.
							</p>
							<figure>
								<div class="img-bunch">
									<img src="${element.image}" alt="">
								</div>	
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
										<div class="likes heart" title="Like/Dislike">❤ <span>2K</span></div>
									</li>
									<li>
										<span class="comment" title="Comments">
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
					</div>
				</div>
			</div>
			`
	});

	$("#postedContent").html(str)
});