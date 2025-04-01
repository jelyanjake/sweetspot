<?php    

session_start();
include('func/connection.php');  
$con = OpenCon();

// Include the Auth class
include('func/auth.php');

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    try {
        $auth = new Auth($con); // Create an Auth object
        if ($auth->login($username, $password)) {
            header("Location: dashboard");
            exit();
        }
    } catch (Exception $e) {
        $_SESSION['error'] = "<strong>&#10071; " . $e->getMessage() . "</strong>";
        header("Location: index");
        exit();
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
    <title>Sweet Spot - Welcome</title>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico">
</head>
<body>
<main>
    <br>
    <br>
    <br>
    <div class="contentinsidebg">

    <!-- Mobile Restriction Message -->
    <div id="mobile-message" style="display:none; text-align:center">
        <h2>Looks like you're on mobile &#128241;</h2>
        <p>Try our app! pls pls &#128591;&#128591;</p>
        <p><a href="https://play.google.com/store/apps/details?id=com.kurogame.wutheringwaves.global&pcampaignid=web_share" target="_blank" rel="external"><img src="img/gplay.png" style="width:30%;height:30%"></a></p>
    </div>

    <div id="login-form">
    <form action="index.php" method="post">
        <h1>Welcome to Blossom IS &#127800;</h1>
        <br>
        <?php
        if (isset($_SESSION['error'])) {
            echo "<p style='color:#ff9800;text-align:center'>" . $_SESSION['error'] . "</p>";
            unset($_SESSION['error']);
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
        <br>
        <button type="submit">Login</button>
    </form>
    <footer><p style="text-align:center">Don't have an account? <a href="register">Register</p></footer>
    </div>
    </div>
</main>

<!-- JavaScript for Device Detection -->
<script>
    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }

    document.addEventListener("DOMContentLoaded", function() {
        if (isMobileDevice()) {
            // Show the mobile restriction message
            document.getElementById("mobile-message").style.display = "block";
            // Hide the login form
            document.getElementById("login-form").style.display = "none";
        }
    });
</script>

</body>
</html>