<?php
    class Notifications{
        private $conn;
        public function __construct($conn){
            $this->conn = $conn;
        }
        public function getNotificationsForUser($own_id) {
            $query = "SELECT *
                      FROM notifications N
                      INNER JOIN users U ON U.id = N.user_id 
                      WHERE N.own_id = :own_id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':own_id', $own_id, PDO::PARAM_INT);
            $stmt->execute();
        
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        public function getPostbyID($post_id) {
            $query = "SELECT * FROM Users JOIN Posts ON Users.id=Posts.user_id WHERE Posts.user_id=? ORDER BY created_at DESC;";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $post_id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt;
        }
    }
?>