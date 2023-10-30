<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');


    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    $db = new DataBase();
    $connect = $db->connect();

    $posts = new Posts($connect);

    $data = json_decode(file_get_contents("php://input"));
    
    $posts->content = $data->content;

    if($posts->create()){
        echo json_encode(array('message', 'Post Created'));
    } else {
        echo json_encode(array('message', 'Post not Created'));
    }
?>