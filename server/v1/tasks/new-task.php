<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, HEAD, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Allow: GET, POST, HEAD, OPTIONS");
require './app-db.php';
require '../models/TaskModel.php';

$_post = json_decode(file_get_contents('php://input'), true);

if (isset($_post['title_task']) && isset($_post['description_task'])) {
    $title = $_post['title_task'];
    $description = $_post['description_task'];
    date_default_timezone_set('Europe/Madrid');
    $date = date("Y-m-d");
    $userId = 1;
    $is_active = true;
    $boardId = 1;
    $listId = 1;
    $id = generateUniqueId($conn);

    $taskModel = new TaskModel($conn);

    if ($taskModel->createTask($id, $title, $description, $date, $userId, $is_active, $boardId, $listId)) {
        $message = 'success';
        $data = array(
            'id' => $id,
            'title_task' => $title,
            'description_task' => $description,
            'date_task' => $date,
            'user_id' => $userId,
            'is_active' => $is_active,
            'board_id' => $boardId,
            'list_id' => $listId
        );
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

function generateUniqueId($conn) {
    $id = 1;
    while (true) {
        $stmt = $conn->prepare("SELECT COUNT(*) FROM tasks WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if ($count == 0) {
            return $id;
        }

        $id++;
    }
}
?>

<?php
/*
<?php

    require './app-db.php';
    $_post = json_decode(file_get_contents('php://input'),true);
    
    $title = $_post['title'];
    $description = $_post['description'];
    date_default_timezone_set('Europe/Madrid');
    $date = date("Y-m-d");
    
    $stmt = $conn->prepare("INSERT INTO tasks (title_task, description_task, date_task) VALUES (:title_task, :description_task, :date_task)");
	$stmt->bindParam(':title_task', $title);
    $stmt->bindParam(':description_task', $description);
    $stmt->bindParam(':date_task', $date);
	
	if($stmt->execute()){
	    $message = 'success';
    	$data = array('message' => $message, 'title' => $title, 'description' => $description, 'date' => $date);
        echo json_encode($data);
	}else{
	    $message = 'error';
	    $data = array('message' => $message);
        echo json_encode($data);
	}
*/	
?>
