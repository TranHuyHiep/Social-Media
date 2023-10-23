<?php
    class UserInfo{
        private $id, $is_active, $study_at, $working_at, $favorites, $other_info, $date_of_birth, $create_at;
       
       
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
    }
?>