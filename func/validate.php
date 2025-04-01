<?php

$username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
$level = isset($_SESSION['level']) ? $_SESSION['level'] : 1;
$role = ($level == 2) ? "Admin" : "User";

