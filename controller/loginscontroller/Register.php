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
$full_name = isset($_POST['full_name']) ? $_POST['full_name'] : die();
$email = isset($_POST['email']) ? $_POST['email'] : die();
$password = isset($_POST['password']) ? $_POST['password'] : die();
$date_of_birth = isset($_POST['date_of_birth']) ? $_POST['date_of_birth'] : null;

// Xử lý tệp hình ảnh
$target_directory = "../../view/images/"; // Thư mục lưu trữ hình ảnh
$avatar_url = null;

if (isset($_FILES['avatar_url'])) {
    $target_file = $target_directory . basename($_FILES["avatar_url"]["name"]);

    if (move_uploaded_file($_FILES["avatar_url"]["tmp_name"], $target_file)) {
       $avatar_url = $_FILES["avatar_url"]["name"];
       
    }
}
else{
    $avatar_url=null;
}

// Kiểm tra xem có di chuyển tệp thành công hay không
// if ($avatar_url !== null) {
    // Gọi hàm đăng ký và truyền đường dẫn hình ảnh vào
    $result = $users->register($full_name, $email, $password, $avatar_url, $date_of_birth);

    if ($result) {
        $response = array(
            "status" => "success",
            "message" => "Đăng ký thành công"
        );
        echo json_encode($response);
    }

// else {
//     $response = array(
//         "status" => "error",
//         "message" => "Lỗi khi tải lên hình ảnh"
//     );
//     echo json_encode($response);
// }
?>


