<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: GET");
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');
    //header("Access-Control-Allow-Headers: Content-Type");
    include_once('../../config/DataBase.php');
    include_once('../../model/Likes.php');

    $db = new DataBase();
    $connect = $db->connect();

    $likes = new Likes($connect);
    $data = json_decode(file_get_contents("php://input"));
    $likes->setUser_id($data->user_id);
    $likes->setComment_id($data->comments_id);
    $read = $likes->checkLikeComment();

    $num = $read->rowCount();
    $list = [];
    if($num > 0) {
        $list['data'] = [];
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $mess = array(
                'id' => $id,
                'user_id' => $user_id,
                'comment_id' => $comment_id,
                
            );
            array_push($list['data'], $mess);
        }
        //$list['message'] = "You have $num likes";
    }
    echo json_encode($list);
   
?>