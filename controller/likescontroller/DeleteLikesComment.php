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
    //$ID = isset($_GET["id"]) ? ($_GET["id"]) :die();
    $read = $likes->removeLikeComment($data->user_id, $data->comments_id);

    $list = [];
    if($read) {
        $list['message'] = "Delete Like Comment";
    } else {
        $list['message'] = "Failed ";
    }
    echo json_encode($list);
?>