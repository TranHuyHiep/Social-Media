<?php
    class UserInfo{
        private $id, $is_active, $study_at, $working_at, $favorites, $other_info, $date_of_birth, $create_at, $conn;
       
       
        /**
         * @param $conn
         */
        public function __construct($conn){
            $this->conn = $conn;
        }
        
        public function getId() {
            return $this->id;
        }
    
        public function setId($id) {
            $this->id = $id;
        }
    
        public function getIsActive() {
            return $this->is_active;
        }
    
        public function setIsActive($is_active) {
            $this->is_active = $is_active;
        }
    
        public function getStudyAt() {
            return $this->study_at;
        }
    
        public function setStudyAt($study_at) {
            $this->study_at = $study_at;
        }
    
        public function getWorkingAt() {
            return $this->working_at;
        }
    
        public function setWorkingAt($working_at) {
            $this->working_at = $working_at;
        }
    
        public function getFavorites() {
            return $this->favorites;
        }
    
        public function setFavorites($favorites) {
            $this->favorites = $favorites;
        }
    
        public function getOtherInfo() {
            return $this->other_info;
        }
    
        public function setOtherInfo($other_info) {
            $this->other_info = $other_info;
        }
    
        public function getDateOfBirth() {
            return $this->date_of_birth;
        }
    
        public function setDateOfBirth($date_of_birth) {
            $this->date_of_birth = $date_of_birth;
        }
    
        public function getCreatedAt() {
            return $this->create_at;
        }
    
        public function setCreatedAt($create_at) {
            $this->create_at = $create_at;
        }
        public function getUserInfoByUserId($user_id) {
            $query = "SELECT * FROM UserInfo WHERE id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $user_id, PDO::PARAM_INT);
            $stmt->execute();
        
            if ($stmt->rowCount() > 0) {
                return $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                return null; // Trả về null nếu không tìm thấy UserInfo
            }
        }
        public function updateUserInfo($user_id, $study_at, $working_at, $favorites, $other_info, $date_of_birth) {
            $query = "UPDATE UserInfo
                      SET study_at = :study_at, working_at = :working_at,
                          favorites = :favorites, other_info = :other_info, date_of_birth = :date_of_birth
                      WHERE id = :user_id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
           // $stmt->bindParam(':is_active', $is_active, PDO::PARAM_INT);
            $stmt->bindParam(':study_at', $study_at, PDO::PARAM_STR);
            $stmt->bindParam(':working_at', $working_at, PDO::PARAM_STR);
            $stmt->bindParam(':favorites', $favorites, PDO::PARAM_STR);
            $stmt->bindParam(':other_info', $other_info, PDO::PARAM_STR);
            $stmt->bindParam(':date_of_birth', $date_of_birth, PDO::PARAM_STR);
        
            if ($stmt->execute()) {
                // Cập nhật thành công
                return true;
            } else {
                // Cập nhật thất bại
                return false;
            }
        }

public function chartUserAndPostsWeekly() {
    // Lấy ngày đầu tiên và cuối cùng của tuần hiện tại
    $startOfWeek = date('Y-m-d', strtotime('monday this week'));
    $endOfWeek = date('Y-m-d', strtotime('sunday this week'));

    $query = "SELECT 
                DATE(u.created_at) as date,
                COUNT(DISTINCT u.id) as user_count,
                COUNT(p.id) as post_count
              FROM UserInfo u
              LEFT JOIN Posts p ON u.id = p.user_id
              WHERE u.created_at BETWEEN :startOfWeek AND :endOfWeek
              GROUP BY DATE(u.created_at)";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':startOfWeek', $startOfWeek);
    $stmt->bindParam(':endOfWeek', $endOfWeek);
    $stmt->execute();

    // Lấy dữ liệu từ kết quả truy vấn
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Kiểm tra xem có dữ liệu trả về hay không
    if ($result) {
        // Chuyển định dạng dữ liệu và trả về cho API
        return array('success' => true, 'data' => $result);
    } else {
        // Không có dữ liệu trả về
        return array('success' => false, 'message' => 'No data found.');
    }
}

    
    
        
    }
?>