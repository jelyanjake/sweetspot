<?php

session_start();
include('func/connection.php');
include('func/status.php');
include('func/validate.php');
$con = OpenCon();

$userid = isset($_GET['id']) ? mysqli_real_escape_string($con, $_GET['id']) : '';

// Fetch user details
$sql = "SELECT * FROM users WHERE id = '$userid'";
$result = mysqli_query($con, $sql);
$user = mysqli_fetch_assoc($result);

if (!$user) {
    $_SESSION['error'] = "<strong>&#10071; User not found.</strong>";
    header("Location: user.php");
    exit;
}

// Handle the user level update form
if (isset($_POST['update_user'])) {
    $new_level = (int)$_POST['level'];

    // Update the user level in the database
    $sql_update = "UPDATE users SET level = '$new_level' WHERE id = '$userid'";
    if (mysqli_query($con, $sql_update)) {
        $_SESSION['success'] = "<strong>&#127881; User level updated successfully!</strong>";
        header("Location: user.php");
        exit;
    } else {
        $_SESSION['error'] = "<strong>&#10071; Error updating user level.</strong>";
        header("Location: edituser.php?id=$userid");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style2.css">
    <title>Blossom IS - Edit User Level</title>
    <link rel="icon" type="image/x-icon" href="img/icon.ico">
</head>
<body>
<main>
    <br>
    <br>
    <div class="contentinsidebg" style="border-radius: 25px;">
        <h2 style="text-align:center">Editing User #<?php echo $userid; ?> &#128190;</h2>
        <hr>

        <?php
            if (isset($_SESSION['error'])) {
                echo "<p style='color:#ff9800;text-align:center'>" . $_SESSION['error'] . "</p>";
                unset($_SESSION['error']); // Clear the error message
            }

            if (isset($_SESSION['success'])) {
                echo "<p style='color:#55f477;text-align:center'>" . $_SESSION['success'] . "</p>";
                unset($_SESSION['success']); // Clear the success message
            }
        ?>

        <?php if (isset($user)): ?>
            <form method="POST" action="">
                <div>
                    <label for="userid">User ID:</label>
                    <input type="text" id="userid" name="userid" value="<?php echo htmlspecialchars($user['id']); ?>" readonly>
                </div>
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($user['user']); ?>" readonly>
                </div>
                <div>
                    <label for="level">User Level:</label>
                    <select id="level" name="level">
                        <option value="1" <?php echo ($user['level'] == 1 ? 'selected' : ''); ?>>Regular User</option>
                        <option value="2" <?php echo ($user['level'] == 2 ? 'selected' : ''); ?>>Admin</option>
                    </select>
                </div>
                <div>
                    <label>&nbsp;</label>
                    <input type="submit" name="update_user" value="Update User">
                </div>
            </form>
        <?php else: ?>
            <p>User details are not available.</p>
        <?php endif; ?>
        <br><br>
        <a href="user.php">
            <button>Cancel</button>
        </a>
    </div>
</main>
</body>
</html>

<?php
CloseCon($con);
?>