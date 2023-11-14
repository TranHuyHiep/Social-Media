<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    $db = new DataBase();
    $connect = $db->connect();

    $posts = new Posts($connect);
    $posts->user_id =  isset($_GET['user_id']) ? $_GET['user_id'] : die();
    $timeline = $posts->timeline();

    $num = $timeline->rowCount();
    $list = [];
    $list['data'] = [];
    if($num > 0) {

        while($row = $timeline->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $posts = array(
                'id' => $id,
                'user_id' => $user_id,
                'full_name' => $full_name,
                'avatar_url'=> $avatar_url,
                'like_count' =>$like_count,
                'created_at' => $created_at,
                'updated_at' => $updated_at,
                'content' => $content,
                'shared_post_id' => $shared_post_id,
                'access_modifier' => $access_modifier,
                'url' => $url 
               
            );
            array_push($list['data'], $posts);
        }
    }
    echo json_encode($list);
?>