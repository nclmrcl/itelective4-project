-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2021 at 05:36 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_gocery`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

CREATE TABLE `tbl_accounts` (
  `acc_id` int(11) NOT NULL,
  `acc_username` varchar(100) NOT NULL,
  `acc_password` varchar(200) NOT NULL,
  `acc_fname` varchar(100) NOT NULL,
  `acc_lname` varchar(100) NOT NULL,
  `acc_mname` varchar(100) NOT NULL,
  `acc_gender` int(11) NOT NULL,
  `acc_birthdate` date NOT NULL,
  `acc_no` varchar(100) NOT NULL,
  `acc_street` varchar(100) NOT NULL,
  `acc_barangay` varchar(100) NOT NULL,
  `acc_city` varchar(100) NOT NULL,
  `acc_province` varchar(100) NOT NULL,
  `acc_email` varchar(100) NOT NULL,
  `acc_mobile` varchar(100) NOT NULL,
  `acc_role` varchar(100) NOT NULL,
  `is_activated` int(11) NOT NULL DEFAULT 0,
  `acc_otp` varchar(6) NOT NULL,
  `acc_status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`acc_id`, `acc_username`, `acc_password`, `acc_fname`, `acc_lname`, `acc_mname`, `acc_gender`, `acc_birthdate`, `acc_no`, `acc_street`, `acc_barangay`, `acc_city`, `acc_province`, `acc_email`, `acc_mobile`, `acc_role`, `is_activated`, `acc_otp`, `acc_status`, `date_created`) VALUES
(9, 'binociete', '$2y$10$NzIyNTQzOWQ1N2I2MGQwYOL/oTCUuhJNdKnodYiA7Lsj/MPI4c8OS', 'Bernie', 'Inociete', 'Legua', 1, '2000-01-18', 'No. 1687', 'Dominguez', 'SANTA RITA', 'Olongapo City', 'Zambales', 'binociete@gmail.com', '', 'user', 0, '837024', 1, '2021-04-23 03:51:47');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `cart_id` int(11) NOT NULL,
  `acc_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `cart_quantity` int(11) NOT NULL DEFAULT 1,
  `cart_dateAdded` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `cart_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_cart`
--

INSERT INTO `tbl_cart` (`cart_id`, `acc_id`, `product_id`, `cart_quantity`, `cart_dateAdded`, `cart_status`) VALUES
(1, 9, 1, 1, '2021-04-24 08:48:27', 1),
(2, 9, 2, 1, '2021-04-24 09:18:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_desc` longtext NOT NULL,
  `product_price` float NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `product_category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`product_id`, `product_name`, `product_desc`, `product_price`, `product_quantity`, `product_category`) VALUES
(1, 'Apple', 'Golden Delicious has a white juicy pulp and a greenish yellow shell. The taste is mellow and sweet, making Golden Delicious suitable for desserts.\r\n', 30, 55, 'Fruits'),
(2, 'Banana', 'An ecologically grown banana. Bananas are good as snacks. The banana is temperature sensitive, very sensitive to dehydration, ethylene and cold damage. Store in room temperature or cool, never in a refrigerator.\r\n', 140, 10, 'Fruits');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`acc_id`),
  ADD UNIQUE KEY `acc_email` (`acc_email`);

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `acc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
