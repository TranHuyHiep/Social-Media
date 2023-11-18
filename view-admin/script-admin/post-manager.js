loadData()
function loadData() {
    var settings = {
        "url": "http://localhost/social-Media/admin-controller/post-controller/PostData.php",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        const targetDiv = document.querySelector('#postData');
        var str = `<table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">User_ID</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Content</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Access_modifier</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Like_count</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shared_post_id</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created_at</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Updated_at</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">is_active</th>
          </tr>
        </thead>
        <tbody>`
        str += response.data.map(function (posts) {
            return `
                <tr>
                <td class="text-secondary text-xs font-weight-bold ">
                    <div class="text-center">
                        ${posts.id} 
                    </div>
                </td>
                <td class="text-secondary text-center text-xs font-weight-bold">
                    ${posts.user_id}
                </td>
                <td class="text-center mb-0 text-sm">
                    ${posts.content}
                </td>
                <td class="text-center mb-0 text-sm">
                    ${posts.access_modifier} 
                </td>
                <td class="text-secondary text-center text-xs font-weight-bold">
                    ${posts.like_count}
                </td>
                <td class="text-center mb-0 text-sm text-center">
                    ${posts.shared_post_id}
                </td>
                <td class="text-center text-secondary text-xs font-weight-bold">
                    ${posts.created_at}
                </td>
                <td class="text-center text-secondary text-xs font-weight-bold">
                    ${posts.updated_at}
                </td>
                
                <td class="align-middle text-center text-sm">
                  <span class="badge badge-sm bg-gradient-success">Online</span>
                </td>
                <td class="align-middle">
                  <button onclick="deletePost(${posts.id})" class="button">
                    Delete
                  </button>
                </td>
              </ >
                `
        }).join('');
        str += `</tbody >
        </table > `

        targetDiv.innerHTML = str;
    });
}
function deletePost(id) {

    var settings = {
        "url": "http://localhost/social-Media/controller/postscontroller/DeletePost.php",
        "method": "POST",
        "headers": {
        },
        "data": JSON.stringify({
            "id": id
        }),
    };

    $.ajax(settings).done(function (response) {
        $.toast({
            heading: 'Delete completed',
            text: '',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#fa6342',
            position: 'bottom-right',
            hideAfter: 3000,
        });
        loadData();
    });

}