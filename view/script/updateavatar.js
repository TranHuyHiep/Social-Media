
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
                            $.toast({
                                heading: 'Updata avatar successfull',
                                text: '',
                                showHideTransition: 'slide',
                                icon: 'success',
                                loaderBg: '#fa6342',
                                position: 'bottom-right',
                                hideAfter: 3000,
                            });
                            document.getElementById('avatar').src = response.avatar_url;
                        } else {
                            $.toast({
                                heading: 'Unable to update image',
                                text: "Unable to update image",
                                showHideTransition: 'fade',
                                icon: 'error',
                                hideAfter: 7000,
                                loaderBg: '#fa6342',
                                position: 'bottom-right',
                            });
                        }
                    } else {
                        $.toast({
                            heading: 'Unable to update image',
                            text: "Unable to update image",
                            showHideTransition: 'fade',
                            icon: 'error',
                            hideAfter: 7000,
                            loaderBg: '#fa6342',
                            position: 'bottom-right',
                        });
                    }
                }
            };

            xhr.send(formData);
        }
    });

