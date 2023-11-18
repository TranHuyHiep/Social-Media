<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    include_once('../../config/DataBase.php');
    include_once('../../model/Likes.php');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');
    $db = new DataBase();
    $connect = $db->connect();

    $likes = new Likes($connect);
    $data = json_decode(file_get_contents("php://input"));
    $ID = isset($_GET["id"]) ? ($_GET["id"]) :die();
    $likes->setId($ID);
    $read = $likes->getLikesByIdPost();

    $num = $read->rowCount();
    $list = [];
    if($num > 0) {
        $list['data'] = [];
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {

            extract($row);

            $mess = array(
                'id' => $id,
                'user_id' => $user_id,
                'post_id' => $post_id,
                
            );
            array_push($list['data'], $mess);
        }
        $list['message'] = "You have $num likes";
    } else {
        $list['message'] = "0 likes";
    }
    echo json_encode($list);
?>