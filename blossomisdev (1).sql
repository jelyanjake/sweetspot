-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2025 at 03:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blossomisdev`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productid` int(11) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `productstocks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productid`, `productname`, `productstocks`) VALUES
(34000, 'Samsung Galaxy', 22),
(34001, 'iPhone 16', 20),
(34003, 'Keyboards', 25),
(34004, 'Mouse', 64),
(34005, 'Monitor', 42),
(34006, 'LED Projector', 14);

-- --------------------------------------------------------

--
-- Table structure for table `stock_movements`
--

CREATE TABLE `stock_movements` (
  `id` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `stock_change` int(11) NOT NULL,
  `movement_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock_movements`
--

INSERT INTO `stock_movements` (`id`, `productid`, `stock_change`, `movement_date`) VALUES
(53, 34000, 0, '2024-10-17 16:43:14'),
(54, 34001, 0, '2024-10-17 16:44:18'),
(55, 34000, 6, '2024-10-17 16:45:46'),
(56, 34001, 10, '2024-10-17 16:49:59'),
(57, 34001, 5, '2024-10-17 16:50:05'),
(59, 34003, 0, '2024-10-18 03:40:36'),
(60, 34003, 20, '2024-10-18 03:40:40'),
(61, 34001, 5, '2024-10-18 03:40:45'),
(62, 34000, 24, '2024-10-18 03:40:53'),
(63, 34000, -8, '2024-10-18 03:41:01'),
(64, 34004, 0, '2024-10-18 03:41:31'),
(65, 34004, 64, '2024-10-18 03:41:48'),
(66, 34005, 0, '2024-10-18 03:42:00'),
(67, 34005, 42, '2024-10-18 03:42:06'),
(68, 34006, 0, '2024-10-18 03:42:12'),
(69, 34006, 14, '2024-10-18 03:42:21'),
(70, 34003, 5, '2024-11-30 15:24:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `password`, `level`) VALUES
(40, 'potatozuu', '$2y$10$3bmKE2Ogvie9YLexsj.vROPYWIjEFBzRqdyvC3x2gsknugJMeWjpi', 2),
(46, 'maple', '$2y$10$AxY8.GAj7diu76DKJmGRQePHCvfXFkdcLwITmJ0P4ciHWLg7f4ivW', 1),
(60, 'jelyan jake', '$2y$10$zx4.SZDFqo1zPECoQg.TJu4K0e6X0oqgYo9TCvtVVq0rBd4zX8p0C', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34008;

--
-- AUTO_INCREMENT for table `stock_movements`
--
ALTER TABLE `stock_movements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stock_movements`
--
ALTER TABLE `stock_movements`
  ADD CONSTRAINT `stock_movements_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
