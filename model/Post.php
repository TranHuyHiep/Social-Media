<?php
class Posts{
    private $conn;

    public $id;
    public $user_id;
    public $content;
    public $updated_at;
    public $created_at;
    public $like_count;
    
    //ket noi db
    public function __construct($conn){
        $this->conn = $conn;
    }

    // doc DL
    public function read()
    {
        $query = "SELECT Posts.id, content, Posts.user_id, full_name, avatar_url,like_count, created_at, updated_at  FROM Users JOIN Posts ON Users.id=Posts.user_id ORDER BY id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
    public function timeline(){
        $query = "SELECT Posts.id, content, Posts.user_id, full_name, avatar_url,like_count, created_at, updated_at  
                    FROM Users JOIN Posts ON Users.id=Posts.user_id 
                    WHERE Posts.user_id=:id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->user_id);
        $stmt->execute();

        return $stmt;
    }

    //show DL
    public function show(){
        $query = "SELECT * FROM Posts WHERE id=? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        
        $stmt->execute();
        
        $row = $stmt->Fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->user_id = $row['user_id'];
        $this->content = $row['content'];
        $this->updated_at = $row['updated_at'];
        $this->created_at = $row['created_at'];
        $this->like_count = $row['like_count'];
    }
    public function create(){
        $query = "INSERT INTO Posts SET content=:content, Posts.user_id=:id, like_count=0, created_at=now(), access_modifier='public'";
        $stmt = $this->conn->prepare($query);
        
        //bind data
        $stmt->bindParam(':content', $this->content);
        $stmt->bindParam(':id', $this->id);

        
        if($stmt->execute()){
            return true;
        }
        printf("Error %s.\n" ,$stmt->Error);
        return false; 
        
    }
    public function update(){
        $query = "UPDATE Posts SET content=:content WHERE id=:id";
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
    public function delete(){
        $query = "DELETE FROM Posts WHERE id=:id";
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
?>