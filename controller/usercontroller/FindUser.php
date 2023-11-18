<?php
// header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');
// header('Access-Control-Allow-Methods: GET');

// include_once('../../config/DataBase.php');
// include_once('../../model/UserInfo.php');
// include_once('../../model/Users.php');
// $db = new DataBase();
// $connect = $db->connect();
// $user = new users($connect);

// $name = isset($_GET['name']) ? $_GET['name'] : die();

// $read = $user->find_user('%' . $name . '%');
// $num = $read->rowCount();

// $list = [];
// $list['length'] = $num;
// if($num>0)
// {
//     while($row = $read->fetch(PDO::FETCH_ASSOC)) {
        
//         $response = array(
//             "status" => "success",
//             "user_id" => $row["id"],
//             "full_name" => $row["full_name"],
//             "avatar_url" => $row["avatar_url"]
//             //"getID"=>$getid
//         );
//     }
//     $list['data'] = $response;
// }
// echo json_encode($list);

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once('../../config/DataBase.php');
include_once('../../model/UserInfo.php');
include_once('../../model/Users.php');

// Tạo kết nối đến cơ sở dữ liệu
$db = new DataBase();
$connect = $db->connect();
$user = new Users($connect);

// Lấy giá trị tên từ tham số GET
$name = isset($_GET['name']) ? $_GET['name'] : die();

// Thực hiện tìm kiếm và trả về kết quả
$read = $user->find_user('%' . $name . '%');
$num = $read->rowCount();

$list = array();
$list['length'] = $num;
$list['data'] = array();

if ($num > 0) {
    while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
        $user_item = array(
            "user_id" => $row["id"],
            "full_name" => $row["full_name"],
            "avatar_url" => $row["avatar_url"]
        );
        $list['data'][] = $user_item;
    }
    $list['status'] = "success";
} else {
    $list['status'] = "No results found";
}

echo json_encode($list);
?>
