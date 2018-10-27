<?php
    $servername = "localhost";
    $username = "wheel";
    $password = "123456";
    $dbname = "wheeltest";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $id = $_POST['id'];
    $sql = "DELETE FROM video_collection WHERE path='$id'";
    if ($conn->query($sql) === TRUE) {
                echo "Record Removed";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
    $conn->close();
?>
