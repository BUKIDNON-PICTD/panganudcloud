/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.6.51-log : Database - tagabukid_hrmis
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tagabukid_hrmis` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `tagabukid_hrmis`;

/*Table structure for table `vw_hrmis_agegroup` */

DROP TABLE IF EXISTS `vw_hrmis_agegroup`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_agegroup` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_agegroup` */;

/*!50001 CREATE TABLE  `vw_hrmis_agegroup`(
 `employee` varchar(300) ,
 `age` double(17,0) ,
 `gender` varchar(50) ,
 `status` varchar(50) ,
 `position` longtext ,
 `agegroup` varchar(11) 
)*/;

/*Table structure for table `vw_hrmis_agegroup_total` */

DROP TABLE IF EXISTS `vw_hrmis_agegroup_total`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_agegroup_total` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_agegroup_total` */;

/*!50001 CREATE TABLE  `vw_hrmis_agegroup_total`(
 `agegroup` varchar(11) ,
 `totalJO` decimal(23,0) ,
 `totalCasual` decimal(23,0) ,
 `totalMale` decimal(23,0) ,
 `totalFemale` decimal(23,0) ,
 `totalCasualMale` decimal(23,0) ,
 `totalCasualFemale` decimal(23,0) ,
 `totalJOMale` decimal(23,0) ,
 `totalJOFemale` decimal(23,0) ,
 `total` bigint(21) 
)*/;

/*Table structure for table `vw_hrmis_eligibility` */

DROP TABLE IF EXISTS `vw_hrmis_eligibility`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_eligibility` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_eligibility` */;

/*!50001 CREATE TABLE  `vw_hrmis_eligibility`(
 `employee` varchar(300) ,
 `status` varchar(50) ,
 `gender` varchar(50) ,
 `org` varchar(300) ,
 `eligCount` bigint(21) ,
 `isEligible` varchar(3) 
)*/;

/*Table structure for table `vw_hrmis_eligibility_total` */

DROP TABLE IF EXISTS `vw_hrmis_eligibility_total`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_eligibility_total` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_eligibility_total` */;

/*!50001 CREATE TABLE  `vw_hrmis_eligibility_total`(
 `totalEligible` decimal(23,0) ,
 `totalNotEligible` decimal(23,0) ,
 `totalEligibleJO` decimal(23,0) ,
 `totalEligibleCasual` decimal(23,0) ,
 `totalNotEligibleJO` decimal(23,0) ,
 `totalNotEligibleCasual` decimal(23,0) ,
 `totalEligibleMale` decimal(23,0) ,
 `totalEligibleFemale` decimal(23,0) ,
 `totalNotEligibleMale` decimal(23,0) ,
 `totalNotEligibleFemale` decimal(23,0) ,
 `totalEligibleJOMale` decimal(23,0) ,
 `totalEligibleJOFemale` decimal(23,0) ,
 `totalNotEligibleJOMale` decimal(23,0) ,
 `totalNotEligibleJOFemale` decimal(23,0) ,
 `totalEligibleCasualMale` decimal(23,0) ,
 `totalEligibleCasualFemale` decimal(23,0) ,
 `totalNotEligibleCasualMale` decimal(23,0) ,
 `totalNotEligibleCasualFemale` decimal(23,0) ,
 `total` bigint(21) 
)*/;

/*Table structure for table `vw_hrmis_office_total` */

DROP TABLE IF EXISTS `vw_hrmis_office_total`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_office_total` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_office_total` */;

/*!50001 CREATE TABLE  `vw_hrmis_office_total`(
 `org` varchar(300) ,
 `Male` decimal(23,0) ,
 `Female` decimal(23,0) ,
 `TotalJO` decimal(23,0) ,
 `TotalJOMale` decimal(23,0) ,
 `TotalJOFemale` decimal(23,0) ,
 `TotalCasualMale` decimal(23,0) ,
 `TotalCasualFemale` decimal(23,0) ,
 `TotalCasual` decimal(23,0) ,
 `Total` bigint(21) 
)*/;

/*Table structure for table `vw_hrmis_pds_all` */

DROP TABLE IF EXISTS `vw_hrmis_pds_all`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_pds_all` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_pds_all` */;

/*!50001 CREATE TABLE  `vw_hrmis_pds_all`(
 `status` varchar(50) ,
 `employee` varchar(300) ,
 `org` varchar(300) ,
 `position` longtext ,
 `birthdate` date ,
 `age` double(17,0) ,
 `retirable` varchar(3) ,
 `civilstatus` varchar(50) ,
 `gender` varchar(50) ,
 `pdsid` varchar(50) 
)*/;

/*Table structure for table `vw_hrmis_pds_totals` */

DROP TABLE IF EXISTS `vw_hrmis_pds_totals`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_pds_totals` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_pds_totals` */;

/*!50001 CREATE TABLE  `vw_hrmis_pds_totals`(
 `totalJO` decimal(23,0) ,
 `totalMaleJO` decimal(23,0) ,
 `totalFemaleJO` decimal(23,0) ,
 `totalCasual` decimal(23,0) ,
 `totalMaleCasual` decimal(23,0) ,
 `totalFemaleCasual` decimal(23,0) ,
 `totalRetirable` decimal(23,0) ,
 `totalNotRetirable` decimal(23,0) ,
 `totalMale` decimal(23,0) ,
 `totalFemale` decimal(23,0) ,
 `totalRecord` bigint(21) 
)*/;

/*Table structure for table `vw_hrmis_position_total` */

DROP TABLE IF EXISTS `vw_hrmis_position_total`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_position_total` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_position_total` */;

/*!50001 CREATE TABLE  `vw_hrmis_position_total`(
 `position` longtext ,
 `JO` decimal(23,0) ,
 `Casual` decimal(23,0) ,
 `Male` decimal(23,0) ,
 `Female` decimal(23,0) ,
 `JOMale` decimal(23,0) ,
 `JOFemale` decimal(23,0) ,
 `CasualMale` decimal(23,0) ,
 `CasualFemale` decimal(23,0) ,
 `Total` bigint(21) 
)*/;

/*View structure for view vw_hrmis_agegroup */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_agegroup` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_agegroup` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_agegroup` AS select `vw_hrmis_pds_all`.`employee` AS `employee`,`vw_hrmis_pds_all`.`age` AS `age`,`vw_hrmis_pds_all`.`gender` AS `gender`,`vw_hrmis_pds_all`.`status` AS `status`,`vw_hrmis_pds_all`.`position` AS `position`,(case when (`vw_hrmis_pds_all`.`age` < 20) then 'below20' when ((`vw_hrmis_pds_all`.`age` >= 20) and (`vw_hrmis_pds_all`.`age` < 30)) then '20to29' when ((`vw_hrmis_pds_all`.`age` >= 30) and (`vw_hrmis_pds_all`.`age` < 40)) then '30to39' when ((`vw_hrmis_pds_all`.`age` >= 40) and (`vw_hrmis_pds_all`.`age` < 50)) then '40to49' when ((`vw_hrmis_pds_all`.`age` >= 50) and (`vw_hrmis_pds_all`.`age` < 60)) then '50to59' when (`vw_hrmis_pds_all`.`age` >= 60) then '60above' else 'invalid age' end) AS `agegroup` from `vw_hrmis_pds_all` */;

