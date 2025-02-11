<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Allow: GET, POST, HEAD, OPTIONS");
require './app-db.php';
require '../models/TaskModel.php';

$taskModel = new TaskModel($conn);

$tasks = $taskModel->getTasks();

if ($tasks) {
    $message = 'success';
    $data = array('message' => $message, 'tasks' => $tasks);
    echo json_encode($data);
    <console class="log">"si"</console>
} else {
    $message = 'error';
    $data = array('message' => $message);
    echo json_encode($data);
}

?>