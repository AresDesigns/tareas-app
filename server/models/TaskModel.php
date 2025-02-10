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
        $stmt = $this->conn->prepare("UPDATE tasks SET task_name = :task_name WHERE id = :id");
        $stmt->bindParam(':task_name', $task_name);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function createTask($title, $description, $date) {
        $stmt = $this->conn->prepare("INSERT INTO tasks (title_task, description_task, date_task) VALUES (:title_task, :description_task, :date_task)");
        $stmt->bindParam(':title_task', $title);
        $stmt->bindParam(':description_task', $description);
        $stmt->bindParam(':date_task', $date);
        return $stmt->execute();
    }

    public function deleteTask($id) {
        $stmt = $this->conn->prepare("DELETE FROM tasks WHERE id = :id");
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}

?>