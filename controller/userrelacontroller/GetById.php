<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/UserRela.php');

    $db = new DataBase();
    $connect = $db->connect();

    $userRela = new UserRela($connect);

    $id = isset($_GET['id']) ? $_GET['id'] : die();

    $read = $userRela->getById($id);

    $num = $read->rowCount();

    $list = [];
    if($num > 0) {
        $list['data'] = [];
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $users = array(
                'full_name' => $full_name,
                'email' => $email,
                'avatar_url' => $avatar_url,
                'date_of_birth' => $date_of_birth
            );
            array_push($list['data'], $users);
        }
        $list['message'] = "You have $num friends";
    } else {
        $list['message'] = "You have 0 friends";
    }
    echo json_encode($list);
?>