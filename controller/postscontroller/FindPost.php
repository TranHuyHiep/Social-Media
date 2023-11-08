<?php
    header('Access-Control-Allow-Origin:*');
    header('Content-Type: application/json');

    include_once('../../config/DataBase.php');
    include_once('../../model/Post.php');

    if(isset($_GET['name'])) {
        $name = isset($_GET['name']) ? $_GET['name'] : die();

        $db = new DataBase();
        $connect = $db->connect();
    
        $posts = new Posts($connect);
    
        $read = $posts->findByName($name);
    
        $num = $read->rowCount();
        $list = [];
        $list['length'] = $num;
        if($num > 0) {
            $list['data'] = [];
            
            while($row = $read->fetch(PDO::FETCH_ASSOC)) {
    
                extract($row);
    
                $posts = array(
                    'id' => $id,
                    'user_id' => $user_id,
                    'full_name' => $full_name,
                    'avatar_url'=> $avatar_url,
                    'like_count' =>$like_count,
                    'created_at' => $created_at,
                    'updated_at' => $updated_at,
                    'content' => $content,
                    'access_modifier' => $access_modifier
                   
                );
                array_push($list['data'], $posts);
            }
        }
        echo json_encode($list);
    }

    

?>