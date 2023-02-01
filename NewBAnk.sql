-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: BANK
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `balance` bigint NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'current',
  `name` varchar(50) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`account_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (2,2,9900,'checking','User 2 Checking',0),(3,3,20100,'saving','User 3 Savings',0),(4,4,29800,'loan','User 4 Loan',0),(5,5,40200,'checking','User 5 Checking',0),(6,6,50000,'saving','User 6 Savings',0),(7,7,60000,'loan','User 7 Loan',0),(8,8,70000,'checking','User 8 Checking',0),(9,9,80000,'saving','User 9 Savings',0),(10,10,90000,'loan','User 10 Loan',0),(11,11,100000,'checking','User 11 Checking',0),(12,12,50000,'saving','User 12 Savings',0),(13,13,40000,'loan','User 13 Loan',0),(14,14,30000,'checking','User 14 Checking',0),(15,15,20000,'saving','User 15 Savings',0),(16,16,10000,'loan','User 16 Loan',0),(17,3,2000,'current','my current mosh',1),(18,3,3000,'current','my current mosh',0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cookie`
--

DROP TABLE IF EXISTS `cookie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cookie` (
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiration_date` date DEFAULT ((now() + interval 7 day)),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cookie`
--

LOCK TABLES `cookie` WRITE;
/*!40000 ALTER TABLE `cookie` DISABLE KEYS */;
INSERT INTO `cookie` VALUES (2,'fadsfdsf','2000-01-20'),(3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJwZXJtaXNzaW9uIjoyLCJpYXQiOjE2NzUxODA5ODZ9.YQNlTg9ygrKkS634CNws1QxTpYwBbWzd0ZO__zIDAz4','2023-02-07'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJwZXJtaXNzaW9uIjoyLCJpYXQiOjE2NzUxODEyMzd9.W1H9VwAdJ-1ye_niZ-y-HVnm1wm72He30SDb0U-JYrY','2023-02-07'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJwZXJtaXNzaW9uIjoyLCJpYXQiOjE2NzUyMzg3Mzh9.g18cx5LdJ-kZRG_M9KplL2mq00Y_YJB6hUE486tn9pA','2023-02-08'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwicGVybWlzc2lvbiI6MiwiaWF0IjoxNjc1MTgzMjcxfQ.4ilA-3CuYwokCSsEbGz_Kb3Mj8yqeh7B4aY0ve0zUM4','2023-02-07');
/*!40000 ALTER TABLE `cookie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit` (
  `credit_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `user_id` int NOT NULL,
  `credit_number` varchar(50) NOT NULL,
  `cvv` varchar(10) NOT NULL,
  `expiration` date NOT NULL,
  `company` varchar(50) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`credit_id`),
  KEY `account_id` (`account_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `credit_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `credit_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES (8,2,2,'1234123412341234','123','2025-01-01','Visa',0),(9,3,3,'2345234523452345','234','2026-01-01','Mastercard',0),(10,4,4,'34563456 34563456','345','2027-01-01','American Express',0),(11,5,5,'4567456745674567','456','2028-01-01','Discover',0),(12,6,6,'5677567756775677','567','2029-01-01','Visa',0),(13,7,7,'6778677867786778','678','2030-01-01','Mastercard',0),(14,8,8,'7787778777877787','779','2031-01-01','American Express',0),(15,9,9,'8788878887888788','878','2032-01-01','Discover',0),(16,10,10,'9780979097909790','979','2033-01-01','Visa',0),(17,11,11,'0880988098809880','880','2034-01-01','Mastercard',0),(18,12,12,'1988198919881989','989','2035-01-01','American Express',0),(19,13,13,'2981298129812981','981','2036-01-01','Discover',0),(20,14,14,'291129812982981','961','2032-01-01','Discover',0),(21,15,15,'9981448129812981','671','2031-04-01','Visa',0),(22,16,16,'8981298129812981','932','2028-06-01','Mastercard',0),(23,2,2,'4324234','321','2028-08-01','Visa',0),(24,2,2,'4324234','321','2028-08-01','Visa',0),(25,2,2,'4324234','321','2028-08-01','Visa',0),(26,2,2,'4324234','321','2028-08-01','Visa',0),(27,2,2,'4324234','321','2028-08-01','Visa',0);
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `identity_number` int NOT NULL,
  `address` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `phone` varchar(30) NOT NULL,
  `branch` varchar(100) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `identity_number_UNIQUE` (`identity_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,2,'John','Doe','johndoe@email.com',123456789,'123 Main St','1980-01-01','555-555-5555','NY'),(2,3,'Jane','Doe','janedoe@email.com',987654321,'456 Main St','1982-02-02','555-555-5556','LA'),(3,4,'Bob','Smith','bobsmith@email.com',122333444,'789 Main St','1984-03-03','555-555-5557','CHI'),(4,5,'Kim','Johnson','kimjohnson@email.com',222333444,'111 Main St','1986-04-04','555-555-5558','SF'),(5,6,'Jim','Brown','jimbrown@email.com',333444555,'222 Main St','1988-05-05','555-555-5559','ATL'),(6,7,'Alice','Jones','alicejones@email.com',444555666,'333 Main St','1990-06-06','555-555-5560','LA'),(7,8,'Paul','Miller','paulmiller@email.com',555666777,'444 Main St','1992-07-07','555-555-5561','NY'),(8,9,'Sarah','Davis','sarahdavis@email.com',666777888,'555 Main St','1994-08-08','555-555-5562','CHI'),(9,10,'Mike','Wilson','mikewilson@email.com',777880999,'666 Main St','1996-09-09','555-555-5563','ATL'),(10,11,'Jackson','Michael','mjackson321@gmail.com',234758649,'129 Main St','2002-09-24','054-3212233','NY'),(11,12,'Johnny','Cohen','jcohen1@gmail.com',378519087,'432 Main St','2006-09-22','054-3122233','LA'),(12,13,'Bohnny','Sean','bosean44@gmail.com',908732164,'125 Main St','2007-11-12','053-3212239','ATL'),(13,14,'Mohnny','Haim','haim21@gmail.com',543627819,'100 Main St','1955-09-24','052-3212999','LA'),(14,15,'Jonathan','Michael','jchael@gmail.com',732189473,'98 Main St','1990-09-24','050-3212233','SF'),(15,16,'Leonard','Michael','leonard33@gmail.com',127381190,'997 Main St','1987-12-24','054-1234543','CHI'),(18,21,'mosh','hamdani','mosh@gmail.com',987654464,'LA MainSt','2006-12-13','0876378765','IL');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Administrator'),(2,'Customer');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `sender_account_id` int NOT NULL,
  `reciever_account_id` int NOT NULL,
  `credit_id` int DEFAULT NULL,
  `amount` bigint NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'In Progress',
  PRIMARY KEY (`transaction_id`),
  KEY `fk_transaction_1_idx` (`sender_account_id`),
  KEY `fk_transaction_2_idx` (`reciever_account_id`),
  CONSTRAINT `fk_transaction_1` FOREIGN KEY (`sender_account_id`) REFERENCES `account` (`account_id`),
  CONSTRAINT `fk_transaction_2` FOREIGN KEY (`reciever_account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,2,3,NULL,100,'2023-01-30 12:05:45','hello','In Progress'),(2,4,5,NULL,200,'2023-01-30 12:13:49','heeeeello','completed'),(3,2,5,NULL,200,'2023-01-30 12:14:46','heeedddddeello','In Progress'),(19,2,10,8,600,'2023-01-01 00:00:00','Salary payment','Completed'),(20,3,5,9,850,'2023-01-02 00:00:00','Business expense','In Progress'),(21,4,6,NULL,130,'2023-01-03 00:00:00','Loan repayment','Not Approved'),(22,5,7,11,200,'2023-01-04 00:00:00','Online shopping','Completed'),(23,6,8,NULL,430,'2023-01-05 00:00:00','Investment','In Progress'),(24,7,9,13,750,'2023-01-06 00:00:00','Gift for friend','Not Approved'),(25,8,10,14,520,'2023-01-07 00:00:00','Rental payment','Completed'),(26,9,11,NULL,170,'2023-01-08 00:00:00','Car payment','In Progress'),(27,10,12,16,270,'2023-01-09 00:00:00','Utility bill payment','Not Approved'),(28,11,13,NULL,600,'2023-01-10 00:00:00','Travel expense','Completed'),(29,12,14,18,810,'2023-01-11 00:00:00','Mortgage payment','In Progress'),(30,13,15,19,150,'2023-01-12 00:00:00','Food expenses','Not Approved'),(31,14,9,NULL,350,'2023-01-13 00:00:00','Entertainment expense','Completed'),(32,15,2,21,420,'2023-01-14 00:00:00','Car maintenance','In Progress'),(33,3,4,NULL,780,'2023-01-15 00:00:00','Home renovation','Not Approved'),(34,2,10,23,200,'2023-01-15 00:00:00','HELO man','In Progress');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `permission_id` int NOT NULL,
  `blocked` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_1_idx` (`permission_id`),
  CONSTRAINT `fk_user_1` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'john123','p@ssword123',2,0),(3,'jane456','s3curepwd456',2,0),(4,'bob789','bobisproud',2,0),(5,'kim101','kimlovesdog',2,0),(6,'jimmy555','jimmyruns',2,0),(7,'alice123','alicejumps',2,0),(8,'paul777','paulreads',2,0),(9,'sarah999','sarahcooks',2,0),(10,'mike333','mikebikes',2,0),(11,'jackson123','jacksonsings',2,0),(12,'claire555','clairedances',2,0),(13,'samuel777','samuelhikes',2,0),(14,'lisa999','lisalovesart',2,0),(15,'derek123','derekdrives',2,0),(16,'emily555','emilyflies',2,0),(21,'mosh','mosh',2,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-01 12:29:45
