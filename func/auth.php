<?php
class Auth {
    private $db; // Database connection

    public function __construct($dbConnection) {
        $this->db = $dbConnection;
    }

    public function login($username, $password) {
        $username = mysqli_real_escape_string($this->db, $username);

        $sql = "SELECT * FROM users WHERE user = '$username'";
        $result = mysqli_query($this->db, $sql);

        if (mysqli_num_rows($result) == 1) {
            $user = mysqli_fetch_assoc($result);
            
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['logged_in'] = true;
                $_SESSION['username'] = $user['user'];
                $_SESSION['level'] = $user['level'];

                return true; // Login successful
            } else {
                throw new Exception("Invalid username or password.");
            }
        } else {
            throw new Exception("User not found.");
        }
    }
}
?>