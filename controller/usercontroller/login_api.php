<?php

// Kết nối tới cơ sở dữ liệu MySQL
$servername = "localhost";
$username = "root";
$password = "";
$database = "mangxahoi";

$conn = new mysqli($servername, $username, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}
if (isset($_GET['action'])) {
	$action = $_GET['action'];
}
else
{
	$action = NULL;
}
switch($action){
    case 'login':
        // Xử lý yêu cầu đăng nhập
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $email = $_POST["email"];
            $password = $_POST["password"];
            
            // Bảo vệ dữ liệu đầu vào để tránh tấn công SQL Injection
            $email = mysqli_real_escape_string($conn, $email);

            // Truy vấn kiểm tra thông tin đăng nhập
            $sql = "SELECT * FROM Users WHERE email = '$email' AND password = '$password'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                // // Đăng nhập thành công
                // $user = $result->fetch_assoc();
                // $response = array(
                //     "status" => "success",
                //     "user_id" => $user["id"],
                //     "full_name" => $user["full_name"],
                //     "avatar_url" => $user["avatar_url"]
                // );
                // echo json_encode($response);
                header("Location: ../../view/index.php");
            } else {
                // Đăng nhập không thành công
                $response = array("status" => "error", "message" => "Đăng nhập không thành công.");
                echo json_encode($response);
            }
        }

        // Đóng kết nối đến cơ sở dữ liệu
        $conn->close();
        break;
    case 'register':
        // Xử lý yêu cầu đăng ký
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $full_name = $_POST["full_name"];
            $email = $_POST["email"];       
            $password = $_POST["password"];
            $date_of_bitrh=$_POST["date_of_birth"];
            //$avatar_url = $_POST["avatar_url"];
            
            // Bảo vệ dữ liệu đầu vào để tránh tấn công SQL Injection
            $full_name = mysqli_real_escape_string($conn, $full_name);
            $email = mysqli_real_escape_string($conn, $email);
            $password = mysqli_real_escape_string($conn, $password);
            //$avatar_url = mysqli_real_escape_string($conn, $avatar_url);

            // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
            $check_query = "SELECT * FROM Users WHERE email = '$email'";
            $check_result = $conn->query($check_query);

            if ($check_result->num_rows > 0) {
                // Email đã tồn tại
                $response = array("status" => "error", "message" => "Email đã tồn tại.");
                echo json_encode($response);
                //echo "email tồn tại";
            } else {
                // Thêm người dùng mới vào cơ sở dữ liệu
                $insert_query = "INSERT INTO Users (full_name, email, password, avatar_url) VALUES ('$full_name', '$email', '$password', Null)";
                if ($conn->query($insert_query) === TRUE) {
                    //lấy users.id vừa đky
                    $user_id = $conn->insert_id;
                    //đăng ký thành công thì đông thời tạo tao userinfo
                    $insert_userinfo_query = "INSERT INTO UserInfo (id, is_active, study_at, working_at, favorites, other_info, date_of_birth, created_at) VALUES ('$user_id', 1, 'Default Study Place', 'Default Workplace', 'Default Favorites', 'Other Info', '$date_of_bitrh', NOW())";
                    if ($conn->query($insert_userinfo_query) === TRUE) {
                        // Người dùng và thông tin người dùng đã được thêm thành công
                        // $response = array("status" => "success", "message" => "Đăng ký thành công.");
                        // echo json_encode($response);
                        header("Location: ../../view/login.php");
                    } else {
                        // Xử lý lỗi nếu không thể thêm thông tin người dùng
                        $response = array("status" => "error", "message" => "Không thể thêm thông tin người dùng.");
                        echo json_encode($response);
                    }
                    // header("Location: ../../view/login.php");
                } else {
                    // Đăng ký không thành công
                    $response = array("status" => "error", "message" => "Đăng ký không thành công.");
                    echo json_encode($response);
                }
            }
        }

        // Đóng kết nối đến cơ sở dữ liệu
        $conn->close();
        break;
    
}
?>
