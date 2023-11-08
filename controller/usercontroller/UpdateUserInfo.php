<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');

// Kết nối đến cơ sở dữ liệu
$db = new DataBase();
$connect = $db->connect();
$userInfo = new UserInfo($connect);

// Nhận dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"));
session_start();
$user_id = isset($_GET['id']) ? $_GET['id'] : ($_SESSION['user_id'] ? $_SESSION['user_id'] : die());

//$is_active = isset($_POST['is_active']) ? $_POST['is_active'] : null;
$study_at = isset($_POST['study_at']) ? $_POST['study_at'] : null;
$working_at = isset($_POST['working_at']) ? $_POST['working_at'] : null;
$favorites = isset($_POST['favorites']) ? $_POST['favorites'] : null;
$other_info = isset($_POST['other_info']) ? $_POST['other_info'] : null;
$date_of_birth = isset($_POST['date_of_birth']) ? $_POST['date_of_birth'] : null;


    // Gọi hàm cập nhật thông tin UserInfo
    $result = $userInfo->updateUserInfo($user_id, $study_at, $working_at, $favorites, $other_info, $date_of_birth);

    if ($result === true) {
        // Cập nhật thành công
        $response = array("status" => "success", "message" => "User information updated.");
        http_response_code(200);
    } else {
        // Cập nhật thất bại
        $response = array("status" => "error", "message" => "Failed to update user information.");
        http_response_code(500);
    }

echo json_encode($response);
?>
