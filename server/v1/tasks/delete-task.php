<?php

require './app-db.php';
require '../models/TaskModel.php';

$_post = json_decode(file_get_contents('php://input'), true);

if (isset($_post['id'])) {
    $id = $_post['id'];

    $taskModel = new TaskModel($conn);

    if ($taskModel->deleteTask($id)) {
        $message = 'success';
        $data = array('message' => $message);
        echo json_encode($data);
    } else {
        $message = 'error';
        $data = array('message' => $message);
        echo json_encode($data);
    }
} else {
    $message = 'invalid input';
    $data = array('message' => $message);
    echo json_encode($data);
}

?>