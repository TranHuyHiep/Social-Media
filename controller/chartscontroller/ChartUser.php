<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');

// Kết nối đến cơ sở dữ liệu
$db = new DataBase();
$connect = $db->connect();
$userInfo = new UserInfo($connect);

// Gọi hàm để lấy dữ liệu từ câu truy vấn
$result = $userInfo->chartUserAndPostsWeekly();

// Kiểm tra xem có dữ liệu trả về hay không
if ($result['success']) {
    // Trả về dữ liệu dưới dạng JSON
    echo json_encode(array('success' => true, 'data' => $result['data']));
}
?>
