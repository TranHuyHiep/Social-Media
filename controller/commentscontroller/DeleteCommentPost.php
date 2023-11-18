<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);

    $data = json_decode(file_get_contents("php://input"));
    $ID = isset($_GET["id"]) ? ($_GET["id"]) :die();
    $comments->setId($ID);
    $read = $comments->removeCommentsPost();

    $list = [];
    if($read) {
        $list['message'] = "Delete Comment post";
    } else {
        $list['message'] = "Failed ";
    }
    echo json_encode($list);
?>