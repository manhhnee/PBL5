-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2023 at 12:06 PM
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
(4, 1, 'Naruto tập 1', 13000, 'kishimoto', 'Naruto[a] is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts—the first set in Naruto\'s pre-teen years, and the second in his teens. The series is based on two one-shot manga by Kishimoto: Karakuri (1995), which earned Kishimoto an honorable mention in Shueisha\'s monthly Hop Step Award the following year, and Naruto (1997).', '2023-04-10', 'Kim Đồng'),
(8, 7, 'Luyện nói tiếng Anh như người bản ngữ', 150000, 'A.J Hoge', 'Cuốn sách gồm 23 chương trong đó có tới 8 chương cung cấp cho người học những quy tắc và bí quyết giúp các bạn có thể nói tiếng Anh thành thạo. Những quy tắc được trình bày dễ hiểu, dễ ghi nhớ và phù hợp với người Việt chúng ta.\r\n\r\n– Quy tắc đầu tiên: Học theo cụm từ – không học đơn lẻ\r\n\r\n– Quy tắc thứ hai: Hoc ngữ pháp sẽ hạn chế khả năng nói của bạn\r\n\r\n– Quy tắc thứ ba: Học bằng tai không phải học bằng mắt\r\n\r\n– Quy tắc thứ tư: Lặp lại là chìa khóa để nắm vững kỹ năng nói tiếng Anh\r\n\r\n– Quy tắc thứ năm: Học ngữ pháp một cách trực quan và tự nhiên\r\n\r\n– Quy tắc thứ sáu: Hãy học tiếng Anh thực tế và tạm bỏ những cuốn giáo trình\r\n\r\n– Quy tắc thứ bảy: Học tiếng Anh với các câu chuyện hấp dẫn\r\n\r\n– Bí quyết để có kỹ năng viết tiếng Anh tốt\r\n\r\nChắc chắn thông qua hệ thống quy tắc và bí quyết này các bạn có thể thay đổi được tư duy nói tiếng Anh một cách khoa học.', '2023-04-20', 'ĐHQG Hà Nội'),
(9, 7, 'Sách Cambridge IELTS 15 Academic', 150000, 'hào trần', 'Bộ sách Cambridge IELTS Practice Tests là bộ đề luyện thi IELTS dành cho các bạn học sinh, sinh viên muốn định cư hoặc đi du học nước ngoài do đại học Cambridge tổng hợp dựa trên đề thi thực tế các năm. Thông thường mỗi năm NXB sẽ phát hành 1 cuốn. \r\n\r\nXuyên suốt bộ sách học viên có thể thấy quá trình thay đổi của đề thi IELTS về độ khó cũng như một số cấu trúc trong đề thi. Theo phân tích của các chuyên gia luyện thi IELTS, đề thi IELTS đang khó dần lên theo thời gian, đề thì thường xuất hiện những chủ đề mới và khó, hướng đến đánh giá khả năng tư duy học thuật của người thi. \r\n\r\nBộ sách cung cấp cho người học một cơ hội tuyệt vời để làm quen với IELTS và luyện tập kỹ thuật kiểm tra bằng cách sử dụng tài liệu xác thực được chuẩn bị bởi Cambridge English Language Assessment. Cuốn sách bao gồm bốn bài kiểm tra đầy đủ cho các ứng viên học để thi IELTS theo Academic Module, phục vụ cho các bạn muốn đi du học trong tương lai.', '2023-04-21', 'ĐHQG Hà Nội'),
(10, 8, 'Sherlock Holmes (Trọn Bộ 3 Cuốn)', 276000, 'Sir Arthur Conan Doyle', 'Nhân vật Sherlock Holmes từ lâu đã trở thành nguồn cảm hứng cho hàng trăm, hàng ngàn tác phẩm ở nhiều loại hình nghệ thuật khác: từ âm nhạc, ca kịch đến điện ảnh… Bộ sách Sherlock Holmes toàn tập (boxset trọn bộ 3 tập) một lần nữa mang đến cho người đọc cơ hội được nhìn ngắm, ngưỡng mộ và đánh giá nhân vật độc đáo của nhà văn tài năng Conan Doyle. Chân dung cuộc đời, sự nghiệp và nhân cách của Sherlock Holmes chưa bao giờ được tái hiện chân thực, đầy đủ và sống động đến thế… Chỉ từ một giọt nước, người giỏi suy luận có thể đoán ra rất nhiều chuyện liên quan đến một thác nước hay một đại dương dù họ chưa bao giờ tận mắt nhìn thấy chúng. Như vậy, cuộc sống là một chuỗi mắt xích rộng lớn nhất của nó, nếu ta biết được một mắt xích. Như tất cả mọi khoa học khác, “suy đoán và phân tích” là một khoa học mà ta chỉ có thể làm chủ nó sau một quá trình nghiên cứu dài lâu, bền bỉ.\r\n\r\nNgười mới đi vào lĩnh vực này nên bắt đầu bằng những vấn đề sơ đẳng: gặp bất kỳ ai, chỉ bằng vào sự quan sát, hãy cố tìm hiểu tiểu sử, nghề nghiệp hay thói quen của người ấy. Tuy có vẻ ấu trĩ nhưng thực ra sự thật này được rèn giũa các khả năng quan sát của ta và nó dạy cho ta biết cần phải nhìn thẳng vào đâu và phải tìm kiếm cái gì. Móng tay, những vết chai ở ngón trỏ và ngón cái, ống tay áo, đầu gối quần, dáng đi, cách đứng đều là những thứ nói lên nghề nghiệp của một con người…\r\n\r\nMã hàng	8935095627899\r\nTên Nhà Cung Cấp	Huy Hoang Bookstore\r\nTác giả	Sir Arthur Conan Doyle\r\nNXB	NXB Văn Học\r\nNăm XB	2019\r\nTrọng lượng (gr)	600\r\nKích Thước Bao Bì	13.5 x 20.5\r\nHình thức	Bìa Mềm\r\nSản phẩm hiển thị trong	\r\nHuy Hoang Bookstore\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Truyện Trinh Thám - Kiếm Hiệp bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\n“Tên tôi là Sherlock Holmes. Công việc của tôi là tìm hiểu những gì mà người khác không biết…”\r\n\r\nĐối với các độc giả yêu thích dòng văn trinh thám nói riêng cũng như những người yêu sách trên toàn thế giới nói chung thì không phải nói nhiều về sức hút của hai cái tên: nhà văn Conan Doyle và “đứa con tinh thần” của cả cuộc đời ông – Sherlock Holmes.\r\n\r\nNhân vật Sherlock Holmes từ lâu đã trở thành nguồn cảm hứng cho hàng trăm, hàng ngàn tác phẩm ở nhiều loại hình nghệ thuật khác: từ âm nhạc, ca kịch đến điện ảnh… Bộ sách Sherlock Holmes toàn tập (boxset trọn bộ 3 tập) một lần nữa mang đến cho người đọc cơ hội được nhìn ngắm, ngưỡng mộ và đánh giá nhân vật độc đáo của nhà văn tài năng Conan Doyle. Chân dung cuộc đời, sự nghiệp và nhân cách của Sherlock Holmes chưa bao giờ được tái hiện chân thực, đầy đủ và sống động đến thế… Chỉ từ một giọt nước, người giỏi suy luận có thể đoán ra rất nhiều chuyện liên quan đến một thác nước hay một đại dương dù họ chưa bao giờ tận mắt nhìn thấy chúng. Như vậy, cuộc sống là một chuỗi mắt xích rộng lớn nhất của nó, nếu ta biết được một mắt xích. Như tất cả mọi khoa học khác, “suy đoán và phân tích” là một khoa học mà ta chỉ có thể làm chủ nó sau một quá trình nghiên cứu dài lâu, bền bỉ.\r\n\r\nNgười mới đi vào lĩnh vực này nên bắt đầu bằng những vấn đề sơ đẳng: gặp bất kỳ ai, chỉ bằng vào sự quan sát, hãy cố tìm hiểu tiểu sử, nghề nghiệp hay thói quen của người ấy. Tuy có vẻ ấu trĩ nhưng thực ra sự thật này được rèn giũa các khả năng quan sát của ta và nó dạy cho ta biết cần phải nhìn thẳng vào đâu và phải tìm kiếm cái gì. Móng tay, những vết chai ở ngón trỏ và ngón cái, ống tay áo, đầu gối quần, dáng đi, cách đứng đều là những thứ nói lên nghề nghiệp của một con người…', '2023-04-15', 'NXB Văn Học'),
(11, 6, 'Sách Giáo khoa  Ngữ Văn Lớp 6', 12000, 'Bộ Giáo dục và đào tạo', 'Soạn văn 6 hay nhất, ngắn gọn nhưng đầy đủ nội dung cần thiết được biên soạn bám sát các câu hỏi trong SGK Ngữ văn lớp 6 Tập 1 và Tập 2 ba bộ sách mới giúp học sinh dễ dàng soạn văn 6.', '2023-04-21', 'Bộ Giáo dục và đào tạo'),
(12, 6, 'Tắt Đèn', 230000, 'Ngô Tất Tố', 'Tắt đèn là một cuốn xã hội tiểu thuyết tả cảnh đau khổ của dân quê, của một người đàn bà nhà quê An Nam suốt đời sống trong sự nghèo đói và sự ức hiếp của bọn cường hào và người có thế lực mà lúc nào cũng vẫn hết lòng vì chồng, vì con\".(Ngô Tất Tố)\"Theo tôi tiên tri, thì cuốn Tắt đèn còn phải sống lâu, thọ hơn cả một số văn gia đương kim hôm nay. Chị Dậu đích là tác giả Ngô Tất Tố hóa thân ra mà thôi. Chị Dậu là cái đốm sáng đặc biệt của Tắt đèn. Nếu ví toàn truyện Tắt đèn là một khóm cây, thì chị Dậu là cả gốc cả ngọn cả cành và chính chị Dậu đã nổi gió lên mà rung cho cả cái cây dạ hương Tắt đèn đó lên\".(Nguyễn Tuân - 1962 ) \"Chị Dậu là nhân vật điển hình được người đọc yêu mến. Và người yêu mến chị hơn cả là Ngô Tất Tố. Giữa biết bao tệ nạn và cảnh đời bất công ngang trái ở nông thôn Việt Nam cũ, Ngô Tất Tố đã hết lòng bảo vệ một người phụ nữ là chị Dậu. Nhiều lần chị Dậu bị đẩy vào tình thế hiểm nghèo, rất có thể bị làm nhục nhưng Ngô Tất Tố đã giữ cho chị Dậu được bảo đảm toàn vẹn, giữ trọn phẩm giá, không phải đau đớn, dằn vặt\".(Hà Minh Đức - 1999)Mời bạn đón đọc.', '2023-04-15', 'NXB Văn Học'),
(13, 1, 'Naruto tập 2', 12000, 'Masashi Kishimoto', 'Naruto[a] is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts—the first set in Naruto\'s pre-teen years, and the second in his teens. The series is based on two one-shot manga by Kishimoto: Karakuri (1995), which earned Kishimoto an honorable mention in Shueisha\'s monthly Hop Step Award the following year, and Naruto (1997).', '2023-04-06', 'Kim Đồng'),
(14, 8, 'Conan tập 1', 12000, 'Aoyama GoShou', 'Thám tử lừng danh Conan là một series manga trinh thám được sáng tác bởi Aoyama Gōshō. Tác phẩm được đăng tải trên tạp chí Weekly Shōnen Sunday của nhà xuất bản Shogakukan vào năm 1994 và được đóng gói thành 102 tập tankōbon tính đến tháng 9 năm 2022.', '2023-04-20', 'Kim Đồng'),
(15, 1, 'TUYỂN TẬP TRANH MASASHI KISHIMOTO - UZUMAKI NARUTO', 110500, 'Masashi Kishimoto', 'Tiếp nối thành công của dòng Artbook Manga Kim Đồng nói riêng và 2 tập Artbook siêu rực rỡ đã phát hành trước đó, mùa hè này, fan của Naruto sẽ được rinh tập 3, và cũng là tập Artbook cuối cùng của Naruto: UZUMAKI NARUTO về với bộ sưu tập hùng hậu của mình!!\r\n\r\nCũng giống như những Tuyển tập tranh trước đó, trong cuốn thứ 3 này, tác giả Masashi Kishimoto sẽ mang đến loạt tranh màu siêu đẹp về chặng đường chiến đấu cuối cùng của Naruto khi cậu đối đầu Obito, gặp gỡ Lục đạo Tiên nhân, chạm tới giấc mơ trở thành Hokage Đệ thất!! Sách cũng đi kèm một bài viết ghi lại cuộc trò chuyện giữa tác giả Kishimoto và nhà sản xuất của Amazing Spiderman 2! Ngoài ra các độc giả còn được tặng kèm 1 Poster gập bên trong, và bảng Sticker độc quyền nữa! Rất chi đầy đủ nên chỉ còn chờ đón sách về thôi nhé!!', '2023-04-22', 'Kim Đồng'),
(16, 5, 'Sự Im Lặng Của Bầy Cừu', 250000, 'Thomas Harris', 'Những cuộc phỏng vấn ở xà lim với kẻ ăn thịt người ham thích trò đùa trí tuệ, những tiết lộ nửa chừng hắn chỉ dành cho kẻ nào thông minh, những cái nhìn xuyên thấu thân phận và suy tư của cô mà đôi khi cô muốn lảng tránh... Clarice Starling đã dấn thân vào cuộc điều tra án giết người lột da hàng loạt như thế, để rồi trong tiếng bức bối của chiếc đồng hồ đếm ngược về cái chết, cô phải vật lộn để chấm dứt tiếng kêu bao lâu nay vẫn đeo đẳng giấc mơ mình: tiếng kêu của bầy cừu sắp bị đem đi giết thịt. ', '2023-04-14', 'NXB Văn Học');

