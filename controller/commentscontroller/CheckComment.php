<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: POST");
    //header("Access-Control-Allow-Headers: Content-Type");
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    include_once('../../config/DataBase.php');
    include_once('../../model/Comments.php');

    $db = new DataBase();
    $connect = $db->connect();

    $comments = new Comments($connect);
    $data = json_decode(file_get_contents("php://input"));
    $comments->setId($data->id);
    $comments->setUser_id($data->user_id);
    $read = $comments->checkCommentsByIdUser();

    $num = $read->rowCount();
    $list = [];
    if($num > 0) {
        $list['data'] = [];
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $comms = array(
                'id' => $id,
            );
            array_push($list['data'], $comms);
        }
        //$list['message'] = "You have $num likes";
    }
    echo json_encode($list);
?>