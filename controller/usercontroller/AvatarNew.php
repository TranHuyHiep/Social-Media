<?php
// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: POST');

// include_once('../../config/DataBase.php');
// include_once('../../model/UserInfo.php');

// // Kết nối đến cơ sở dữ liệu
// $db = new DataBase();
// $connect = $db->connect();
// $user = new Users($connect);

// // Nhận dữ liệu từ yêu cầu POST
// $data = json_decode(file_get_contents("php://input"));
// session_start();
// $user_id = isset($_GET['id']) ? $_GET['id'] : ($_SESSION['user_id'] ? $_SESSION['user_id'] : die());

// //$is_active = isset($_POST['is_active']) ? $_POST['is_active'] : null;
// $avatar_url = isset($_POST['avatar_url']) ? $_POST['avatar_url'] : die();
// $target_directory = "../../view/images/"; // Thư mục lưu trữ hình ảnh
// $avatar_url = null;

// if (isset($_FILES['avatar_url'])) {
//     $target_file = $target_directory . basename($_FILES["avatar_url"]["name"]);

//     if (move_uploaded_file($_FILES["avatar_url"]["tmp_name"], $target_file)) {
//        $avatar_url = $_FILES["avatar_url"]["name"];
       
//     }
// }

//     $result = $user.updateavatar($user_id,$avatar_url);

//     if ($result === true) {
//         // Cập nhật thành công
//         $response = array("status" => "success", "message" => "User information updated.");
//         http_response_code(200);
//     } else {
//         // Cập nhật thất bại
//         $response = array("status" => "error", "message" => "Failed to update user information.");
//         http_response_code(500);
//     }

// echo json_encode($response);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');
include_once('../../model/Users.php');

// Kết nối đến cơ sở dữ liệu
$db = new DataBase();
$connect = $db->connect();
$user = new users($connect);

// Nhận dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"));
session_start();
$user_id = isset($_GET['id']) ? $_GET['id'] : ($_SESSION['user_id'] ? $_SESSION['user_id'] : die());
// Lấy user_id từ localStorage nếu tồn tại, nếu không thì kiểm tra biến GET


$target_directory = "../../view/images/"; // Thư mục lưu trữ hình ảnh
$avatar_url = null;

if (isset($_FILES['avatar_url'])) {
    $target_file = $target_directory . basename($_FILES["avatar_url"]["name"]);

    if (move_uploaded_file($_FILES["avatar_url"]["tmp_name"], $target_file)) {
       $avatar_url = $_FILES["avatar_url"]["name"];
    }
}

// Gọi hàm cập nhật thông tin UserInfo
$result = $user->updateavatar($user_id, $avatar_url);

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
