<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);
    $data = json_decode(file_get_contents("php://input"));
    $ID = isset($_GET["id"]) ? ($_GET["id"]) :die();
    $comments->setPost_id($ID);
    $read = $comments->getCommentsByIdPost();

    $num = $read->rowCount();
    $list = [];
    if($num > 0) {
        $list['data'] = [];
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $mess = array(
                'id' => $id,
                'user_id' => $user_id,
                'full_name' => $full_name,
                'content' => $content,
                'post_id' => $post_id,
                'like_count' =>$like_count,
                'avatar_url' =>$avatar_url,
                'created_at' => $created_at,
            );
            array_push($list['data'], $mess);
        }
        $list['message'] = "You have $num comments";
    } else {
        $list['message'] = "0 comments";
    }
    echo json_encode($list);
?>