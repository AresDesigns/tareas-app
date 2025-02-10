<?php

require './app-db.php';
require '../models/TaskModel.php';

$_post = json_decode(file_get_contents('php://input'), true);

if (isset($_post['id']) && isset($_post['task_name'])) {
    $id = $_post['id'];
    $task_name = $_post['task_name'];

    $taskModel = new TaskModel($conn);

    if ($taskModel->updateTask($id, $task_name)) {
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