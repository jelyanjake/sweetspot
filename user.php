<?php

session_start();
include('func/connection.php');
include('func/status.php');
$con = OpenCon();

$currentusername = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
$currentlevel = isset($_SESSION['level']) ? $_SESSION['level'] : 1;
if ($currentlevel == 2) {
    $role = "Admin";
} else {
    $role = "User";
}

if (isset($_POST['username']) && $currentlevel == 2) {
    $username = mysqli_real_escape_string($con, $_POST['username']);
    $check_user_query = "SELECT * FROM users WHERE user = '$username'";
    $check_user_result = mysqli_query($con, $check_user_query);
    
    if (mysqli_num_rows($check_user_result) > 0) {
        $_SESSION['error'] = "<strong>&#10071; Username already taken.</strong>";
        header("Location: user.php");
        exit;
    } else {
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $level = mysqli_real_escape_string($con, $_POST['level']);
        $sql = "INSERT INTO users (`user`, `password`, `level`) VALUES ('$username', '$password', '$level')";

        if (mysqli_query($con, $sql)) {
            $_SESSION['success'] = "<strong>&#127881; User added successfully!</strong>";
            header("Location: user.php");
            exit();
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($con);
        }
    }
}

if ($currentlevel == 2) {
    $searchTerm = isset($_GET['search']) ? mysqli_real_escape_string($con, $_GET['search']) : '';

    if (!empty($searchTerm)) {
        $sql = "SELECT id, `user`, `level` FROM users WHERE `user` LIKE '%$searchTerm%'";
    }
    else {
        $sql = "SELECT id, `user`, `level` FROM users";
    }

    $result = mysqli_query($con, $sql);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style2.css">
    <title>Blossom IS - Users</title>
    <link rel="icon" type="image/x-icon" href="img/icon.ico">
    <style>
        .csearch > input, .csearch > button {
            width:200px
        }

        .csearch {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
<main>
    <div class="contentinsidebg" style="border-radius: 25px;">
        <p><?php echo "<strong>[$role]</strong>"?>&nbsp;Welcome, <?php echo htmlspecialchars(ucwords($currentusername));?>!</p>
        <div class="navbar">
            <div class="logo">
                &#127800; Blossom IS
            </div>
            <div class="nav-container">
                <div class="nav-links">
                    <a href="dashboard.php"><button>Inventory</button></a>
                    <a href="user.php"><button>Users</button></a>
                    <a href="stock.php"><button>Stocks</button></a>
                    <a href="report.php"><button>Report</button></a>
                </div>
            </div>
        </div>
        <div class="container">

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

        <?php if ($currentlevel == 2): ?>
            <h2 style="text-align:center">User Management Panel [Admin]</h2>
            <form method="POST" action="">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div>
                    <label for="level">User Level:</label>
                    <select id="level" name="level">
                        <option value="1">Regular User</option>
                        <option value="2">Admin</option>
                    </select>
                </div>
                <div>
                    <label>&nbsp;</label>
                    <input name="addb" type="submit" value="Add User">
                </div>
            </form>
            <br>
            <hr>
            <h3 style="text-align:center;">User List</h3>
            <form class="csearch" action="user.php" method="GET">
                <input type="text" name="search" placeholder="Search by username" value="<?php echo isset($_GET['search']) ? $_GET['search'] : ''; ?>">
                <button type="submit">Search &#128269;</button>
            </form>
            <br>
            <table>
                <div class="sc">
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>User Level</th>
                    <th>&nbsp;</th>
                </tr>

                <?php
                if (mysqli_num_rows($result) > 0) {
                    while($row = mysqli_fetch_assoc($result)) {
                        echo "<tr>
                                <td>" . $row['id'] . "</td>
                                <td>" . ucwords($row['user']) . "</td>
                                <td>" . ($row['level'] == 2 ? '&#128110 Admin' : 'Regular User') . "</td>
                                <td>
                                <a href='edituser.php?id=" . $row['id'] . "'><button>Edit Level</button></a>
                                <a href='confirmdeleteusr.php?id=" . $row['id'] . "'><button name='Delete'>Delete</button></a>
                                </td>
                              </tr>";
                    }
                }
                else {
                    echo "<tr><td colspan='4'>No users found</td></tr>";
                }
                ?>

                </div>
            </table>

            <?php else: ?>
                <br>
                <p style="text-align:center">&#128274; You do not have permission to view this page.</p>
            <?php endif; ?>

        </div>
        <br>
        <br>
        <br>
        <a href="func/logout.php"><button>Log out</button></a>
    </div>
</main>
</body>
</html>

<?php
CloseCon($con);
?>
