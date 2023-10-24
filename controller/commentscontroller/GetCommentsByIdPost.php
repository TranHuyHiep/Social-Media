<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);
    $data = json_decode(file_get_contents("php://input"));
    $ID = isset($_GET["id"]) ? ($_GET["id"]) :die();
    $read = $comments->getCommentsByIdPost($ID);

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
                
            );
            array_push($list['data'], $mess);
        }
        $list['message'] = "You have $num comments";
    } else {
        $list['message'] = "0 comments";
    }
    echo json_encode($list);
?>