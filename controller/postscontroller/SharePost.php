<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');


    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $db = new DataBase();
        $connect = $db->connect();

        $posts = new Posts($connect);

        $data = json_decode(file_get_contents("php://input"));
        
        $posts->content = $data->content;
        $posts->user_id = $data->user_id;
        $posts->shared_post_id = $data->shared_post_id;


        if($posts->share()){
            echo json_encode(array('message', 'Post Shared'));
        } else {
            echo json_encode(array('message', 'Post not Shared'));
        }
    }
?>