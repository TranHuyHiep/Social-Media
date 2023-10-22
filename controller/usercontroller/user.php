<?php
    include("controller/usercontroller/action.php");

    $action = isset($_GET['action']) ? $_GET['action'] : '';
    
    switch($action){
        case 'login':
            require_once 'controller/usercontroller/login.php'
            break;
        default:
            echo "Action is invalid!";
    }

?>