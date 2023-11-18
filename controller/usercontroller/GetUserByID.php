<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');
include_once('../../model/Users.php');
//include_once('../loginscontroller/Login.php');
$db = new DataBase();
$connect = $db->connect();
$user = new users($connect);

session_start();
$user_id = isset($_GET['id']) ? $_GET['id'] : ($_SESSION['user_id'] ? $_SESSION['user_id'] : die());

$read = $user->getUserByUserId($user_id);
$num = $read->rowCount();
    if($num>0)
    {
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {
           
            $response = array(
                "status" => "success",
                "user_id" => $row["id"],
                "full_name" => $row["full_name"],
                "avatar_url" => $row["avatar_url"],
                "email"=>$row["email"]
                //"getID"=>$getid
            );
            echo json_encode($response);
        }
    }
    
?>
