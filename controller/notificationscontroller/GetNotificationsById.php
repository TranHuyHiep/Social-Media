<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
include_once('../../config/DataBase.php');
include_once('../../model/Users.php');
include_once('../../model/Notifications.php');

$db = new DataBase();
$connect = $db->connect();

$notifications = new Notifications($connect);

$own_id = isset($_GET["id"]) ? ($_GET["id"]) : die();

$result = $notifications->getNotificationsForUser($own_id);

if ($result) {
    $notifications_data = array();

    foreach ($result as $row) {
        $notification = array(
            'avatar' => $row['avatar_url'],
            'content' => $row['content'],
            'create_at' => $row['created_at'],
            'link'=> $row['link']
        );

        $notifications_data[] = $notification;
    }

    $response = array(
        'status' => 'success',
        'data' => $notifications_data
    );
} else {
    $response = array(
        'status' => 'error',
        'message' => 'No notifications found'
    );
}

echo json_encode($response);
?>
