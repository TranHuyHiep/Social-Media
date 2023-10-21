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

    $read = $userRela->deleteFriend($data->follower, $data->following);

    if($read == true) {
        print_r('Successful delete friend');
    } else {
        print_r('Fail!');
    }
?>