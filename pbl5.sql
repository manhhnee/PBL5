-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2023 at 06:49 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pbl5`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(70) NOT NULL,
  `id_Role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `Username`, `Password`, `id_Role`) VALUES
(12, 'hong', '$2b$10$WZvw7Gv7TgmyfSNp9antKux97lTgirOjMMI/FwUP2tq/wlFBFSRFO', 3),
(22, 'hungga', '$2b$10$LVXUGa2AH70zJTjNMbCRW.z..ZUJfulGOdeln8QZ4usvpEGYfgMEW', 3),
(23, 'darkness', '$2b$10$IvrS2XrluYkbB6EnaLJWZ.yZGWYH3fLVl1grYZAsvKoY7f14GvPiu', 3),
(24, 'admin1', '$2b$10$IvrS2XrluYkbB6EnaLJWZ.yZGWYH3fLVl1grYZAsvKoY7f14GvPiu', 3),
(25, 'admin2', '$2b$10$IvrS2XrluYkbB6EnaLJWZ.yZGWYH3fLVl1grYZAsvKoY7f14GvPiu', 1),
(26, 'haoga', '$2b$10$3qbMrB07kbflUWg3goA07.tT88oab/BzNLbbn02KGRgNaXY4HsfaS', 3);

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `id_Category` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Price` int(11) NOT NULL,
  `Author` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `Publication_Date` date NOT NULL,
  `Publisher` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `id_Category`, `Name`, `Price`, `Author`, `Description`, `Publication_Date`, `Publisher`) VALUES
(4, 1, 'Naruto', 13000, 'kishimoto', 'Naruto[a] is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts—the first set in Naruto\'s pre-teen years, and the second in his teens. The series is based on two one-shot manga by Kishimoto: Karakuri (1995), which earned Kishimoto an honorable mention in Shueisha\'s monthly Hop Step Award the following year, and Naruto (1997).', '2023-04-10', 'nxb Kim Đồng'),
(5, 1, 'One Piece', 25000, 'Oda', 'One Piece[a] is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts—the first set in Naruto\'s pre-teen years, and the second in his teens. The series is based on two one-shot manga by Oda: Karakuri (1995), which earned Kishimoto an honorable mention in Shueisha\'s monthly Hop Step Award the following year, and Naruto (1997).', '2022-04-10', 'nxb Kim Đồng'),
(7, 2, 'sweet guy', 13000, 'kishimoto', 'anh vũ hà nam lên đỉnh  of becoming the Hokage, the leader of his village. The story is told ', '2023-04-09', 'nxb Kim Đồng');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `Name`, `Image`) VALUES
(1, 'action', 'https://www.entoin.com/images/acti101.jpg'),
(2, 'ecchi', 'https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2022/03/Inu-ni-Nattara-Suki-na-Hito-ni-Hirowareta-Ecchi-Manga-Gets-TV-Anime-in-2023.jpg'),
(3, 'romance', 'https://daominhha.net/wp-content/uploads/2022/08/download-Romance-after-dark-full-crack-daominhha.jpg'),
(5, 'horror', 'https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2020/10/23163832/RT_Guide_ScariestHorror_IT.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `image_book`
--

CREATE TABLE `image_book` (
  `id` int(11) NOT NULL,
  `id_Book` int(11) NOT NULL,
  `Image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image_book`
--

INSERT INTO `image_book` (`id`, `id_Book`, `Image`) VALUES
(1, 4, 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg'),
(2, 4, 'https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/8532171bec0d05bfe45769a330fbab82.jpe'),
(3, 5, 'https://gamek.mediacdn.vn/133514250583805952/2021/8/26/anh-111-1629960470342985294023.png'),
(4, 7, 'https://pm1.narvii.com/6145/0fa436ddf62cbf671958394bad2e5ea788bc4cbe_hq.jpg'),
(5, 7, 'https://i7.xem-truyen.com/manga/23/23757/chang-trai-ngot-ngao.thumb_500x.jpg'),
(6, 5, 'https://naruto-official.com/common/ogp/NTOS_OG-main.png'),
(7, 4, 'https://naruto-official.com/common/ogp/NTOS_OG-main.png');

-- --------------------------------------------------------

--
-- Table structure for table `inforuser`
--

CREATE TABLE `inforuser` (
  `id` int(11) NOT NULL,
  `id_Account` int(11) NOT NULL,
  `FirstName` varchar(10) NOT NULL,
  `LastName` varchar(10) NOT NULL,
  `PhoneNumber` varchar(10) NOT NULL,
  `Address` varchar(70) NOT NULL,
  `Avatar` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inforuser`
--

INSERT INTO `inforuser` (`id`, `id_Account`, `FirstName`, `LastName`, `PhoneNumber`, `Address`, `Avatar`) VALUES
(1, 12, 'Lê', 'Hồng', '0357139594', '89/10 đồng kè', ''),
(2, 22, 'Hồ', 'Hưng', '09342442', '', ''),
(3, 23, 'Trần', 'Anh Hào', '0357139594', '', ''),
(4, 24, 'Nguyễn', 'Đức Mạnh', '0923234214', '', ''),
(5, 25, 'Nguyễn', 'Đức Mạnh', '0923234214', '', ''),
(6, 26, 'Trần', 'Hào', '0962240446', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `id_Book` int(11) NOT NULL,
  `id_Account` int(11) NOT NULL,
  `star` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `id_Book`, `id_Account`, `star`, `comment`) VALUES
(1, 4, 26, 5, 'hehehehe'),
(2, 4, 22, 1, 'truyện dở '),
(3, 4, 22, 4, 'um'),
(4, 5, 22, 4, 'đasadsad');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `roleName`) VALUES
(1, 'ADMIN'),
(2, 'STAFF'),
(3, 'CUSTOMMER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Role` (`id_Role`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Category` (`id_Category`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_book`
--
ALTER TABLE `image_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Book` (`id_Book`);

--
-- Indexes for table `inforuser`
--
ALTER TABLE `inforuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Account` (`id_Account`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Book` (`id_Book`),
  ADD KEY `id_Account` (`id_Account`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `image_book`
--
ALTER TABLE `image_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inforuser`
--
ALTER TABLE `inforuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`id_Role`) REFERENCES `role` (`id`);

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`id_Category`) REFERENCES `category` (`id`);

--
-- Constraints for table `image_book`
--
ALTER TABLE `image_book`
  ADD CONSTRAINT `image_book_ibfk_1` FOREIGN KEY (`id_Book`) REFERENCES `book` (`id`);

--
-- Constraints for table `inforuser`
--
ALTER TABLE `inforuser`
  ADD CONSTRAINT `inforuser_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account` (`id`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_Book`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`id_Account`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
