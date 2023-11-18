<?php
    class Likes{
        private $conn;
        private $id;
        private $user_id;
        private $post_id;

		private $comment_id;

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
    public function getLikesByIdPost(){
        $query = "SELECT likes.id, likes.user_id, likes.post_id
        FROM likes INNER JOIN users ON likes.user_id = users.id
        INNER JOIN posts on likes.post_id = posts.id
        WHERE likes.post_id = :id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam('id', $this->id); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
    }
	//check like comment
	public function checkLikeComment(){
		$query = "SELECT likes.id, likes.user_id, likes.comment_id
        FROM likes INNER JOIN users ON likes.user_id = users.id
        INNER JOIN comments ON likes.comment_id = comments.id
        WHERE likes.user_id = :user_id AND likes.comment_id = :comment_id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id',$this->user_id); // Assuming id is an integer
		$stmt->bindParam(':comment_id', $this->comment_id); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
	}
	public function checkLikedPost(){
		$query = "SELECT likes.id, likes.user_id, likes.post_id
        FROM likes INNER JOIN users ON likes.user_id = users.id
		INNER JOIN posts on likes.post_id = posts.id
        WHERE likes.user_id = :user_id AND likes.post_id = :post_id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id',$this->user_id); // Assuming id is an integer
		$stmt->bindParam(':post_id',$this->post_id); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
	}
    // add new Like post
    public function addNewLikes(){
        $query = "INSERT INTO likes(user_id, post_id) VALUES (:id_users, :id_post)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_users", $this->user_id); // Assuming id is an integer
        $stmt->bindParam(":id_post", $this->post_id); // Assuming id is an integer
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
	// add new like comments
	public function addMewLikeByComments(){
		$query = "INSERT INTO likes(user_id,comment_id) VALUE(:id_users,:comments_id)";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(":id_users", $this->user_id); // Assuming id is an integer
		//$stmt->bindParam(":post_id", $post_id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":comments_id",$this->comment_id); // Assuming id is an integer
		if($stmt->execute()) {
            return true;
        }
        return false;
	}
	public function removeLikeComment(){
		$query = "DELETE FROM likes WHERE likes.user_id = :user_id AND likes.comment_id =:comment_id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $this->user_id);
		$stmt->bindParam(':comment_id', $this->comment_id);
        if($stmt->execute()) {
            return true;
        }
        return false;
	}
    //delete likes
    public function removeNewLikes(){
        $query = "DELETE FROM likes WHERE likes.user_id = :user_id AND likes.post_id =:post_id ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $this->user_id);
		$stmt->bindParam(':post_id', $this->post_id);
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
	public function getComment_id() {
		return $this->comment_id;
	}
	/**
	 * @param mixed $comment_id
	 * @return self
	 */
	public function setComment_id($comment_id): self {
		$this->comment_id = $comment_id;
		return $this;
	}
}

?>