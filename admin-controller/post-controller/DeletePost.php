<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    include_once('../../config/DataBase.php');

    include_once('../../model/Users.php');

    $db = new DataBase();

    $connect = $db->connect();
    $post = new Posts($connect);
    
    $data = json_decode(file_get_contents("php://input"));
    $post->id = $post->id;
    if($post->delete()){
        echo json_encode(array('message', 'User Deleted'));
    } else {
        echo json_encode(array('message', 'User not Deleted'));
    }
?>