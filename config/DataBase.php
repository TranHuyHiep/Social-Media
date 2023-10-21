<?php

class DataBase{
    private $servername = "localhost:3306";
    private $username = "root";
    private $password = "123123";
    private $conn;
    public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=$this->servername;dbname=socialmedia", $this->username, $this->password);
            // set the PDO error mode to exception
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
        return $this->conn;
    }

}