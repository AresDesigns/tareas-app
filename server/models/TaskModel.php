<?php

class TaskModel {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getTasks() {
        $stmt = $this->conn->prepare("SELECT * FROM tasks ORDER BY id DESC");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateTask($id, $task_name) {
        $stmt = $this->conn->prepare("UPDATE tasks SET title_task = :title_task, description_task = :description_task WHERE id = :id");
        $stmt->bindParam(':title_task', $task_name);
        $stmt->bindParam(':title_task', $task_name);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function createTask($id, $title, $description, $date, $userId, $is_active, $boardId, $listId) {
        $stmt = $this->conn->prepare("INSERT INTO tasks (id, title_task, description_task, date_task, user_id, is_active, board_id, list_id) VALUES (:id, :title_task, :description_task, :date_task, :user_id, :is_active, :board_id, :list_id)");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':title_task', $title);
        $stmt->bindParam(':description_task', $description);
        $stmt->bindParam(':date_task', $date);
        $stmt->bindParam(':user_id', $userId);
        $stmt->bindParam(':is_active', $is_active);
        $stmt->bindParam(':board_id', $boardId);
        $stmt->bindParam(':list_id', $listId);
        return $stmt->execute();
    }

    public function deleteTask($id) {
        $stmt = $this->conn->prepare("DELETE FROM tasks WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}

?>