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
    $ID = isset($_GET["id"]) ? ($_GET["id"]) :die();
    $read = $comments->removeCommentsPost($ID);

    if($read == true) {
        print_r('Successful delete comments post');
    } else {
        print_r('Fail!');
    }
?>