/*View structure for view vw_hrmis_agegroup_total */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_agegroup_total` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_agegroup_total` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_agegroup_total` AS select `yy`.`agegroup` AS `agegroup`,sum(if((`yy`.`status` = 'jo'),1,0)) AS `totalJO`,sum(if((`yy`.`status` = 'casual'),1,0)) AS `totalCasual`,sum(if((`yy`.`gender` = 'm'),1,0)) AS `totalMale`,sum(if((`yy`.`gender` = 'f'),1,0)) AS `totalFemale`,sum(if(((`yy`.`status` = 'casual') and (`yy`.`gender` = 'm')),1,0)) AS `totalCasualMale`,sum(if(((`yy`.`status` = 'casual') and (`yy`.`gender` = 'f')),1,0)) AS `totalCasualFemale`,sum(if(((`yy`.`status` = 'jo') and (`yy`.`gender` = 'm')),1,0)) AS `totalJOMale`,sum(if(((`yy`.`status` = 'jo') and (`yy`.`gender` = 'f')),1,0)) AS `totalJOFemale`,count(0) AS `total` from `vw_hrmis_agegroup` `yy` where (`yy`.`agegroup` = 'below20') union select `xx`.`agegroup` AS `agegroup`,sum(if((`xx`.`status` = 'jo'),1,0)) AS `totalJO`,sum(if((`xx`.`status` = 'casual'),1,0)) AS `totalCasual`,sum(if((`xx`.`gender` = 'm'),1,0)) AS `totalMale`,sum(if((`xx`.`gender` = 'f'),1,0)) AS `totalFemale`,sum(if(((`xx`.`status` = 'casual') and (`xx`.`gender` = 'm')),1,0)) AS `totalCasualMale`,sum(if(((`xx`.`status` = 'casual') and (`xx`.`gender` = 'f')),1,0)) AS `totalCasualFemale`,sum(if(((`xx`.`status` = 'jo') and (`xx`.`gender` = 'm')),1,0)) AS `totalJOMale`,sum(if(((`xx`.`status` = 'jo') and (`xx`.`gender` = 'f')),1,0)) AS `totalJOFemale`,count(0) AS `total` from `vw_hrmis_agegroup` `xx` group by `xx`.`agegroup` */;

/*View structure for view vw_hrmis_eligibility */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_eligibility` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_eligibility` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_eligibility` AS select `xx`.`employee` AS `employee`,`xx`.`status` AS `status`,`xx`.`gender` AS `gender`,`xx`.`org` AS `org`,count(`csc`.`objid`) AS `eligCount`,if((`csc`.`objid` is not null),'YES','NO') AS `isEligible` from (`vw_hrmis_pds_all` `xx` left join `hrmis_pds_civilservice` `csc` on((`csc`.`pdsid` = `xx`.`pdsid`))) group by `xx`.`employee` */;

