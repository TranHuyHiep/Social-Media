<?php
    class Notifications{
        private $conn;
        public function __construct($conn){
            $this->conn = $conn;
        }
        public function getNotificationsForUser($own_id) {
            $query = "SELECT U.avatar_url, N.content, N.created_at 
                      FROM notifications N
                      INNER JOIN users U ON U.id = N.user_id 
                      WHERE N.own_id = :own_id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':own_id', $own_id, PDO::PARAM_INT);
            $stmt->execute();
        
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
    }
?>