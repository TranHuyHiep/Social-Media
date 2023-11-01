<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');
include_once('../../model/Users.php');
$db = new DataBase();
$connect = $db->connect();
$user = new users($connect);

$name = isset($_GET['name']) ? $_GET['name'] : die();

$read = $user->find_user('%' . $name . '%');
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
