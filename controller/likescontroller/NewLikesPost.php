<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');
    include_once('../../config/DataBase.php');
    include_once('../../model/Likes.php');
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $db = new DataBase();
        $connect = $db->connect();

        $likes = new Likes($connect);

        $data = json_decode(file_get_contents("php://input"));
        $likes->setUser_id($data->user_id);
        $likes->setPost_id($data->post_id);
        $read = $likes->addNewLikes();

        $list = [];
        if($read) {
            $list['message'] = "Add new Like post";
        } else {
            $list['message'] = "Failed ";
        }
        echo json_encode($list);
    }
?>