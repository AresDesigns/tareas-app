<?php

$server = 'localhost';
$username = ' root';
$password = '';
$database = 'taskboarddb ';
// Verificar conexión
if (isset($_GET['check']) && $_GET['check'] === 'connection') {
    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        echo json_encode([
            "status" => "success",
            "message" => "Conexión establecida"
        ]);
    } catch(PDOException $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Error de conexión: " . $e->getMessage()
        ]);
    }
    exit;
}

?>