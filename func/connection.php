<?php
    function OpenCon() {
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "sweetspot";
    $con = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $con -> error);
    return $con;
    }
    
    function CloseCon($con) {
    $con -> close();
    }
?>