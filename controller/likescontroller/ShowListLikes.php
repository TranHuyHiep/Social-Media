<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Likes.php');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');
    $db = new DataBase();
    $connect = $db->connect();

    $likes = new Likes($connect);
    $read = $likes->read();

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
                'comment_id' => $comment_id
            );
            array_push($list['data'], $users);
        }
        echo json_encode($list);
    }
?>