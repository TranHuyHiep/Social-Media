<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');


    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    $db = new DataBase();
    $connect = $db->connect();

    $posts = new Posts($connect);

    $data = json_decode(file_get_contents("php://input"));
    
    $posts->id = $data->id;
    $posts->access_modifier = $data->access_modifier;

    if($posts->updatePrivacy()){
        echo json_encode(array('message', 'Post Updated'));
    } else {
        echo json_encode(array('message', 'Post not Updated'));
    }
?>