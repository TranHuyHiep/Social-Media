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
    $posts->id =  isset($_GET['id']) ? $_GET['id'] : die();
   
    $show = $posts->showshare();
    $num = $show->rowCount();
    if($num > 0) {
        $list = [];
        $list['data'] = [];
        while($row = $show->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $posts = array(
                'id' => $id,
                'user_id' => $user_id,
                'full_name' => $full_name,
                'avatar_url'=> $avatar_url,
                'created_at' => $created_at,
                'updated_at' => $updated_at,
                'content' => $content,
                'shared_post_id' => $shared_post_id,
                'access_modifier' => $access_modifier,
                'url' => $url
               
            );
            array_push($list['data'], $posts);
        }
        echo json_encode($list);
    }
  
?>