<?php
    class UserRela {
        private $conn;
        private $follower;
        private $following;
        private $status;

        public function __construct($db)
        {
            $this->conn = $db;
        }

        /**
         * @return mixed
         */
        public function getFollower()
        {
            return $this->follower;
        }

        /**
         * @param mixed $follower
         */
        public function setFollower($follower)
        {
            $this->follower = $follower;
        }

        /**
         * @return mixed
         */
        public function getFollowing()
        {
            return $this->following;
        }

        /**
         * @param mixed $following
         */
        public function setFollowing($following)
        {
            $this->following = $following;
        }

        /**
         * @return mixed
         */
        public function getStatus()
        {
            return $this->status;
        }

        /**
         * @param mixed $status
         */
        public function setStatus($status)
        {
            $this->status = $status;
        }

        public function getById($id) {
            $query = "SELECT full_name, email, avatar_url, date_of_birth, created_at, favorites, working_at, other_info, study_at
                        FROM userrelas JOIN users ON users.id = userrelas.follwing
                            JOIN userinfo ON userinfo.id = users.id
                        WHERE follower = :id AND status = 2
                        UNION
                        SELECT full_name, email, avatar_url, date_of_birth, created_at, favorites, working_at, other_info, study_at
                        FROM userrelas JOIN users ON users.id = userrelas.follower
                            JOIN userinfo ON userinfo.id = users.id
                        WHERE follwing = :id AND status = 2;";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT); // Assuming id is an integer
            $stmt->execute();

            return $stmt;
        }

        public function addFriend($follower, $following) {
            $query = "INSERT INTO UserRelas (follower, follwing, status) VALUES (?, ?, 1)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $follower, PDO::PARAM_INT); // Assuming id is an integer
            $stmt->bindParam(2, $following, PDO::PARAM_INT); // Assuming id is an integer
            if($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function acceptFriend($follower, $following) {
            $query = "UPDATE UserRelas SET status = 2 WHERE follower = ? AND follwing = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $follower, PDO::PARAM_INT); // Assuming id is an integer
            $stmt->bindParam(2, $following, PDO::PARAM_INT); // Assuming id is an integer
            if($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }

        public function rejectFriend($follower, $following) {
            $query = "DELETE FROM userrelas WHERE follower = ? AND follwing = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $follower, PDO::PARAM_INT); // Assuming id is an integer
            $stmt->bindParam(2, $following, PDO::PARAM_INT); // Assuming id is an integer
            $stmt->execute();
            return $stmt;
        }
    }