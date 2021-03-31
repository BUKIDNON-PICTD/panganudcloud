/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.6.45-log : Database - tagabukid_gis
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tagabukid_gis` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tagabukid_gis`;

/*Table structure for table `bukidnoncovid19_vac_surveys` */

DROP TABLE IF EXISTS `bukidnoncovid19_vac_surveys`;

CREATE TABLE `bukidnoncovid19_vac_surveys` (
  `objid` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `gender` varchar(50) NOT NULL,
  `civilstatus` varchar(50) NOT NULL,
  `mobileno` varchar(50) DEFAULT NULL,
  `address_province_code` varchar(50) NOT NULL,
  `address_province_lguname` varchar(50) NOT NULL,
  `address_municipality_code` varchar(50) NOT NULL,
  `address_municipality_lguname` varchar(50) NOT NULL,
  `address_barangay_code` varchar(50) NOT NULL,
  `address_barangay_lguname` varchar(50) NOT NULL,
  `address_street` varchar(50) NOT NULL,
  `answer` varchar(50) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedat` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`objid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `bukidnoncovid19_vac_surveys` */

insert  into `bukidnoncovid19_vac_surveys`(`objid`,`lastname`,`firstname`,`middlename`,`birthdate`,`gender`,`civilstatus`,`mobileno`,`address_province_code`,`address_province_lguname`,`address_municipality_code`,`address_municipality_lguname`,`address_barangay_code`,`address_barangay_lguname`,`address_street`,`answer`,`brand`,`reason`,`createdat`,`updatedat`) values 
('174aa3f1-b175-4503-8b13-9c54ce09d8ec','MONKEY','LUFFY','D','1982-12-31','M','SINGLE','09123456789','101300000','BUKIDNON','101312000','CITY OF MALAYBALAY (CAPITAL)','101312051','BARANGAY 8 (POB.)','EAST BLUE','UNDECIDED',NULL,'I will be the King of the Pirates','2021-01-22 09:57:56','2021-01-22 09:57:56'),
('4a8353ac-1014-4abe-8bd7-793531b8d15c','ROJAS','RALPH JIMBER','NAMOCA','1994-03-30','M','SINGLE','09751002322','101300000','BUKIDNON','101321000','CITY OF VALENCIA','101321001','BAGONTAAS','PUROK 3','YES','ASTRAZENECA','Approved','2021-01-22 14:42:08','2021-01-22 09:26:57'),
('4a8353ac-1abc-4abe-8bd7-793531b8d15c','KIZARU','BORSALINO','NAVY','2002-08-15','M','MARRIED','09751002322','101300000','BUKIDNON','101321000','CITY OF VALENCIA','101321001','BAGONTAAS','PUROK 3','YES','SINOVAC','Approved','2021-01-22 14:42:08','2021-01-22 09:26:57'),
('4a8353ac-1abc-4abe-8bd8-793531b8d15c','KUZAN','AOKEJI','NAVY','1945-08-15','M','MARRIED','09751002322','101300000','BUKIDNON','101321000','CITY OF VALENCIA','101321001','BAGONTAAS','PUROK 3','YES','SINOVAC','Approved','2021-01-22 14:42:08','2021-01-22 09:26:57'),
('4a8353Bc-1abc-4abe-8bd8-793531b8d15c','NAMI','STRAWHAT','PIRATE','1979-08-15','F','MARRIED','09751002322','101300000','BUKIDNON','101321000','CITY OF VALENCIA','101321001','BAGONTAAS','PUROK 3','YES','MODERNA','Approved','2021-01-26 11:05:28','2021-01-22 09:26:57'),
('4a83de1-1014-4abe-8bd7-793531b8d15c','HYUUGA','HINATA','UZUMAKI','1997-03-30','F','SINGLE','09751002322','101300000','BUKIDNON','101321000','CITY OF VALENCIA','101321001','BAGONTAAS','PUROK 3','YES','ASTRAZENECA','Approved','2021-01-26 11:08:32','2021-01-22 09:26:57'),
('4a83de1-a014-4abe-8bd7-793531b8d15c','INVERSE','LINA','R','1993-03-30','F','SINGLE','09751002322','101300000','BUKIDNON','101321000','CITY OF VALENCIA','101321001','BAGONTAAS','PUROK 3','UNDECIDED',NULL,'I\'m not convinced','2021-01-26 11:35:35','2021-01-22 09:26:57'),
('b39a71b1-19fd-4e6b-9af1-c495481d70dd','TEACH JR','MARSHALL','D','1969-07-23','M','SEPARATED','09871236543','101300000','BUKIDNON','101313000','MALITBOG','101313003','MINDAGAT','BLACKBEARD ISLAND','NO',NULL,'I\'m an emperor of the sea','2021-01-22 10:54:58','2021-01-22 10:54:58'),
('cd06592c-f7f6-4b5f-9198-4da81972165c','HARUNO','SAKURA','N','1994-01-22','F','SINGLE','21345678923','101300000','BUKIDNON','101322000','CABANGLASAN','101322010','CAPINONAN','EAST BLUE','NO',NULL,'Just for fun','2021-01-25 13:26:21','2021-01-22 09:42:19'),
('cd06592c-f7f6-4b5f-9198-4da81c02165c','ROGER','GOL','D','1974-01-22','M','SINGLE','21345678923','101300000','BUKIDNON','101322000','CABANGLASAN','101322010','CAPINONAN','EAST BLUE','NO',NULL,'Just for fun','2021-01-22 09:42:19','2021-01-22 09:42:19'),
('cd06592c-f7f6-4b5f-9198-4da93402165c','RAYLEIGH','SILVERS','R','1924-01-22','M','SINGLE','21345678923','101300000','BUKIDNON','101322000','CABANGLASAN','101322010','CAPINONAN','EAST BLUE','UNDECIDED',NULL,'I\'m the right hand of roger','2021-01-26 09:22:45','2021-01-22 09:42:19'),
('cd0abc2c-f7f6-4b5f-9198-4da81972165c','UCHIHA','SARADA','H','2012-01-22','F','SINGLE','21345678923','101300000','BUKIDNON','101322000','CABANGLASAN','101322010','CAPINONAN','EAST BLUE','YES','COVOVAX','Approved','2021-01-26 09:25:21','2021-01-22 09:42:19'),
('f0fb2eba-1edf-4a35-9aff-32345a5126e6','ROBIN','NICO','STRAWHAT','1956-04-21','F','MARRIED','09876543234','101300000','BUKIDNON','101312000','CITY OF MALAYBALAY (CAPITAL)','101312052','BARANGAY 9 (POB.)','SOUTH BLUE','YES','ASTRAZENECA','Approved','2021-01-22 14:42:08','2021-01-22 09:49:35'),
('f0fb2eba-1edf-4a35-9aff-3e64ea5126e6','ROUGE','PORTGAS','D','1986-04-22','F','SINGLE','09876543234','101300000','BUKIDNON','101312000','CITY OF MALAYBALAY (CAPITAL)','101312052','BARANGAY 9 (POB.)','GOD VALLEY','UNDECIDED',NULL,'I\'m strong','2021-01-22 09:49:35','2021-01-22 09:49:35');

/*Table structure for table `vw_bukidnoncovid19_vac_survey_agerange` */

DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_agerange`;

/*!50001 DROP VIEW IF EXISTS `vw_bukidnoncovid19_vac_survey_agerange` */;
/*!50001 DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_agerange` */;

/*!50001 CREATE TABLE  `vw_bukidnoncovid19_vac_survey_agerange`(
 `objid` varchar(50) ,
 `gender` varchar(50) ,
 `answer` varchar(50) ,
 `reason` varchar(100) ,
 `age` int(5) ,
 `agerange` varchar(11) 
)*/;

/*Table structure for table `vw_bukidnoncovid19_vac_survey_ages` */

DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_ages`;

/*!50001 DROP VIEW IF EXISTS `vw_bukidnoncovid19_vac_survey_ages` */;
/*!50001 DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_ages` */;

/*!50001 CREATE TABLE  `vw_bukidnoncovid19_vac_survey_ages`(
 `agerange` varchar(11) ,
 `YES` decimal(23,0) ,
 `NO` decimal(23,0) ,
 `UNDECIDED` decimal(23,0) 
)*/;

/*Table structure for table `vw_bukidnoncovid19_vac_survey_totals` */

DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_totals`;

/*!50001 DROP VIEW IF EXISTS `vw_bukidnoncovid19_vac_survey_totals` */;
/*!50001 DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_totals` */;

/*!50001 CREATE TABLE  `vw_bukidnoncovid19_vac_survey_totals`(
 `totalyes` decimal(23,0) ,
 `totalno` decimal(23,0) ,
 `totalundecided` decimal(23,0) ,
 `totalyesmale` decimal(23,0) ,
 `totalnomale` decimal(23,0) ,
 `totalundecidedmale` decimal(23,0) ,
 `totalyesfemale` decimal(23,0) ,
 `totalnofemale` decimal(23,0) ,
 `totalundecidedfemale` decimal(23,0) ,
 `a10below` decimal(23,0) ,
 `a11to20` decimal(23,0) ,
 `a21to30` decimal(23,0) ,
 `a31to40` decimal(23,0) ,
 `a41to50` decimal(23,0) ,
 `a51to60` decimal(23,0) ,
 `a61to70` decimal(23,0) ,
 `a71to80` decimal(23,0) ,
 `a81above` decimal(23,0) ,
 `totalmale` decimal(23,0) ,
 `totalfemale` decimal(23,0) ,
 `totalresponse` bigint(21) 
)*/;

/*View structure for view vw_bukidnoncovid19_vac_survey_agerange */

/*!50001 DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_agerange` */;
/*!50001 DROP VIEW IF EXISTS `vw_bukidnoncovid19_vac_survey_agerange` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_bukidnoncovid19_vac_survey_agerange` AS (select `v`.`objid` AS `objid`,`v`.`gender` AS `gender`,`v`.`answer` AS `answer`,`v`.`reason` AS `reason`,(year(now()) - year(`v`.`birthdate`)) AS `age`,(case when ((year(now()) - year(`v`.`birthdate`)) <= 10) then 'below10' when ((year(now()) - year(`v`.`birthdate`)) between 11 and 20) then '11-20' when ((year(now()) - year(`v`.`birthdate`)) between 21 and 30) then '21-30' when ((year(now()) - year(`v`.`birthdate`)) between 31 and 40) then '31-40' when ((year(now()) - year(`v`.`birthdate`)) between 41 and 50) then '41-50' when ((year(now()) - year(`v`.`birthdate`)) between 51 and 60) then '51-60' when ((year(now()) - year(`v`.`birthdate`)) between 61 and 70) then '61-70' when ((year(now()) - year(`v`.`birthdate`)) between 71 and 80) then '71-80' when ((year(now()) - year(`v`.`birthdate`)) >= 81) then 'above80' else 'invalid age' end) AS `agerange` from `bukidnoncovid19_vac_surveys` `v`) */;

/*View structure for view vw_bukidnoncovid19_vac_survey_ages */

/*!50001 DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_ages` */;
/*!50001 DROP VIEW IF EXISTS `vw_bukidnoncovid19_vac_survey_ages` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_bukidnoncovid19_vac_survey_ages` AS select `xx`.`agerange` AS `agerange`,sum(if((`xx`.`answer` = 'YES'),1,0)) AS `YES`,sum(if((`xx`.`answer` = 'NO'),1,0)) AS `NO`,sum(if((`xx`.`answer` = 'UNDECIDED'),1,0)) AS `UNDECIDED` from `vw_bukidnoncovid19_vac_survey_agerange` `xx` where (`xx`.`agerange` = 'below10') group by `xx`.`agerange` union select `xx`.`agerange` AS `agerange`,sum(if((`xx`.`answer` = 'YES'),1,0)) AS `YES`,sum(if((`xx`.`answer` = 'NO'),1,0)) AS `NO`,sum(if((`xx`.`answer` = 'UNDECIDED'),1,0)) AS `UNDECIDED` from `vw_bukidnoncovid19_vac_survey_agerange` `xx` group by `xx`.`agerange` */;

/*View structure for view vw_bukidnoncovid19_vac_survey_totals */

/*!50001 DROP TABLE IF EXISTS `vw_bukidnoncovid19_vac_survey_totals` */;
/*!50001 DROP VIEW IF EXISTS `vw_bukidnoncovid19_vac_survey_totals` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_bukidnoncovid19_vac_survey_totals` AS select sum(if((`vaxx`.`answer` = 'YES'),1,0)) AS `totalyes`,sum(if((`vaxx`.`answer` = 'NO'),1,0)) AS `totalno`,sum(if((`vaxx`.`answer` = 'UNDECIDED'),1,0)) AS `totalundecided`,sum(if(((`vaxx`.`gender` = 'M') and (`vaxx`.`answer` = 'YES')),1,0)) AS `totalyesmale`,sum(if(((`vaxx`.`gender` = 'M') and (`vaxx`.`answer` = 'NO')),1,0)) AS `totalnomale`,sum(if(((`vaxx`.`gender` = 'M') and (`vaxx`.`answer` = 'UNDECIDED')),1,0)) AS `totalundecidedmale`,sum(if(((`vaxx`.`gender` = 'F') and (`vaxx`.`answer` = 'YES')),1,0)) AS `totalyesfemale`,sum(if(((`vaxx`.`gender` = 'F') and (`vaxx`.`answer` = 'NO')),1,0)) AS `totalnofemale`,sum(if(((`vaxx`.`gender` = 'F') and (`vaxx`.`answer` = 'UNDECIDED')),1,0)) AS `totalundecidedfemale`,sum(if(((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 10),1,0)) AS `a10below`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 20) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 10)),1,0)) AS `a11to20`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 30) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 20)),1,0)) AS `a21to30`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 40) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 30)),1,0)) AS `a31to40`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 50) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 40)),1,0)) AS `a41to50`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 60) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 50)),1,0)) AS `a51to60`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 70) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 60)),1,0)) AS `a61to70`,sum(if((((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) <= 80) and ((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 70)),1,0)) AS `a71to80`,sum(if(((date_format(from_days((to_days(curdate()) - to_days(`vaxx`.`birthdate`))),'%Y') + 0) > 80),1,0)) AS `a81above`,sum(if((`vaxx`.`gender` = 'M'),1,0)) AS `totalmale`,sum(if((`vaxx`.`gender` = 'F'),1,0)) AS `totalfemale`,count(0) AS `totalresponse` from `bukidnoncovid19_vac_surveys` `vaxx` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