/*View structure for view vw_hrmis_eligibility_total */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_eligibility_total` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_eligibility_total` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_eligibility_total` AS select sum(if((`vw_hrmis_eligibility`.`isEligible` = 'YES'),1,0)) AS `totalEligible`,sum(if((`vw_hrmis_eligibility`.`isEligible` = 'NO'),1,0)) AS `totalNotEligible`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`status` = 'JO')),1,0)) AS `totalEligibleJO`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`status` = 'Casual')),1,0)) AS `totalEligibleCasual`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`status` = 'JO')),1,0)) AS `totalNotEligibleJO`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`status` = 'Casual')),1,0)) AS `totalNotEligibleCasual`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`gender` = 'm')),1,0)) AS `totalEligibleMale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`gender` = 'f')),1,0)) AS `totalEligibleFemale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`gender` = 'm')),1,0)) AS `totalNotEligibleMale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`gender` = 'f')),1,0)) AS `totalNotEligibleFemale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`status` = 'JO') and (`vw_hrmis_eligibility`.`gender` = 'm')),1,0)) AS `totalEligibleJOMale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`status` = 'JO') and (`vw_hrmis_eligibility`.`gender` = 'f')),1,0)) AS `totalEligibleJOFemale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`status` = 'JO') and (`vw_hrmis_eligibility`.`gender` = 'm')),1,0)) AS `totalNotEligibleJOMale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`status` = 'JO') and (`vw_hrmis_eligibility`.`gender` = 'f')),1,0)) AS `totalNotEligibleJOFemale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`status` = 'Casual') and (`vw_hrmis_eligibility`.`gender` = 'm')),1,0)) AS `totalEligibleCasualMale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'YES') and (`vw_hrmis_eligibility`.`status` = 'Casual') and (`vw_hrmis_eligibility`.`gender` = 'f')),1,0)) AS `totalEligibleCasualFemale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`status` = 'Casual') and (`vw_hrmis_eligibility`.`gender` = 'm')),1,0)) AS `totalNotEligibleCasualMale`,sum(if(((`vw_hrmis_eligibility`.`isEligible` = 'NO') and (`vw_hrmis_eligibility`.`status` = 'Casual') and (`vw_hrmis_eligibility`.`gender` = 'f')),1,0)) AS `totalNotEligibleCasualFemale`,count(1) AS `total` from `vw_hrmis_eligibility` */;

/*View structure for view vw_hrmis_office_total */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_office_total` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_office_total` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_office_total` AS select `vw_hrmis_pds_all`.`org` AS `org`,sum(if((`vw_hrmis_pds_all`.`gender` = 'm'),1,0)) AS `Male`,sum(if((`vw_hrmis_pds_all`.`gender` = 'f'),1,0)) AS `Female`,sum(if((`vw_hrmis_pds_all`.`status` = 'jo'),1,0)) AS `TotalJO`,sum(if(((`vw_hrmis_pds_all`.`status` = 'jo') and (`vw_hrmis_pds_all`.`gender` = 'm')),1,0)) AS `TotalJOMale`,sum(if(((`vw_hrmis_pds_all`.`status` = 'jo') and (`vw_hrmis_pds_all`.`gender` = 'f')),1,0)) AS `TotalJOFemale`,sum(if(((`vw_hrmis_pds_all`.`status` = 'casual') and (`vw_hrmis_pds_all`.`gender` = 'm')),1,0)) AS `TotalCasualMale`,sum(if(((`vw_hrmis_pds_all`.`status` = 'casual') and (`vw_hrmis_pds_all`.`gender` = 'f')),1,0)) AS `TotalCasualFemale`,sum(if((`vw_hrmis_pds_all`.`status` = 'casual'),1,0)) AS `TotalCasual`,count(`vw_hrmis_pds_all`.`org`) AS `Total` from `vw_hrmis_pds_all` group by `vw_hrmis_pds_all`.`org` */;