-- --------------------------------------------------------

--
-- Table structure for table `book_supplier`
--

CREATE TABLE `book_supplier` (
  `id` int(11) NOT NULL,
  `id_Book` int(11) NOT NULL,
  `id_Supplier` int(11) NOT NULL,
  `Import_Price` int(11) NOT NULL,
  `Amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `book_supplier`
--

INSERT INTO `book_supplier` (`id`, `id_Book`, `id_Supplier`, `Import_Price`, `Amount`) VALUES
(1, 4, 1, 10000, 10);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `id_Account` int(11) NOT NULL,
  `Created_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `id_Account`, `Created_Date`) VALUES
(1, 26, '2023-04-20');

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `id` int(11) NOT NULL,
  `id_BookSuppier` int(11) NOT NULL,
  `id_Cart` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_item`
--

INSERT INTO `cart_item` (`id`, `id_BookSuppier`, `id_Cart`, `quantity`) VALUES
(1, 1, 1, 2);

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
(1, 'Hành Động', 'https://www.entoin.com/images/acti101.jpg'),
(2, 'ecchi', 'https://i0.wp.com/news.qoo-app.com/en/wp-content/uploads/sites/3/2022/03/Inu-ni-Nattara-Suki-na-Hito-ni-Hirowareta-Ecchi-Manga-Gets-TV-Anime-in-2023.jpg'),
(3, 'Lãng Mạn', 'https://cdn.bollyinside.com/articles/wp-content/uploads/sites/4/2022/06/Best-Romance-Movies-on-Netflix.jpg'),
(5, 'Kinh Dị', 'https://prd-rteditorial.s3.us-west-2.amazonaws.com/wp-content/uploads/2020/10/23163832/RT_Guide_ScariestHorror_IT.jpg'),
(6, 'Văn Học', 'https://image.vtc.vn/upload/2020/10/15/sgk-tv-1-09432982.jpg'),
(7, 'Học tiếng Anh', 'https://vcdn-vnexpress.vnecdn.net/2021/07/03/English-1364-1625314122.jpg'),
(8, 'Trinh Thám', 'https://detektifangel.com/wp-content/uploads/2021/10/166366806-male-detective-with-smoking-pipe-looking-through-magnifying-glass-on-beige-background.jpg');

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
(7, 4, 'https://naruto-official.com/common/ogp/NTOS_OG-main.png'),
(8, 8, 'https://sachhoc.com/image/catalog/Sachtienganh/Luyen-nghe/Luyen-noi-tieng-anh-nhu-nguoi-ban-ngu-ebook.jpg'),
(9, 8, 'https://salt.tikicdn.com/ts/tmp/db/84/29/666727509ec6e4b78e47146a1d168a50.jpg'),
(10, 8, 'https://static.hotdeal.vn/images/811/810997/500x500/184716-combo-sach-luyen-noi-tieng-anh-nhu-nguoi-ban-ngu.jpg'),
(11, 9, 'https://ieltsxuanphi.edu.vn/wp-content/uploads/2021/10/cambridge-15-1.jpg'),
(12, 9, 'https://ieltscaptoc.com.vn/wp-content/uploads/2021/05/cambridge-ielts-11-15-1024x933.jpg'),
(13, 10, 'https://www.khaitam.com/Data/Sites/1/Product/1190/sherlock-holmes-tap-1.jpg'),
(14, 10, 'https://noidungsach.com/wp-content/uploads/2018/08/Sherlock-Holmes.jpg'),
(15, 11, 'https://metaisach.com/wp-content/uploads/2019/01/sach-giao-khoa-ngu-van-lop-6.jpg'),
(16, 11, 'https://sachvip.net/wp-content/uploads/2020/11/sach-giao-khoa-ngu-van-lop-6-.jpg'),
(17, 12, 'https://upload.wikimedia.org/wikipedia/vi/b/b1/T%E1%BA%AFt_%C4%91%C3%A8n-Nh%C3%A3_Nam.jpeg'),
(18, 12, 'https://www.netabooks.vn/Data/Sites/1/Product/36264/tat-den-tai-ban-2020-2.jpg'),
(19, 12, 'https://nhasachquangloi.vn/pub/media/catalog/product/cache/3bd4b739bad1f096e12e3a82b40e551a/v/h/vh-vhvn-tvh-212.jpg'),
(20, 12, 'https://newshop.vn/public/uploads/products/5345/tat-den-8.jpg'),
(21, 13, 'https://product.hstatic.net/200000343865/product/2_f16fd54254374acba3156edc1f5be482_master.jpg'),
(22, 13, 'https://i2.wp.com/images2.imgbox.com/3f/2f/uqbFn0ie_o.jpg'),
(23, 14, 'https://4.bp.blogspot.com/-biTG3BKKbHI/WG1NT-yhl6I/AAAAAAAAYM4/3ufLMiN3JJs0cexJ1FlvOJAbmElxwRjBgCLcB/s1600/conan%2Btap%2B1%2B%25281%2529.jpg'),
(24, 14, 'https://doctruyentranh.net.vn/ckfinder/userfiles/images/doc_truyen_tranh_conan_chap_1_1.jpg'),
(25, 15, 'https://images2.imgbox.com/9b/28/VeD2ucFi_o.jpg'),
(26, 15, 'https://product.hstatic.net/200000343865/product/tuyen-tap-tranh-masashi-kishimoto---uzumaki-naruto---artbook-naruto_97a974e02df3425190436ac7da622711_master.jpg'),
(27, 16, 'https://static2.vieon.vn/vieplay-image/poster_v4/2021/10/15/xabrmdee_660x946suimlangcuabaycuu.jpg'),
(28, 16, 'https://statics.pancake.vn/web-media/ce/67/b4/44/43c04a89ab0c965c98fdba26051d0a4e4e5b606a666e179642692c8d.jpg');

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
(1, 12, 'Lê', 'Hồng', '0357139594', '89/10 đồng kè', 'https://cdn3.dhht.vn/wp-content/uploads/2023/01/30-giong-meo-noi-tieng-dep-nhat-cute-de-nuoi-va-gia-ban-bia.jpg'),
(2, 22, 'Hồ', 'Hưng', '09342442', '', 'https://cf.shopee.vn/file/791371ec1de997c257d74ff3be618a12'),
(3, 23, 'Trần', 'Anh Hào', '0357139594', '', ''),
(4, 24, 'Nguyễn', 'Đức Mạnh', '0923234214', '', ''),
(5, 25, 'Nguyễn', 'Đức Mạnh', '0923234214', '', ''),
(6, 26, 'Trần', 'Hào', '0962240446', '', 'https://genk.mediacdn.vn/k:thumb_w/640/2015/screen-shot-2015-07-30-at-2-31-57-pm-1438334096188/cau-chuyen-ve-nguoi-tao-ra-chu-ech-xanh-than-thanh.png');

-- --------------------------------------------------------

--
-- Table structure for table `make_order`
--

CREATE TABLE `make_order` (
  `id` int(11) NOT NULL,
  `id_Status` int(11) NOT NULL,
  `id_Account` int(11) NOT NULL,
  `id_Payment` int(11) NOT NULL,
  `OrderDate` date NOT NULL,
  `OrderAddress` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `id` int(11) NOT NULL,
  `id_Order` int(11) NOT NULL,
  `id_BookSupplier` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `Fixed_Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `Payment_Method` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(5, 8, 26, 4, 'sách có bìa đẹp, nội dung hay'),
