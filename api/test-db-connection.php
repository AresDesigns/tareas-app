<?php

require './app-db.php';

try {
    $stmt = $conn->query("SELECT 1");
    if ($stmt) {
        echo "Conexión a la base de datos exitosa.";
    } else {
        echo "Error al ejecutar la consulta.";
    }
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

?>