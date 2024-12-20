-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 07:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebakti`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `selfie_image` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `location` text DEFAULT NULL,
  `status` enum('hadir','alpha','izin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `group_id`, `period_id`, `profile_id`, `selfie_image`, `date`, `location`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, NULL, '2024-01-10', NULL, 'hadir', '2024-12-20 17:25:31', '2024-12-20 17:25:31'),
(2, 2, 1, 3, NULL, '2024-01-10', NULL, 'hadir', '2024-12-20 17:25:31', '2024-12-20 17:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `challenge`
--

CREATE TABLE `challenge` (
  `challenge_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` date NOT NULL,
  `challenge_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenge`
--

INSERT INTO `challenge` (`challenge_id`, `title`, `description`, `due_date`, `challenge_image`, `created_at`, `updated_at`) VALUES
(1, 'Challenge 1', 'Buatlah video perkenalan kampus dengan durasi min 5 menit. upload di instagram dan gunakan caption semenarik mungkin.', '2024-06-30', NULL, '2024-12-20 17:25:32', '2024-12-20 17:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `challenge_submission`
--

CREATE TABLE `challenge_submission` (
  `submission_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `score` decimal(5,2) DEFAULT NULL,
  `submission_file` varchar(255) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `status` enum('submitted','reviewed','pending') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `challenge_submission`
--

