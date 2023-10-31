<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');

    include_once('../../config/DataBase.php');
    include_once('../../model/Likes.php');

    $db = new DataBase();
    $connect = $db->connect();

    $likes = new Likes($connect);

    $data = json_decode(file_get_contents("php://input"));

    $read = $likes->addNewLikes($data->user_id, $data->post_id);

    $list = [];
    if($read) {
        $list['message'] = "Add new Like post";
    } else {
        $list['message'] = "Failed ";
    }
    echo json_encode($list);
?>