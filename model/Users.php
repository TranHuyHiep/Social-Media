<?php

class users {
    private $conn;

    private $id;
    private $full_name;
    private $email;
    private $avatar_url;
    private $password;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getFullName()
    {
        return $this->full_name;
    }

    /**
     * @param mixed $full_name
     */
    public function setFullName($full_name)
    {
        $this->full_name = $full_name;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getAvatarUrl()
    {
        return $this->avatar_url;
    }

    /**
     * @param mixed $avatar_url
     */
    public function setAvatarUrl($avatar_url)
    {
        $this->avatar_url = $avatar_url;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM users";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function show($id) {
        $query = "SELECT * FROM users WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->full_name = $row['full_name'];
        $this->email = $row['email'];
        $this->avatar_url = $row['avatar_url'];
        $this->password = $row['password'];
    }

    public function recommenFriend($id)
    {
        $query = "SELECT id, full_name, email, avatar_url
                    FROM users
                    WHERE id NOT IN (
                        SELECT follwing
                        FROM userrelas
                        WHERE follower = :id
                        UNION
                        SELECT follower
                        FROM userrelas
                        WHERE follwing = :id
                        UNION SELECT :id)
                        LIMIT 10;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();

        return $stmt;
    }
}