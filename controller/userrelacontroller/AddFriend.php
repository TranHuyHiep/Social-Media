<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');

    include_once('../../config/DataBase.php');
    include_once('../../model/UserRela.php');

    $db = new DataBase();
    $connect = $db->connect();

    $userRela = new UserRela($connect);

    $data = json_decode(file_get_contents("php://input"));

    $read = $userRela->addFriend($data->follower, $data->following);

    if($read == true) {
        print_r('Đã gửi lời mời kết bạn');
    } else {
        print_r('Gửi lời mời kết bạn không thành công');
    }
?>