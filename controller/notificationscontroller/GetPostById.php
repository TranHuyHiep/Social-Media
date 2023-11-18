<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

include_once('../../config/DataBase.php');
include_once('../../model/Notifications.php');

$db = new DataBase();
$connect = $db->connect();

$notifications = new Notifications($connect);

$post_id = isset($_GET['post_id']) ? $_GET['post_id'] : die();

$read = $notifications->getPostbyID($post_id);

if ($read) {
    $num = $read->rowCount();
    $response = array();
    if ($num > 0) {
        

        while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
            $response = array(
                'id' => $row['id'],
                'user_id' => $row['user_id'],
                'content' => $row['content'],
                'full_name' => $row['full_name'],
                'avatar_url'=> $row['avatar_url'],
                'access_modifier' => $row['access_modifier'],
                'like_count' => $row['like_count'],
                'shared_post_id' => $row['shared_post_id'],
                'created_at' => $row['created_at'],
                'updated_at' => $row['updated_at'],
                'is_active' => $row['is_active'],
                'url'=> $row['url']
            );
        }
    } 

    echo json_encode($response);
}
?>
