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
        $query = "SELECT * FROM Posts";
        $stmt = $this->conn->prepare($query);
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
}
?>