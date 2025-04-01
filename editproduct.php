<?php

session_start();
include('func/connection.php');
include('func/status.php');
include('func/validate.php');
$con = OpenCon();

$productid = isset($_GET['id']) ? mysqli_real_escape_string($con, $_GET['id']) : '';

// Fetch the product details
$sql = "SELECT * FROM products WHERE productid = '$productid'";
$result = mysqli_query($con, $sql);
$product = mysqli_fetch_assoc($result);


if (!$product) {
    $_SESSION['error'] = "<strong>&#10071; Product not found.</strong>";
    header("Location: stock.php");
    exit;
}

// Handle the stock update form
if (isset($_POST['update_stock']) && isset($_POST['stockchange'])) {
    $productname = mysqli_real_escape_string($con, $_POST['productname']);
    $stock_change = (int)$_POST['stockchange']; // get the stock change value
    $new_stock = $product['productstocks'] + $stock_change; // calculate new stock
    
    if ($new_stock < 0) {
        $_SESSION['error'] = "<strong>&#10071; Cannot reduce stock below 0.</strong>";
        header("Location: editproduct.php?id=$productid");
        exit;
    }

    // Update the stock in the database
    $sql_update = "UPDATE products SET productstocks = '$new_stock', productname = '$productname' WHERE productid = '$productid'";
    if (mysqli_query($con, $sql_update)) {
        // Log the stock movement
        $sql_log_movement = "INSERT INTO stock_movements (productid, stock_change) VALUES ('$productid', '$stock_change')";
        mysqli_query($con, $sql_log_movement);

        $_SESSION['success'] = "<strong>&#127881; Stock updated successfully!</strong>";
        header("Location: stock.php");
        exit;
    } else {
        $_SESSION['error'] = "<strong>&#10071; Error updating stock.</strong>";
        header("Location: editproduct.php?id=$productid");
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
    <title>Blossom IS - Edit Product</title>
    <link rel="icon" type="image/x-icon" href="img/icon.ico">
</head>
<body>
<main>
    <br>
    <br>
    <div class="contentinsidebg" style="border-radius: 25px;">
    <h2 style="text-align:center">Editing Product #<?php echo $productid;?> &#128190;</h2>
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

    <?php if (isset($product)): ?>
        <form method="POST" action="">
            <div>
                <label for="productid">Product ID:</label>
                <input type="text" id="productid" name="productid" value="<?php echo htmlspecialchars($product['productid']); ?>" readonly>
            </div>
            <div>
                <label for="productname">Product Name:</label>
                <input type="text" id="productname" name="productname" value="<?php echo htmlspecialchars($product['productname']); ?>" required>
            </div>
            <div>
                <label for="stockchange">Stock Change:</label>
                <input type="number" id="stockchange" name="stockchange" placeholder="+/-" required>
            </div>
            <div>
                <label>&nbsp;</label>
                <input type="submit" name="update_stock" value="Update Product">
            </div>
        </form>
    <?php else: ?>
        <p>Product details are not available.</p>
    <?php endif; ?>
    <br><br>
    <a href="stock.php">
        <button>Cancel</button>
    </a>
</div>

</main>
</body>
</html>

<?php
CloseCon($con);
?>
