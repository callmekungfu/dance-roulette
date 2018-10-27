<?php
    $servername = "localhost";
    $username = "wheel";
    $password = "123456";
    $dbname = "wheeltest";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM video_collection WHERE 1";
    $myArray = array();
    if ($result = $conn->query($sql)) {
        while($row = $result->fetch_array(MYSQL_ASSOC)) {
                    $myArray[] = $row;
            }
        echo json_encode($myArray);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
?>

