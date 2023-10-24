<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');

    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);

    $data = json_decode(file_get_contents("php://input"));

    $read = $comments->addNewComments($data->user_id, $data->post_id,$data->content);

    if($read == true) {
        print_r('Add new comments post ');
    } else {
        print_r('Fail!');
    }
?>