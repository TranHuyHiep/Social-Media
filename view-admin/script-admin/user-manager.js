loadData()
function loadData() {
    var settings = {
        "url": "http://localhost/social-Media/admin-controller/user-controller/UserData.php",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        const targetDiv = document.querySelector('#userData');
        var str = `<table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">ID</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">full_name</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">email</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">avatar_url</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">password</th>
          </tr>
        </thead>
        <tbody>`
        str += response.data.map(function (users) {
            return `
                <tr>
                <td class="text-secondary text-xs font-weight-bold ">
                    <div class="text-center">
                        ${users.id} 
                    </div>
                </td>
                <td class="text-secondary text-center text-xs font-weight-bold">
                    ${users.full_name}
                </td>
                <td class="text-center mb-0 text-sm">
                    ${users.email}
                </td>
                <td class="text-center mb-0 text-sm">
                    ${users.avatar_url} 
                </td>
                <td class="text-secondary text-center text-xs font-weight-bold">
                    ${users.password}
                </td>
                <td class="align-middle">
                  <button onclick="deleteUser(${users.id})" class="button">
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
function deleteUser(id) {

    var settings = {
        "url": "http://localhost/social-Media/admin-controller/user-controller/DeleteUser.php",
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