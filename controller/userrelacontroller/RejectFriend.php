<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    include_once('../../config/DataBase.php');
    include_once('../../model/UserRela.php');
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        $db = new DataBase();
        $connect = $db->connect();

        $userRela = new UserRela($connect);

        $data = json_decode(file_get_contents("php://input"));

        $read = $userRela->rejectFriend($data->follower, $data->following);

        $num = $read->rowCount();

        $list = [];
        if($num > 0) {
            $list['message'] = 'Successful reject friend';
        } else {
            $list['message'] = 'Fail!';
        }
       
        echo json_encode($list);
    }
?>