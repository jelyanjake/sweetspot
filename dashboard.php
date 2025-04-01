<?php

session_start();
include('func/connection.php');
include('func/status.php');
include('func/validate.php');
$con = OpenCon();

$search_query = "";
if (isset($_POST['search'])) {
    $search_query = mysqli_real_escape_string($con, $_POST['search_query']);
}

$sql = "SELECT productid, productname, productstocks FROM products";
if (!empty($search_query)) {
    $sql .= " WHERE productid LIKE '%$search_query%' OR productname LIKE '%$search_query%' ORDER BY productname ASC";
}
$result = mysqli_query($con, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style2.css">
    <title>Blossom IS - Dashboard</title>
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
        
        table {
            border: 1px solid #fff;
            border-radius: 25px;
        }
    </style>
</head>
<body>
<main>
    <div class="contentinsidebg" style="border-radius: 25px;">
    <p><?php echo "<strong>[$role]</strong>"?>&nbsp;Welcome, <?php echo htmlspecialchars(ucwords($username));?>!</p>
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
        <h2 style="text-align:center">Product List</h2>
        <form class="csearch" method="POST" action="">
            <input type="text" name="search_query" placeholder="Search by ID or Name" value="<?php echo htmlspecialchars($search_query); ?>">
            <button type="submit" name="search">Search &#128269;</button>
        </form>
        <br>
        <table>
            <tr>
                <th>Product ID</th>
                <th>Product Name &#128230;</th>
                <th>Quantity</th>
            </tr>
            <?php
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    echo "<tr>
                            <td>" . htmlspecialchars($row['productid']) . "</td>
                            <td>" . htmlspecialchars($row['productname']) . "</td>
                            <td>" . htmlspecialchars($row['productstocks']) . "</td>
                          </tr>";
                }
            } else {
                echo "<tr><td colspan='3'>No products found</td></tr>";
            }
            ?>
        </table>
        </div>
        <br>
        <br>
        <br>
        <a href="func/logout.php">
            <button>Log out</button>
        </a>
    </div>
</main>
</body>
</html>

<?php
CloseCon($con);
?>
