<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-Width');

    include_once('../../config/DataBase.php');
    include_once('../../model/UserInfo.php');
    include_once('../../model/Users.php');

    $db = new DataBase();
    $connect = $db->connect();
    $users = new users($connect);
    $data = json_decode(file_get_contents("php://input"));
    $email = isset($_GET["email"]) ? ($_GET["email"]) :die();
    $password = isset($_GET["password"]) ? ($_GET["password"]) :die();
    $read = $users->login($email,$password);
    $num = $read->rowCount();
    if($num>0)
    {
        while($row = $read->fetch(PDO::FETCH_ASSOC)) {
            //users::setUserId($row["id"]);
            //$getid=users::getUserId();
            session_start();
            $_SESSION['user_id'] = $row["id"];
            $response = array(
                "status" => "success",
                "user_id" => $row["id"],
                "full_name" => $row["full_name"],
                "avatar_url" => $row["avatar_url"],
                "role" => $row["role"]
                //"getID"=>$getid
            );
            echo json_encode($response);
        }
    }



    // header('Access-Control-Allow-Origin: *');
    // header('Content-Type: application/json');
    // header('Access-Control-Allow-Methods: POST');

    // include_once('../../config/DataBase.php');
    // include_once('../../model/Users.php');

    // $db = new DataBase();
    // $connect = $db->connect();
    // $users = new Users($connect);

    // // Nhận dữ liệu đăng nhập từ yêu cầu POST
    // $data = json_decode(file_get_contents("php://input"));

    // // Kiểm tra xem email và password đã được gửi hay chưa
    // if (isset($data->email) && isset($data->password)) {
    //     $email = $data->email;
    //     $password = $data->password;

    //     // Kiểm tra đăng nhập
    //     try {
    //         $user = $users->login($email, $password);

    //         if ($user) {
    //             // Đăng nhập thành công
    //             session_start();
    //             $_SESSION['user_id'] = $user['id'];

    //             $response = array(
    //                 "status" => "success",
    //                 "user_id" => $user['id'],
    //                 "full_name" => $user['full_name'],
    //                 "avatar_url" => $user['avatar_url']
    //             );
    //         } else {
    //             $response = array(
    //                 "status" => "error",
    //                 "message" => "Email hoặc mật khẩu không chính xác."
    //             );
    //         }
    //     } catch (Exception $e) {
    //         $response = array(
    //             "status" => "error",
    //             "message" => "Đã xảy ra lỗi trong quá trình đăng nhập."
    //         );
    //     }
    // }

    // echo json_encode($response);
?>