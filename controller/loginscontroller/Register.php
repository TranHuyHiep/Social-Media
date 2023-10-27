<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');
include_once('../../model/Users.php');

// Kết nối đến cơ sở dữ liệu
$db = new DataBase();
$conn = $db->connect();

// Tạo một đối tượng Users
$users = new Users($conn);

// Nhận dữ liệu từ yêu cầu POST
$data = json_decode(file_get_contents("php://input"));

// Đảm bảo bạn nhận đủ dữ liệu cần thiết

    // Lấy dữ liệu từ yêu cầu POST
    $full_name = isset($_POST['full_name']) ? $_POST['full_name'] : die();
$email = isset($_POST['email']) ? $_POST['email'] : die();
$password = isset($_POST['password']) ? $_POST['password'] : die();
$avatar_url = isset($_POST['avatar_url']) ? $_POST['avatar_url'] : null;
$date_of_birth = isset($_POST['date_of_birth']) ? $_POST['date_of_birth'] : null;

        $read = $users->register($full_name, $email, $password, $avatar_url, $date_of_birth);

        if ($read) {
          
            $response = array(
                "status" => "success",
                "user_id" => $row["id"],
                "full_name" => $row["full_name"],
                "avatar_url" => $row["avatar_url"]
            );
            echo json_encode($response);
        }
       

?>
