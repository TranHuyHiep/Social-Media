<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    include_once('../../config/DataBase.php');
    include_once('../../model/UserRela.php');

    $db = new DataBase();
    $connect = $db->connect();

    $userRela = new UserRela($connect);

    $data = json_decode(file_get_contents("php://input"));

    $follower = $data->follower; 
    $following = $data->following;
    $read = $userRela->addFriend($follower, $following);

    $list = [];
    if($read) {
        $list['message'] = "Sent friend request";
    } else {
        $list['message'] = "Failed send friend request";
    }

    echo json_encode($list);
?>