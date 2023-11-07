<?php
    class Comments{
        private $conn;
        private $id;
        private $user_id;
        private $post_id;
        private $parent_comment_id;
        private $content;
        private $created_at;
        private $updated_at;
        private $like_count;
        public function __construct($conn){
            $this->conn = $conn;
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
	public function getParent_comment_id() {
		return $this->parent_comment_id;
	}
	
	/**
	 * @param mixed $parent_comment_id 
	 * @return self
	 */
	public function setParent_comment_id($parent_comment_id): self {
		$this->parent_comment_id = $parent_comment_id;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getContent() {
		return $this->content;
	}
	
	/**
	 * @param mixed $content 
	 * @return self
	 */
	public function setContent($content): self {
		$this->content = $content;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getCreated_at() {
		return $this->created_at;
	}
	
	/**
	 * @param mixed $created_at 
	 * @return self
	 */
	public function setCreated_at($created_at): self {
		$this->created_at = $created_at;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getUpdated_at() {
		return $this->updated_at;
	}
	
	/**
	 * @param mixed $updated_at 
	 * @return self
	 */
	public function setUpdated_at($updated_at): self {
		$this->updated_at = $updated_at;
		return $this;
	}
	
	/**
	 * @return mixed
	 */
	public function getLike_count() {
		return $this->like_count;
	}
	
	/**
	 * @param mixed $like_count 
	 * @return self
	 */
	public function setLike_count($like_count): self {
		$this->like_count = $like_count;
		return $this;
	}

    public function read()
    {
        $query = "SELECT * FROM comments";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
    //danh sach comment theo bai id post
    public function getCommentsByIdPost($id){
        $query = "SELECT comments.id, comments.user_id, full_name, comments.content, comments.post_id,comments.like_count, users.avatar_url
        FROM users JOIN comments ON users.id = comments.user_id
        JOIN posts ON comments.post_id = posts.id
        WHERE comments.post_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1,$id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
    }

	public function checkCommentsByIdUser($id, $user_id){
        $query = "SELECT comments.id
        FROM users JOIN comments ON users.id = comments.user_id
        JOIN posts ON comments.post_id = posts.id
        WHERE comments.id = :id AND comments.user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id',$id, PDO::PARAM_INT); // Assuming id is an integer
		$stmt->bindParam(':user_id',$user_id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();
        return $stmt;
    }

    //add new comments post
    public function addNewComments($id_users,$id_post, $content){
        $query = "INSERT INTO comments(user_id, post_id, content, created_at,like_count ) VALUES (:id_users,:id_post,:content, now(),0)";
        //$query = "INSERT INTO likes(user_id, post_id) VALUES (:id_users, :id_post)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_users", $id_users, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":id_post", $id_post, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":content", $content, PDO::PARAM_STR); // Assuming id is an integer
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
	//update
	public function updateComments(){
		$query = "UPDATE comments SET content = :content, created_at = now(), updated_at = now() WHERE id = :id";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(':content', $this->content);
		$stmt->bindParam(':id', $this->id);
		if($stmt->execute()) {
            return true;
        }
        return false;
	}
    //Delete comments post.
    public function removeCommentsPost($id){
        $query = "DELETE FROM comments WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id, PDO::PARAM_INT);
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
	// Add comments vao comments
	public function AddNewCommentsInCommnets(){
		$query = "INSERT INTO comments(user_id,post_id,parent_comment_id,content,created_at,like_count) VALUES (:user_id,:post_id,:parent_comment_id,:content,now(),0)";
		$stmt = $this->conn->prepare($query);
		$stmt->bindParam(':user_id', $this->user_id);
		$stmt->bindParam(':post_id', $this->post_id);
		$stmt->bindParam(':parent_comment_id', $this->parent_comment_id);
		$stmt->bindParam(':content', $this->content);
		if($stmt->execute()) {
            return true;
        }
        return false;
	}
	// Update Comments.


}

?>