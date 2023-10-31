<?php
    class Likes{
        private $conn;
        private $id;
        private $user_id;
        private $post_id;
        private $id_paren_likes;

        /**
         * @param $conn
         */
        public function __construct($conn){
            $this->conn = $conn;
        }
        
	
    //Doc dl
    public function read()
    {
        $query = "SELECT * FROM likes";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
    //danh sach like theo bai post
    public function getLikesByIdPost($id){
        $query = "SELECT likes.id, likes.user_id, likes.post_id
        FROM likes INNER JOIN users ON likes.user_id = users.id
        INNER JOIN posts on likes.post_id = posts.id
        WHERE likes.post_id = ? ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1,$id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
    }
	//check like comment
	public function checkLikeComment($user_id, $comment_id){
		$query = "SELECT likes.id, likes.user_id, likes.comment_id
        FROM likes INNER JOIN users ON likes.user_id = users.id
        INNER JOIN comments ON likes.comment_id = comments.id
        WHERE likes.user_id = :user_id AND likes.comment_id = :comment_id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id',$user_id, PDO::PARAM_INT); // Assuming id is an integer
		$stmt->bindParam(':comment_id',$comment_id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
	}
    // add new Like post
    public function addNewLikes($id_users,$id_post){
        $query = "INSERT INTO likes(user_id, post_id) VALUES (:id_users, :id_post)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_users", $id_users, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":id_post", $id_post, PDO::PARAM_INT); // Assuming id is an integer
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
	// add new like comments
	public function addMewLikeByComments($id_users,$post_id,$comments_id){
		$query = "INSERT INTO likes(user_id,post_id, comment_id) VALUE(:id_users,:post_id,:comments_id)";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(":id_users", $id_users, PDO::PARAM_INT); // Assuming id is an integer
		$stmt->bindParam(":post_id", $post_id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":comments_id", $comments_id, PDO::PARAM_INT); // Assuming id is an integer
		if($stmt->execute()) {
            return true;
        }
        return false;
	}
	public function removeLikeComment($id_users, $comment_id){
		$query = "DELETE FROM likes WHERE likes.user_id = :user_id AND likes.comment_id =:comment_id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $id_users, PDO::PARAM_INT);
		$stmt->bindParam(':comment_id', $comment_id, PDO::PARAM_INT);
        if($stmt->execute()) {
            return true;
        }
        return false;
	}
    //delete likes
    public function removeNewLikes($id){
        $query = "DELETE FROM likes WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        if($stmt->execute()) {
            return true;
        }
        return false;
    }

	/**
	 * @return mixed
	 */
	public function getConn() {
		return $this->conn;
	}
	
	/**
	 * @param mixed $conn 
	 * @return self
	 */
	public function setConn($conn): self {
		$this->conn = $conn;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getId() {
		return $this->id;
	}
	
	/**
	 * @param mixed $id 
	 * @return self
	 */
	public function setId($id): self {
		$this->id = $id;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getUser_id() {
		return $this->user_id;
	}
	
	/**
	 * @param mixed $user_id 
	 * @return self
	 */
	public function setUser_id($user_id): self {
		$this->user_id = $user_id;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getPost_id() {
		return $this->post_id;
	}
	
	/**
	 * @param mixed $post_id 
	 * @return self
	 */
	public function setPost_id($post_id): self {
		$this->post_id = $post_id;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getId_paren_likes() {
		return $this->id_paren_likes;
	}
	
	/**
	 * @param mixed $id_paren_likes 
	 * @return self
	 */
	public function setId_paren_likes($id_paren_likes): self {
		$this->id_paren_likes = $id_paren_likes;
		return $this;
	}
}

?>