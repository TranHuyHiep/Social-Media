<?php
class Posts{
    private $conn;

    public $id;
    public $user_id;
    public $content;
    public $updated_at;
    public $created_at;
    public $like_count;
    public $access_modifier;
    public $shared_post_id;
    public $avatar_url;
    public $full_name;
    public $is_acive;
    public $url;
    //ket noi db
    public function __construct($conn){
        $this->conn = $conn;
    }

    // bai viet ngoai trang chu
    public function read()
    {
        $query = "SELECT Posts.id, content, Posts.user_id, full_name,access_modifier, avatar_url,like_count, created_at, updated_at, url  
        FROM Posts JOIN Users ON Posts.user_id=Users.id INNER JOIN Medias ON Posts.id=Medias.post_id
        where Posts.user_id in 
        (SELECT follwing as friend_id
            FROM socialmedia.userrelas
            where follower = :id and status = 2
            union
            SELECT follower as friend_id
            FROM socialmedia.userrelas
            where follwing = :id and status = 2) ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }
    // bai viet trang ca nhan
    public function timeline(){
        $query = "SELECT Posts.id, content, Posts.user_id, access_modifier,shared_post_id, full_name, avatar_url, url, like_count, created_at, updated_at
                    FROM Users JOIN Posts ON Users.id=Posts.user_id LEFT JOIN Medias ON Posts.id = Medias.post_id
                    WHERE Posts.user_id=:id and Posts.is_active = 1 ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }
    // chia se bai viet
    public function share(){
        $query = "INSERT INTO Posts SET content=:content, shared_post_id=:shared_post_id, Posts.user_id=:users_id, like_count=0, created_at=now(), access_modifier='public', is_active=1";
        $stmt = $this->conn->prepare($query);
        
        //bind data
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':users_id', $this->user_id);
        $stmt->bindParam(':shared_post_id', $this->shared_post_id);


        
        if($stmt->execute()){
            return true;
        }
        printf("Error %s.\n" ,$stmt->Error);
        return false; 


        
    }
    

    // lay bai viet chia se
    public function showshare(){
        $query = "SELECT Posts.id, content, Posts.user_id, access_modifier,shared_post_id, full_name, avatar_url, created_at, updated_at, url  
        FROM Users JOIN Posts ON Users.id=Posts.user_id INNER JOIN Medias ON Posts.id = Medias.post_id WHERE Posts.id=:id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        return $stmt;
    }
    
    // tao bai viet moi
    // public function create(){
    //     $query = "INSERT INTO Posts SET content=:content, Posts.user_id=:id, like_count=0, created_at=now(), access_modifier='public', is_active=1";
    //     $stmt = $this->conn->prepare($query);
        
    //     //bind data
    //     $stmt->bindParam(':content', $this->content);
    //     $stmt->bindParam(':id', $this->id);

        
    //     if($stmt->execute()){
    //         return true;
    //     }
    //     printf("Error %s.\n" ,$stmt->Error);
    //     return false; 
        
    // }
    public function create($content, $id, $url)
{
    // Thêm bài đăng
    $postQuery = "INSERT INTO Posts SET content=:content, user_id=:id, like_count=0, created_at=NOW(), access_modifier='public', is_active=1";
    $postStmt = $this->conn->prepare($postQuery);

    // Bind data
    $postStmt->bindParam(':content', $content);
    $postStmt->bindParam(':id', $id);

    // Thực hiện câu lệnh thêm vào Posts
    if (!$postStmt->execute()) {
        printf("Error %s.\n", implode(" ", $postStmt->errorInfo()));
        return false;
    }

    // Lấy ID của bài đăng vừa thêm
    $postId = $this->conn->lastInsertId();

    // Thêm media trước, nếu có
    $mediaQuery = "INSERT INTO Medias SET post_id=:post_id, url=:url, is_active=1";
    $mediaStmt = $this->conn->prepare($mediaQuery);
    $mediaStmt->bindParam(':post_id', $postId, PDO::PARAM_INT); // Sử dụng ID tự sinh từ bảng Posts
    $mediaStmt->bindParam(':url', $url);

    // Thực hiện câu lệnh thêm vào Medias
    if (!$mediaStmt->execute()) {
        printf("Error %s.\n", implode(" ", $mediaStmt->errorInfo()));
        return false;
    }

    return true;
}

    
    // update bai viet
    public function update(){
        $query = "UPDATE Posts SET content=:content, updated_at=now() WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        
        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':content', $this->content);
        
        if($stmt->execute()){
            return true;
        }
        printf("Error %s.\n" ,$stmt->Error);
        return false; 
        
    }
    // xoa bai viet
    public function delete(){
        $query = "UPDATE Posts SET is_active = 0 WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        //bind data
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()){
            return true;
        }
        printf("Error %s.\n" ,$stmt->Error);
        return false; 
        
    }
    // chinh sua quyen rieng tu
    public function updatePrivacy(){
        
        $query = "UPDATE Posts SET access_modifier=:access_modifier, updated_at=now() WHERE id=:id ";
        $stmt = $this->conn->prepare($query);
        
        //bind data
        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':access_modifier', $this->access_modifier);

        
        if($stmt->execute()){
            return true;
        }
        printf("Error %s.\n" ,$stmt->Error);
        return false; 
    }
    
    public function findByName($name) {
        $name = '%' . $name . '%'; // Thêm dấu % vào giá trị tìm kiếm
        $query = "SELECT posts.id, content, access_modifier, like_count, created_at, updated_at, shared_post_id, full_name, email, avatar_url, user_id
                    FROM posts
                    JOIN users ON users.id = posts.user_id
                    WHERE LOWER(content) LIKE LOWER(:name) AND is_active = 1
                    ORDER BY created_at DESC
                    LIMIT 10;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        $stmt->execute();
    
        return $stmt;
    }
    
    public function Data()
    {
        $query = "SELECT * FROM Posts where is_active = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>