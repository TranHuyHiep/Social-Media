<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    include_once('../../config/DataBase.php');
    include_once('../../model/Messengers.php');

    $db = new DataBase();
    $connect = $db->connect();

    $message = new Messengers($connect);

    $data = json_decode(file_get_contents("php://input"));

    $read = $message->sendMessage($data->from, $data->to, $data->content);

    if($read) {
        print_r("Message Sent");
    } else {
        print_r("Fail!");
    }

?>