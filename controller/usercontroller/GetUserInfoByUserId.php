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
$userInfo = new UserInfo($connect);

session_start();
$user_id = isset($_GET['id']) ? $_GET['id'] : ($_SESSION['user_id'] ? $_SESSION['user_id'] : die());
//echo json_encode($user_id);
// Use the user_id to get the UserInfo
$userInfoData = $userInfo->getUserInfoByUserId($user_id);

if ($userInfoData) {
    // UserInfo found, create a new JSON object with selected fields
    $selectedFields = array(
        "study_at" => $userInfoData["study_at"],
        "working_at" => $userInfoData["working_at"],
        "favorites" => $userInfoData["favorites"],
        "other_info" => $userInfoData["other_info"],
        "date_of_birth" => $userInfoData["date_of_birth"]
    );

    echo json_encode($selectedFields);
} else {
    // UserInfo not found
    $response = array("status" => "error", "message" => "User info not found.");
    echo json_encode($response);
}
?>
