<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

include_once('../../config/DataBase.php');
include_once('../../model/Post.php');

$db = new DataBase();
$connect = $db->connect();

$posts = new Posts($connect);

$data = json_decode(file_get_contents("php://input"));
$content = isset($_POST['content']) ? $_POST['content'] : die();
$id = isset($_POST['user_id']) ? $_POST['user_id'] : die();
// Xử lý tệp hình ảnh
$target_directory = "../../view/images/"; // Thư mục lưu trữ hình ảnh
$url = null;

if (isset($_FILES['url'])) {
    $target_file = $target_directory . basename($_FILES["url"]["name"]);

    if (move_uploaded_file($_FILES["url"]["tmp_name"], $target_file)) {
        $url = $_FILES["url"]["name"];
    }
}
else{
    $url = null;
}


    $result = $posts->create($content, $id, $url);

    if ($result) {
        $response = array(
            "status" => "success",
            "message" => "Tạo post thành công"
        );
        echo json_encode($response);
    } else {
        $response = array(
            "status" => "error",
            "message" => "Lỗi khi tạo post"
        );
        echo json_encode($response);
    }

?>