/*View structure for view vw_hrmis_pds_all */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_pds_all` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_pds_all` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_pds_all` AS select `ac`.`status` AS `status`,`pds`.`person_name` AS `employee`,`org`.`name` AS `org`,`job`.`name` AS `position`,`pds`.`person_birthdate` AS `birthdate`,(date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) AS `age`,if(((date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) >= 60),'YES','NO') AS `retirable`,`pds`.`person_civilstatus` AS `civilstatus`,`pds`.`person_gender` AS `gender`,`pds`.`objid` AS `pdsid` from (((((`hrmis_appointmentcasual` `ac` join `hrmis_appointmentcasualitems` `ci` on((`ci`.`parentid` = `ac`.`objid`))) join `hrmis_pds` `pds` on((`pds`.`objid` = `ci`.`pds_objid`))) join `hrmis_tblemploymentplantilla` `plant` on((`plant`.`objid` = `ci`.`plantilla_objid`))) join `references_tbljobposition` `job` on((`job`.`objid` = `plant`.`jobposition_objid`))) join `references_tblorganizationunit` `org` on((`org`.`orgunitid` = `plant`.`org_orgunitid`))) where (`ci`.`parentid` in (select `ac`.`objid` from `hrmis_appointmentcasual` `ac` where (`ac`.`effectiveuntil` > now())) and (not(`pds`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`)))) union select `ajo`.`status` AS `status`,`pds`.`person_name` AS `employee`,`org`.`name` AS `org`,`job`.`name` AS `position`,`pds`.`person_birthdate` AS `birthdate`,(date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) AS `age`,if(((date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) >= 60),'YES','NO') AS `retirable`,`pds`.`person_civilstatus` AS `civilstatus`,`pds`.`person_gender` AS `gender`,`pds`.`objid` AS `pdsid` from ((((`hrmis_appointmentjoborder` `ajo` join `hrmis_appointmentjoborderitems` `ajoi` on((`ajoi`.`parentid` = `ajo`.`objid`))) join `hrmis_pds` `pds` on((`pds`.`objid` = `ajoi`.`pdsid`))) join `references_tbljobposition` `job` on((`job`.`objid` = `ajoi`.`positionid`))) join `references_tblorganizationunit` `org` on((`org`.`orgunitid` = `ajo`.`org_orgunitid`))) where (`ajoi`.`parentid` in (select `hrmis_appointmentjoborder`.`objid` from `hrmis_appointmentjoborder` where (`hrmis_appointmentjoborder`.`effectiveuntil` > now())) and (not(`pds`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`)))) order by `employee` */;

/*View structure for view vw_hrmis_pds_totals */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_pds_totals` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_pds_totals` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_pds_totals` AS select sum(if((`vw_hrmis_pds_all`.`status` = 'JO'),1,0)) AS `totalJO`,sum(if(((`vw_hrmis_pds_all`.`status` = 'JO') and (`vw_hrmis_pds_all`.`gender` = 'M')),1,0)) AS `totalMaleJO`,sum(if(((`vw_hrmis_pds_all`.`status` = 'JO') and (`vw_hrmis_pds_all`.`gender` = 'F')),1,0)) AS `totalFemaleJO`,sum(if((`vw_hrmis_pds_all`.`status` = 'CASUAL'),1,0)) AS `totalCasual`,sum(if(((`vw_hrmis_pds_all`.`status` = 'CASUAL') and (`vw_hrmis_pds_all`.`gender` = 'M')),1,0)) AS `totalMaleCasual`,sum(if(((`vw_hrmis_pds_all`.`status` = 'CASUAL') and (`vw_hrmis_pds_all`.`gender` = 'F')),1,0)) AS `totalFemaleCasual`,sum(if((`vw_hrmis_pds_all`.`retirable` = 'YES'),1,0)) AS `totalRetirable`,sum(if((`vw_hrmis_pds_all`.`retirable` = 'NO'),1,0)) AS `totalNotRetirable`,sum(if((`vw_hrmis_pds_all`.`gender` = 'M'),1,0)) AS `totalMale`,sum(if((`vw_hrmis_pds_all`.`gender` = 'F'),1,0)) AS `totalFemale`,count(0) AS `totalRecord` from `vw_hrmis_pds_all` */;

/*View structure for view vw_hrmis_position_total */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_position_total` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_position_total` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_position_total` AS select `vw_hrmis_pds_all`.`position` AS `position`,sum(if((`vw_hrmis_pds_all`.`status` = 'JO'),1,0)) AS `JO`,sum(if((`vw_hrmis_pds_all`.`status` = 'casual'),1,0)) AS `Casual`,sum(if((`vw_hrmis_pds_all`.`gender` = 'm'),1,0)) AS `Male`,sum(if((`vw_hrmis_pds_all`.`gender` = 'f'),1,0)) AS `Female`,sum(if(((`vw_hrmis_pds_all`.`status` = 'JO') and (`vw_hrmis_pds_all`.`gender` = 'm')),1,0)) AS `JOMale`,sum(if(((`vw_hrmis_pds_all`.`status` = 'JO') and (`vw_hrmis_pds_all`.`gender` = 'f')),1,0)) AS `JOFemale`,sum(if(((`vw_hrmis_pds_all`.`status` = 'casual') and (`vw_hrmis_pds_all`.`gender` = 'm')),1,0)) AS `CasualMale`,sum(if(((`vw_hrmis_pds_all`.`status` = 'casual') and (`vw_hrmis_pds_all`.`gender` = 'f')),1,0)) AS `CasualFemale`,count(`vw_hrmis_pds_all`.`position`) AS `Total` from `vw_hrmis_pds_all` group by `vw_hrmis_pds_all`.`position` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
