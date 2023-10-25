<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');

    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    $db = new DataBase();
    $connect = $db->connect();

    $posts = new Posts($connect);

    $posts->id =  isset($_GET['id']) ? $_GET['id'] : die();
    
    $posts->show();
    
    $posts = array(
        'id' => $posts->id,
        'user_id' => $posts->user_id,
        'content' => $posts->content,
        'updated_at' => $posts->updated_at,
        'created_at' => $posts->created_at,
        'like_count' => $posts->like_count
    );
    print_r(json_encode($posts));

?>