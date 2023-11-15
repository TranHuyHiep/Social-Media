
    document.getElementById('avatarInput').addEventListener('change', function (event) {
        var user_id = localStorage.getItem('user_id');
        var file = event.target.files[0];
        if (file) {
            var formData = new FormData();
            formData.append('avatar_url', file);

            // Thực hiện yêu cầu AJAX đến mã PHP của bạn
            var xhr = new XMLHttpRequest();
            xhr.open('POST',API + '/usercontroller/AvatarNew.php?id='+user_id, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var response = JSON.parse(xhr.responseText);
                        if (response.status === 'success') {
                            // Cập nhật nguồn hình ảnh với URL mới
                            alert("updata avatar Successfull");
                            document.getElementById('avatar').src = response.avatar_url;
                        } else {
                            alert('Không thể cập nhật hình ảnh: ' + response.message);
                        }
                    } else {
                        alert('Không thể thực hiện yêu cầu.');
                    }
                }
            };

            xhr.send(formData);
        }
    });

