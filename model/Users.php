<?php
class users{
    public $conn;

    public $id;
    public $full_name;
    public $email;
    public $avatar_url;
    public $password;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getFullName()
    {
        return $this->full_name;
    }

    /**
     * @param mixed $full_name
     */
    public function setFullName($full_name)
    {
        $this->full_name = $full_name;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getAvatarUrl()
    {
        return $this->avatar_url;
    }

    /**
     * @param mixed $avatar_url
     */
    public function setAvatarUrl($avatar_url)
    {
        $this->avatar_url = $avatar_url;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM users where is_active = 1 and users.role = 0";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function show($id) {
        $query = "SELECT * FROM users WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->full_name = $row['full_name'];
        $this->email = $row['email'];
        $this->avatar_url = $row['avatar_url'];
        $this->password = $row['password'];
    }
    private static $user_id;

    public static function setUserId($user_id) {
        self::$user_id = $user_id;
    }

    public static function getUserId() {
        return self::$user_id;
    }

    public function login($email,$password){
        $query = "SELECT * FROM users WHERE email = ? AND password = ? AND is_active = 1 LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email, PDO::PARAM_STR);
        $stmt->bindParam(2, $password, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
        
        
    }
    public function forgotpass($email){
        $query = "SELECT * FROM users WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
        
        
    }
    public function register($full_name, $email, $password, $avatar_url, $date_of_birth)
    {
    // Check if the email already exists
    $check_query = "SELECT * FROM Users WHERE email = ?";
    $stmt_check = $this->conn->prepare($check_query);
    $stmt_check->bindParam(1, $email, PDO::PARAM_STR);
    $stmt_check->execute();

    if ($stmt_check->rowCount() > 0) {
        // Email already exists; handle this case, for example, by returning an error response.
        $response = array("status" => "error", "message" => "Email already exists.");
        echo json_encode($response);
    } else {
        // Email doesn't exist; proceed with registration

        $query = "INSERT INTO Users (full_name, email, password, avatar_url,role,is_active) VALUES (?, ?, ?, ?,0,1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $full_name, PDO::PARAM_STR);
        $stmt->bindParam(2, $email, PDO::PARAM_STR);
        $stmt->bindParam(3, $password, PDO::PARAM_STR);
        $stmt->bindParam(4, $avatar_url, PDO::PARAM_STR);
        $stmt->execute();

        $user_id = $this->conn->lastInsertId();

        // Insert additional user information into the UserInfo table
        $insert_userinfo_query = "INSERT INTO UserInfo (id, study_at, working_at, favorites, other_info, date_of_birth, created_at) VALUES (?, NULL, NULL, NULL, NULL, ?, NOW())";
        $stmt = $this->conn->prepare($insert_userinfo_query);
        $stmt->bindParam(1, $user_id, PDO::PARAM_INT);
        $stmt->bindParam(2, $date_of_birth, PDO::PARAM_STR);
        $stmt->execute();

        // Registration successful
        $response = array("status" => "success", "message" => "Registration successful.");
        echo json_encode($response);
    }
}
public function getUserByUserId($user_id) {
    $query = "SELECT * FROM Users WHERE id = ?";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $user_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt;
    // if ($stmt->rowCount() > 0) {
    //     return $stmt->fetch(PDO::FETCH_ASSOC);
    // } else {
    //     return null; // Trả về null nếu không tìm thấy UserInfo
    // }
}
public function find_user($name){
    $query = "SELECT * FROM users WHERE full_name LIKE ? LIMIT 10;";      
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $name, PDO::PARAM_STR);
    $stmt->execute();
    return $stmt;
}

    public function recommenFriend($id)
    {
        $query = "SELECT id, full_name, email, avatar_url
                    FROM users
                    WHERE id NOT IN (
                        SELECT follwing
                        FROM userrelas
                        WHERE follower = :id
                        UNION
                        SELECT follower
                        FROM userrelas
                        WHERE follwing = :id
                        UNION SELECT :id) and role = 0
                        LIMIT 10;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();

        return $stmt;
    }

    public function friendRequest($id)
    {
        $query = "SELECT users.id, full_name, email, avatar_url
                    FROM userrelas JOIN users ON users.id = userrelas.follower
                    WHERE follwing = :id AND STATUS = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();

        return $stmt;
    }
    public function updateavatar($user_id, $avatar_url) {
        $query = "UPDATE users SET avatar_url = :avatar_url WHERE id = :user_id"; // Sửa thành `id` thay vì `user.id`
    
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':avatar_url', $avatar_url, PDO::PARAM_STR);
    
        if ($stmt->execute()) {
            return true; // Trả về `true` nếu cập nhật thành công
        } else {
            return false; // Trả về `false` nếu cập nhật thất bại
        }
    }
    public function delete(){
        $query = "UPDATE users
                    SET is_active = 0
                    WHERE id = :id;";
        $stmt = $this->conn->prepare($query);
        
        //bind data
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
        printf("Error %s.\n" ,$stmt->Error);
        return false; 
        
    }
    
}