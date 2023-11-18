<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

include_once('../../config/DataBase.php');

include_once('../../model/Users.php');

$db = new DataBase();
$connect = $db->connect();
$users = new users($connect);
$data = json_decode(file_get_contents("php://input"));
$email = isset($_GET["email"]) ? ($_GET["email"]) :die();
$read = $users->forgotpass($email);
$num = $read->rowCount();
if($num>0)
{
    while($row = $read->fetch(PDO::FETCH_ASSOC)) {
        $response = array(
            "status" => "success",
            "user_id" => $row["id"],
            "full_name" => $row["full_name"],
            "avatar_url" => $row["avatar_url"],
            "password"=>$row["password"]
            //"getID"=>$getid
        );
        echo json_encode($response);
    }
}


?>