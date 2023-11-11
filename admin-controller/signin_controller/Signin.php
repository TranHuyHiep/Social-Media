<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    include_once('../../config/DataBase.php');
    include_once('../../model/UserInfo.php');
    include_once('../../admin-model/Admin.php');

    $db = new DataBase();
    $connect = $db->connect();
    $users = new Admin($connect);
    $data = json_decode(file_get_contents("php://input"));
    $email = isset($_GET["email"]) ? ($_GET["email"]) :die();
    $password = isset($_GET["password"]) ? ($_GET["password"]) :die();
    $read = $users->signin($email,$password);
    $num = $read->rowCount();
    if($num>0)
    {
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {
            $response = array(
                "status" => "success",
                "user_id" => $row["id"],
                "full_name" => $row["full_name"],
                "avatar_url" => $row["avatar_url"]
                //"getID"=>$getid
            );
            echo json_encode($response);
        }
    }
?>