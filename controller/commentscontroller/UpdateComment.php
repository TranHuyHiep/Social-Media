<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');

    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);

    $data = json_decode(file_get_contents("php://input"));
    $comments->setContent($data->content);
    $comments->setId($data->id);
    $read = $comments->updateComments();

    if($read == true) {
        print_r('Update comments post ');
    } else {
        print_r('Fail!');
    }
?>