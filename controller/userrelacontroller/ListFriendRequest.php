<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Headers: Content-Type");
    include_once('../../config/DataBase.php');
    include_once('../../model/Users.php');

    $db = new DataBase();
    $connect = $db->connect();

    $user = new Users($connect);
    $id = isset($_GET['id']) ? $_GET['id'] : die();
    $read = $user->friendRequest($id);

    $num = $read->rowCount();

    $list = [];
    if($num > 0) {
        $list['data'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $users = array(
                'id' => $id,
                'full_name' => $full_name,
                'email' => $email,
                'avatar_url' => $avatar_url,
            );
            array_push($list['data'], $users);
        }
        $list['message'] = "You have $num friend request";
    } else {
        $list['message'] = "You don't have friend request";
    }
    echo json_encode($list);
?>