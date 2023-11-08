<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Messengers.php');

    $db = new DataBase();
    $connect = $db->connect();

    $message = new Messengers($connect);
    $id = isset($_GET['id']) ? $_GET['id'] : die();
    $read = $message->getAllMessageByUser($id);

    $num = $read->rowCount();

    if($num > 0) {
        $list = [];
        $list['data'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $users = array(
                'id' => $id,
                'full_name' => $full_name,
                'avatar_url' => $avatar_url,
            );
            array_push($list['data'], $users);
        }
        echo json_encode($list);
    } else {
        $list['data'] = [];
        echo json_encode($list);
    }
?>