(6, 12, 22, 2, 'truyện dở quá, không thuần phong mĩ tục'),
(7, 15, 26, 4, 'không biết phải do mình nhạy cảm khó tính hay không nhưng mà hàng của mình đóng gói tạm ổn, không đến nổi kĩ càng.\r\ngiao khá nhanh, ưng lắm.\r\ncuốn artbook này của mình nó bị df khá nhiều ( trừ 1 vài cái không đáng nói ).\r\nartbook bị cong ở mặt sau ( sasuke ), mình không biết nên làm sao. còn 1 chỗ df không ưa nhìn nữa là ngay góc.\r\nsản phẩm đánh giá 4 sao.\r\nfan Naruto nên sắm 1 cuốn như này'),
(8, 15, 22, 5, 'Đóng gói ổn, giao hàng nhanh, chất lượng siêu xịn lun, art xinh xỉu nhìn mê lắm lun ạ ❤️'),
(9, 15, 12, 5, 'Bìa rất đẹp, đúng với hình ảnh. Chưa khui được vì là quà tặng. Seal đóng kín, có hơi chật nên bìa bên trong có phần lồi lên. Màu tranh đẹp hơn hình ảnh minh họa :3'),
(10, 15, 23, 5, 'Đựp xĩu dĩa huông có điều những bức đẹp thì nó bị cắt đôi ra kh nhìn hết đc hơi tiếc'),
(11, 9, 12, 1, 'chất lượng quá tệ'),
(12, 4, 12, 5, 'đỉnh của đỉnh :v 😢😢😢😢');

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

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `Status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `Status`) VALUES
(1, 'pending'),
(2, 'delivering'),
(3, 'success'),
(4, 'canceled');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `Name`, `Address`) VALUES
(1, 'nhà xuất bản Kim Đồng', '173 đồng kè,hòa khánh bắc, liên chiểu, đà nẵng'),
(2, 'nhà xuất bản Trẻ', '70A, bàu mạc 6 , hòa khánh bắc, liên chiểu, Đầ nẵng');

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
-- Indexes for table `book_supplier`
--
ALTER TABLE `book_supplier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Book` (`id_Book`),
  ADD KEY `id_Supplier` (`id_Supplier`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_Account` (`id_Account`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Book` (`id_BookSuppier`),
  ADD KEY `id_Cart` (`id_Cart`);

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
-- Indexes for table `make_order`
--
ALTER TABLE `make_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Status` (`id_Status`),
  ADD KEY `id_Account` (`id_Account`),
  ADD KEY `id_Payment` (`id_Payment`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Order` (`id_Order`),
  ADD KEY `id_BookSupplier` (`id_BookSupplier`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `book_supplier`
--
ALTER TABLE `book_supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `image_book`
--
ALTER TABLE `image_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `inforuser`
--
ALTER TABLE `inforuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `make_order`
--
ALTER TABLE `make_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`id_Role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`id_Category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_supplier`
--
ALTER TABLE `book_supplier`
  ADD CONSTRAINT `book_supplier_ibfk_1` FOREIGN KEY (`id_Book`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_supplier_ibfk_2` FOREIGN KEY (`id_Supplier`) REFERENCES `supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`id_Cart`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`id_BookSuppier`) REFERENCES `book_supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `image_book`
--
ALTER TABLE `image_book`
  ADD CONSTRAINT `image_book_ibfk_1` FOREIGN KEY (`id_Book`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inforuser`
--
ALTER TABLE `inforuser`
  ADD CONSTRAINT `inforuser_ibfk_1` FOREIGN KEY (`id_Account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `make_order`
--
ALTER TABLE `make_order`
  ADD CONSTRAINT `make_order_ibfk_1` FOREIGN KEY (`id_Status`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `make_order_ibfk_2` FOREIGN KEY (`id_Account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `make_order_ibfk_3` FOREIGN KEY (`id_Payment`) REFERENCES `payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`id_Order`) REFERENCES `make_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`id_BookSupplier`) REFERENCES `book_supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`id_Book`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`id_Account`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
