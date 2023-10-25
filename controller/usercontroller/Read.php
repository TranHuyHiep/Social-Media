<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Users.php');

    $db = new DataBase();
    $connect = $db->connect();

    $user = new Users($connect);
    $read = $user->read();

    $num = $read->rowCount();

    if($num > 0) {
        $list = [];
        $list['data'] = [];

        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $users = array(
                'full_name' => $full_name,
                'email' => $email,
                'avatar_url' => $avatar_url,
                // 'password' => $password
            );
            array_push($list['data'], $users);
        }
        echo json_encode($list);
    }
?>