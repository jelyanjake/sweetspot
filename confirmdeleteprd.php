<?php

session_start();
include('func/connection.php');
include('func/status.php');
include('func/validate.php');
$con = OpenCon();

if (isset($_GET['id']) && isset($_GET['name'])) {
    $productid = mysqli_real_escape_string($con, $_GET['id']);
    $productname = mysqli_real_escape_string($con, $_GET['name']);
} else {
    $_SESSION['error'] = "<strong>&#10060; Invalid request.";
    header("Location: stock.php");
    exit;
}

if (isset($_POST['delete'])) {
    $delete_sql = "DELETE FROM products WHERE productid = '$productid'";
    if (mysqli_query($con, $delete_sql)) {
        $_SESSION['success'] = "<strong>&#10060; Product Deleted Successfully!</strong>";
        header("Location: stock.php");
        exit;
    } else {
        $_SESSION['error'] = "<strong>&#10071; Error deleting Product.</strong>";
        header("Location: stock.php");
        exit;
    }
}
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
            width:200px
        }

        .container {
  display: flex;
  justify-content: center;
}
    </style>
</head>
<body>
<main>
    <br>
    <br>
    <div class="contentinsidebg" style="border-radius: 25px;">
        <h2 style="text-align:center">Product Deletion &#9940;</h2>
        <hr>
        <h4 style="text-align:center">Are you sure you want to delete <strong>Product #<?php echo htmlspecialchars($productid); ?></strong> - <strong><?php echo htmlspecialchars($productname); ?></strong>?</h4>
        <p style="text-align:center">Warning: This action cannot be undone!</p>
        <div class="container">
        <form method="POST" action="">
            <input class="custom" type="submit" name="delete" value="Delete">
        </form>
        </div>
        <a href="stock.php"><button type="button">Cancel</button></a>
    </div>
</main>
</body>
</html>

<?php
CloseCon($con);
?>
