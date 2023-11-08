<?php
class Messengers
{
    private $conn;
    private $user_from;
    private $user_to;
    private $content;
    private $create_at;

    /**
     * @param $conn
     */
    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    /**
     * @return mixed
     */
    public function getUserFrom()
    {
        return $this->user_from;
    }

    /**
     * @param mixed $user_from
     */
    public function setUserFrom($user_from)
    {
        $this->user_from = $user_from;
    }

    /**
     * @return mixed
     */
    public function getUserTo()
    {
        return $this->user_to;
    }

    /**
     * @param mixed $user_to
     */
    public function setUserTo($user_to)
    {
        $this->user_to = $user_to;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return mixed
     */
    public function getCreateAt()
    {
        return $this->create_at;
    }

    /**
     * @param mixed $create_at
     */
    public function setCreateAt($create_at)
    {
        $this->create_at = $create_at;
    }

    public function getMessageToUser($from, $to)
    {
        $query = "SELECT * 
                        FROM messengers
                        WHERE (user_from = :from AND user_to = :to) OR (user_from = :to AND user_to = :from)
                        ORDER BY created_at asc";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":from", $from, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":to", $to, PDO::PARAM_INT); // Assuming id is an integer

        $stmt->execute();

        return $stmt;
    }

    public function sendMessage($from, $to, $content)
    {
        $query = "INSERT INTO messengers (user_from, user_to, content, created_at) VALUES (:from, :to, :content, now())";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":from", $from, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":to", $to, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->bindParam(":content", $content, PDO::PARAM_STR); // Assuming id is an integer

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getAllMessageByUser($user_id)
    {
        $query = "select * from 
                (select follwing as user_id
                from userrelas
                where status = 2 and follower = :id
                union
                select follower as user_id
                from userrelas
                where status = 2 and follwing = :id) as friend join users on user_id = users.id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $user_id, PDO::PARAM_INT); // Assuming id is an integer
        $stmt->execute();

        return $stmt;
    }
}
