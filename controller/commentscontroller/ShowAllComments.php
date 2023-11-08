<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);
    $read = $comments->read();

    $num = $read->rowCount();

    if($num > 0) {
        $list = [];
        $list['data'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $users = array(
                'id' => $id,
                'user_id' => $user_id,
                'post_id' => $post_id,
                'parent_comment_id' => $parent_comment_id,
                'content' => $content,
                'created_at' => $created_at,
                'updated_at' => $updated_at,
                'like_count' => $like_count
            );
            array_push($list['data'], $users);
        }
        echo json_encode($list);
    }
?>