INSERT INTO `challenge_submission` (`submission_id`, `challenge_id`, `profile_id`, `submission_date`, `score`, `submission_file`, `feedback`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2024-12-20 17:25:32', 80.00, 'path/to/challenge1_submission.mp4', 'Nice video!', 'submitted', '2024-12-20 17:25:32', '2024-12-20 17:25:32'),
(2, 1, 3, '2024-12-20 17:25:32', 75.00, 'path/to/challenge1_submission2.mp4', 'Good effort!', 'submitted', '2024-12-20 17:25:32', '2024-12-20 17:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` int(11) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `mentor1_id` int(11) DEFAULT NULL,
  `mentor2_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `group_name`, `mentor1_id`, `mentor2_id`, `created_at`, `updated_at`) VALUES
(1, 'Kelompok 1', 1, 2, '2024-12-20 17:25:31', '2024-12-20 17:25:31'),
(2, 'Kelompok 2', 3, 4, '2024-12-20 17:25:31', '2024-12-20 17:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `group_member`
--

CREATE TABLE `group_member` (
  `group_member_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_member`
--

INSERT INTO `group_member` (`group_member_id`, `group_id`, `period_id`, `profile_id`, `created_at`) VALUES
(1, 1, 1, 2, '2024-12-20 17:25:31'),
(2, 2, 1, 3, '2024-12-20 17:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `medical_history`
--

CREATE TABLE `medical_history` (
  `medical_history_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `disease_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_history`
--

INSERT INTO `medical_history` (`medical_history_id`, `profile_id`, `disease_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 2, 'Flu', 'Flu ringan, tidak perlu perawatan.', '2024-12-20 17:25:32', '2024-12-20 17:25:32'),
(2, 3, 'Alergi', 'Allergies to pollen, no medication required.', '2024-12-20 17:25:32', '2024-12-20 17:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `mentor`
--

CREATE TABLE `mentor` (
  `mentor_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentor`
--

INSERT INTO `mentor` (`mentor_id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Mentor 1', '2024-12-20 17:25:31', '2024-12-20 17:25:31'),
(2, 'Mentor 2', '2024-12-20 17:25:31', '2024-12-20 17:25:31'),
(3, 'Mentor 3', '2024-12-20 17:25:31', '2024-12-20 17:25:31'),
(4, 'Mentor 4', '2024-12-20 17:25:31', '2024-12-20 17:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `period`
--

CREATE TABLE `period` (
  `period_id` int(11) NOT NULL,
  `period_name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `period`
--

INSERT INTO `period` (`period_id`, `period_name`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, '2024', '2024-01-01', '2024-12-31', '2024-12-20 17:25:31', '2024-12-20 17:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `profile_picture`, `full_name`, `department`, `date_of_birth`, `gender`, `address`, `created_at`, `updated_at`) VALUES
(1, 1, 'admin_picture.jpg', 'Admin User', 'Information System', '1990-01-01', 'female', 'Admin Address', '2024-12-20 17:25:31', '2024-12-20 18:22:44'),
(2, 2, 'peserta1_picture.jpg', 'Peserta Satu', 'Engineering', '2000-02-02', 'female', 'Peserta Satu Address', '2024-12-20 17:25:31', '2024-12-20 17:25:31'),
(3, 3, 'peserta2_picture.jpg', 'Peserta Dua', 'Business', '2001-03-03', 'male', 'Peserta Dua Address', '2024-12-20 17:25:31', '2024-12-20 17:25:31');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` date NOT NULL,
  `task_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `description`, `due_date`, `task_image`, `created_at`, `updated_at`) VALUES
(1, 'Tugas 1', 'Buatlah ringkasan perkenalan kampus serta UMKM format pdf.', '2024-07-31', NULL, '2024-12-20 17:25:32', '2024-12-20 17:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `task_submission`
--

CREATE TABLE `task_submission` (
  `submission_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `submission_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `score` decimal(5,2) DEFAULT NULL,
  `submission_file` varchar(255) DEFAULT NULL,
  `submission_link` varchar(255) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `status` enum('submitted','reviewed','pending') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_submission`
--

INSERT INTO `task_submission` (`submission_id`, `task_id`, `profile_id`, `submission_date`, `score`, `submission_file`, `submission_link`, `feedback`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, '2024-12-20 17:25:32', 85.00, 'path/to/task1_submission.pdf', 'http://link-to-task1.com', ' Good job!', 'submitted', '2024-12-20 17:25:32', '2024-12-20 17:25:32'),
(2, 1, 3, '2024-12-20 17:25:32', NULL, 'path/to/task1_submission2.pdf', 'http://link-to-task1.com', NULL, 'pending', '2024-12-20 17:25:32', '2024-12-20 17:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `role` enum('admin','peserta') NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `role`, `password`, `email`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'password', 'meydivaintayeza@gmail.com', '2024-12-20 17:25:31', '2024-12-20 18:17:45'),
(2, 'peserta', 'password1', 'TatrianaWisa@gmail.com', '2024-12-20 17:25:31', '2024-12-20 18:19:32'),
(3, 'peserta', 'password2', 'JokoTingkir@gmail.com', '2024-12-20 17:25:31', '2024-12-20 18:17:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `period_id` (`period_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`challenge_id`);

--
-- Indexes for table `challenge_submission`
--
ALTER TABLE `challenge_submission`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `mentor1_id` (`mentor1_id`),
  ADD KEY `mentor2_id` (`mentor2_id`);

--
-- Indexes for table `group_member`
--
ALTER TABLE `group_member`
  ADD PRIMARY KEY (`group_member_id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `period_id` (`period_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`medical_history_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `mentor`
--
ALTER TABLE `mentor`
  ADD PRIMARY KEY (`mentor_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `period`
--
ALTER TABLE `period`
  ADD PRIMARY KEY (`period_id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `task_submission`
--
ALTER TABLE `task_submission`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `profile_id` (`profile_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `challenge`
--
ALTER TABLE `challenge`
  MODIFY `challenge_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `challenge_submission`
--
ALTER TABLE `challenge_submission`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `group_member`
--
ALTER TABLE `group_member`
  MODIFY `group_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medical_history`
--
ALTER TABLE `medical_history`
  MODIFY `medical_history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mentor`
--
ALTER TABLE `mentor`
  MODIFY `mentor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `period`
--
ALTER TABLE `period`
  MODIFY `period_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `task_submission`
--
ALTER TABLE `task_submission`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`period_id`) REFERENCES `period` (`period_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE;

--
-- Constraints for table `challenge_submission`
--
ALTER TABLE `challenge_submission`
  ADD CONSTRAINT `challenge_submission_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`challenge_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `challenge_submission_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE;

--
-- Constraints for table `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `group_ibfk_1` FOREIGN KEY (`mentor1_id`) REFERENCES `mentor` (`mentor_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `group_ibfk_2` FOREIGN KEY (`mentor2_id`) REFERENCES `mentor` (`mentor_id`) ON DELETE SET NULL;

--
-- Constraints for table `group_member`
--
ALTER TABLE `group_member`
  ADD CONSTRAINT `group_member_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_member_ibfk_2` FOREIGN KEY (`period_id`) REFERENCES `period` (`period_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_member_ibfk_3` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE;

--
-- Constraints for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD CONSTRAINT `medical_history_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE;

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `task_submission`
--
ALTER TABLE `task_submission`
  ADD CONSTRAINT `task_submission_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_submission_ibfk_2` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
