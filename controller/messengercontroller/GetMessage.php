<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Messengers.php');

    $db = new DataBase();
    $connect = $db->connect();

    $message = new Messengers($connect);

    $data = json_decode(file_get_contents("php://input"));

    $read = $message->getMessage($data->from, $data->to);

    $num = $read->rowCount();

    $list = [];
    if($num > 0) {
        $list['data'] = [];
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $mess = array(
                'user_from' => $user_from,
                'user_to' => $user_to,
                'content' => $content,
                'created_at' => $created_at
            );
            array_push($list['data'], $mess);
        }
        $list['message'] = "You have $num messages";
    } else {
        $list['message'] = "0 message";
    }
    echo json_encode($list);
?>