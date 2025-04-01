<?php

define('FPDF_FONTPATH', '../font/');
require('fpdf.php');
include('connection.php');

$con = OpenCon();

// Create a new instance of the FPDF class
$pdf = new FPDF();
$pdf->AddPage();

// Set font for the title
$pdf->SetFont('Arial', 'B', 16);

// Get the current date
$currentdate = date("Y-m-d");

// Title of the document
$pdf->Cell(0, 10, 'Inventory Report [' . $currentdate . ']', 0, 1, 'C');

// Line break
$pdf->Ln(10);

// Set font for the table header
$pdf->SetFont('Arial', 'B', 12);

// Calculate table width (sum of all column widths)
$tableWidth = 40 + 80 + 30;

// Calculate X position to center the table
$xPos = ($pdf->GetPageWidth() - $tableWidth) / 2;

// Set the X position for the table
$pdf->SetX($xPos);

// Table header
$pdf->Cell(40, 10, 'Product ID', 1,0, 'C');
$pdf->Cell(80, 10, 'Product Name', 1,0, 'C');
$pdf->Cell(40, 10, 'Quantity', 1,0, 'C');
$pdf->Ln();

$sql = "SELECT productid, productname, productstocks FROM products ORDER BY productname ASC";
$result = mysqli_query($con, $sql);


if (mysqli_num_rows($result) > 0) {

    $pdf->SetFont('Arial', '', 12);
    
    while ($row = mysqli_fetch_assoc($result)) {
        $pdf->SetX($xPos);
        $pdf->Cell(40, 10, $row['productid'], 1,0,'C');
        $pdf->Cell(80, 10, $row['productname'], 1,0,'C');
        $pdf->Cell(40, 10, $row['productstocks'], 1,0,'C');
        $pdf->Ln();
    }
} else {
    $pdf->Cell(0, 10, 'No data found', 1, 1, 'C');
}

$pdf->Output('I', 'Inventory Report '. $currentdate .'.pdf');  // 'D' forces download, 'I' displays in the browser

CloseCon($con);
?>