<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Users.php');

    $db = new DataBase();
    $connect = $db->connect();

    $user = new Users($connect);

    $id = isset($_GET['id']) ? $_GET['id'] : die();

    $user->show($id);

    $result = array(
        'id' => $user->getId(),
        'full_name' => $user->getFullName(),
        'email' => $user->getEmail(),
        'avatar_url' => $user->getAvatarUrl(),
        'password' => $user->getPassword()
    );

    print_r(json_encode($result));
?>