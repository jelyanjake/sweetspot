<?php

session_start();
include('func/connection.php');
include('func/status.php');
include('func/validate.php');
$con = OpenCon();

if (!isset($_GET['id']) || empty($_GET['id'])) {
    $_SESSION['error'] = "<strong>&#10071; Invalid user ID.</strong>";
    header("Location: user.php");
    exit;
}

$userid = mysqli_real_escape_string($con, $_GET['id']);
$sql = "SELECT * FROM users WHERE id = '$userid'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) === 0) {
    $_SESSION['error'] = "<strong>&#10071; User not found.</strong>";
    header("Location: user.php");
    exit;
}

$user = mysqli_fetch_assoc($result);

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['delete'])) {
    $delete_sql = "DELETE FROM users WHERE id = '$userid'";
    if (mysqli_query($con, $delete_sql)) {
        $_SESSION['success'] = "<strong>&#10060; User Deleted Successfully!</strong>";
        header("Location: user.php");
        exit;
    } else {
        $_SESSION['error'] = "Error deleting user: " . mysqli_error($con);
        header("Location: user.php");
        exit;
    }
}

CloseCon($con);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style3.css">
    <title>Blossom IS - Deletion</title>
    <link rel="icon" type="image/x-icon" href="img/icon.ico">
    <style>
        .custom {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 200px;
        }

        .container {
            display: flex;
            justify-content: center;
        }
    </style>
</head>
<body>
<main>
    <br><br>
    <div class="contentinsidebg" style="border-radius: 25px;">
        <h2 style="text-align:center">User Deletion &#9940;</h2>
        <hr>
        <h4 style="text-align:center">Are you sure you want to delete <strong>User #<?php echo htmlspecialchars($userid); ?></strong> - <strong><?php echo htmlspecialchars(ucwords($user['user'])); ?></strong>?</h4>
        <p style="text-align:center">Warning: This action cannot be undone!</p>
        <div class="container">
            <form method="POST" action="">
                <input class="custom" type="submit" name="delete" value="Delete">
            </form>
        </div>
        <a href="user.php"><button type="button">Cancel</button></a>
    </div>
</main>
</body>
</html>
