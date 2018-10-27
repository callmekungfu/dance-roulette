<?php
    $servername = "localhost";
    $username = "wheel";
    $password = "123456";
    $dbname = "wheeltest";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $title = $conn->real_escape_string($_POST['title']);
    $path = $conn->real_escape_string($_POST['id']);
    $sql = "INSERT INTO video_collection (title, path, weight) VALUES ('$title', '$path', 1)";
    if ($conn->query($sql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
    $conn->close();
?>