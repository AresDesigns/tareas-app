<?php

require './app-db.php';
require '../models/TaskModel.php';

$taskModel = new TaskModel($conn);

$tasks = $taskModel->getTasks();

if ($tasks) {
    $message = 'success';
    $data = array('message' => $message, 'tasks' => $tasks);
    echo json_encode($data);
} else {
    $message = 'error';
    $data = array('message' => $message);
    echo json_encode($data);
}

?>