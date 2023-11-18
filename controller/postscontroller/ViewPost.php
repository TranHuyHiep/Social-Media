<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');

    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    $db = new DataBase();
    $connect = $db->connect();

    $posts = new Posts($connect);

    $id = isset($_GET['id']) ? $_GET['id'] : die();

    $posts->user_id = $id;
    $read = $posts->read();

    $num = $read->rowCount();

    if($num > 0) {
        $list = [];
        $list['data'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

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
                'access_modifier' => $access_modifier,
                "url"=>$url
               
            );
            array_push($list['data'], $posts);
        }
        echo json_encode($list);
    }

?>