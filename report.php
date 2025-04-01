<?php

session_start();
include('func/connection.php');
include('func/status.php');
include('func/validate.php');
$con = OpenCon();

$sql_report = "SELECT sm.productid, p.productname, sm.stock_change, sm.movement_date
               FROM stock_movements sm
               JOIN products p ON sm.productid = p.productid
               ORDER BY sm.movement_date DESC";

$result_report = mysqli_query($con, $sql_report);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style2.css">
    <title>Blossom IS - Reports</title>
    <link rel="icon" type="image/x-icon" href="img/icon.ico">
    <style>
        table {
            border: 1px solid #fff;
            border-radius: 25px;
        }

        .print {
            display: flex;
            justify-content: center;
            align-items: center;
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
                    <a href="dashboard"><button>Inventory</button></a>
                    <a href="user"><button>Users</button></a>
                    <a href="stock"><button>Stocks</button></a>
                    <a href="report"><button>Report</button></a>
                </div>
            </div>
        </div>
        <div class="container">
            <h2 style="text-align:center">Stock Reports &#128203;</h2>
            <table>
            <tr>
                <th>Product ID</th>
                <th>Product Name &#128230;</th>
                <th>Stock Change</th>
                <th>Date</th>
            </tr>
            
            <?php
                $sql_report = "SELECT sm.productid, p.productname, sm.stock_change, sm.movement_date
                                FROM stock_movements sm
                                JOIN products p ON sm.productid = p.productid
                                ORDER BY sm.movement_date DESC";

                $result_report = mysqli_query($con, $sql_report);
                
                if (mysqli_num_rows($result_report) > 0) {
                    while ($row_report = mysqli_fetch_assoc($result_report)) {
                        $change_sign = ($row_report['stock_change'] > 0) ? '+' : ''; // Add '+' for positive values
                        echo "<tr>
                        <td>" . $row_report['productid'] . "</td>
                        <td>" . $row_report['productname'] . "</td>
                        <td>" . $change_sign . $row_report['stock_change'] . "</td>
                        <td>" . $row_report['movement_date'] . "</td>
                        </tr>";
                    }
                }
                
                else {
                echo "<tr><td colspan='4'>No stock movements found</td></tr>";
                }
        ?>
    </table>
    <br>
    <form class='print' action="func/printpdf.php" method="post" target="_blank">
    <button type="submit">Print PDF</button>
    </form>
    </div>
    <br>
    <br>
    <br>
    <a href="func/logout.php"><button>Log out</button></a>
    </div>
</main>
</body>
</html>