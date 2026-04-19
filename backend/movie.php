<?php
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "db_hrd");

if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal"]));
}

$result = $conn->query("SELECT * FROM movies");

$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
?>