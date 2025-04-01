<?php

session_start();
include('func/connection.php');
$con = OpenCon();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($con, $_POST['username']);
    $password = mysqli_real_escape_string($con, $_POST['password']);
    $confirm_password = mysqli_real_escape_string($con, $_POST['confirm_password']);

    // Check if passwords match
    if ($password !== $confirm_password) {
        $_SESSION['error'] = "<strong>&#10071; Passwords do not match.</strong>";
        header("Location: register");
        exit;
    }

    $sql = "SELECT * FROM users WHERE user = '$username'";
    $result = mysqli_query($con, $sql);

    if (mysqli_num_rows($result) > 0) {
        $_SESSION['error'] = "<strong>&#10071; Username already taken.</strong>";
        header("Location: register");
        exit;
    }
    
    else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (user, password, level) VALUES ('$username', '$hashed_password', 1)";
            
        if (mysqli_query($con, $sql)) {
            $_SESSION['success'] = "<strong>&#127881; Registration successful! Please log in.</strong>";
            header("Location: register");
            exit;
        }
        
        else {
            $_SESSION['error'] = "<strong>&#10071; Error registering user. Please try again.</strong>";
            header("Location: register");
            exit;
        }
    }
}

CloseCon($con);
?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Blossom IS - Register</title>
    <link rel="icon" type="image/x-icon" href="img/icon.ico">
</head>
<body>
<main>
    <br>
    <div class="contentinsidebg" style="border-radius: 25px;">
    <form action="register.php" method="post">
        <h1>Create a New Account &#128221;</h1>
        <br>
        <?php
        if (isset($_SESSION['error'])) {
            echo "<p style='color:#ff9800;text-align:center'>" . $_SESSION['error'] . "</p>";
            unset($_SESSION['error']);
        }
        if (isset($_SESSION['success'])) {
            echo "<p style='color:#55f477;text-align:center'>" . $_SESSION['success'] . "</p>";
            unset($_SESSION['success']);
        }
        ?>
        <div>
            <label for="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Enter username" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Enter password" required>
        </div>
        <div>
            <label for="confirm_password">Confirm Password:</label>
            <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm password" required>
        </div>
        <br>
        <button type="submit">Register</button>
    </form>
    <footer>
        <p style="text-align:center">Already have an account? <a href="index">Login</a></p>
    </footer>
    </div>
</main>
</body>
</html>