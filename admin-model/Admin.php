<?php
    class Admin{
        private $conn;
        public function __construct($conn){
            $this->conn = $conn;
        }
        public function signin($email,$password){
            $query = "SELECT * FROM admin WHERE email = ? AND password = ? LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $email, PDO::PARAM_STR);
            $stmt->bindParam(2, $password, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt;
            
            
        }
    }
       

?>