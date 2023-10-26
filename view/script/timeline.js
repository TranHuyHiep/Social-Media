import { API } from './api.js';
async function callImg () {
    $.ajax({
        type: 'GET',
        url: API + '/social-media/controller/usercontroller/read.php',
        headers: {
            // 'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBWZXIiOiIwLjAuMCIsImV4cCI6NDcyNjM4OTEyMiwibG9jYWxlIjoiIiwibWFzdGVyVmVyIjoiIiwicGxhdGZvcm0iOiIiLCJwbGF0Zm9ybVZlciI6IiIsInVzZXJJZCI6IiJ9.QIZbmB5_9Xlap_gDhjETfMI6EAmR15yBtIQkWFWJkrg',
        },
        success: function (response) {
            var numFriend = 0;
            if (response.data == null) {

            } else {
                numFriend = response.data.length;
                let str = response.data.map(function (user) {
                    return `
                        <li>
                            <img src="${user.avatar_url}" alt="">
                            <div class="sugtd-frnd-meta">
                                <a href="#" title="">${user.full_name}</a>
                                <span>1 mutual friend</span>
                                <ul class="add-remove-frnd">
                                    <li class="add-tofrndlist"><a href="#" title="Add friend"><i
                                                class="fa fa-user-plus"></i></a></li>
                                    <li class="remove-frnd"><a href="#" title="remove friend"><i
                                                class="fa fa-user-times"></i></a></li>
                                </ul>
                            </div>
                        </li>
                    `
                }).join('');

                const targetDiv = document.querySelector('#recomment-friends');
                console.log('targetDiv: ', targetDiv);
                targetDiv.innerHTML += str;

            }
        }
    });
}

await document.addEventListener('DOMContentLoaded', callImg);

