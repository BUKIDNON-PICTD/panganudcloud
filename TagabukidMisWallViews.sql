/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.6.45-log : Database - tagabukid_hrmis
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

/*Table structure for table `vw_hrmis_office_casual_total` */

DROP TABLE IF EXISTS `vw_hrmis_office_casual_total`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_office_casual_total` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_office_casual_total` */;

/*!50001 CREATE TABLE  `vw_hrmis_office_casual_total`(
 `office` varchar(300) ,
 `totalCasual` bigint(21) 
)*/;

/*Table structure for table `vw_hrmis_office_jo_total` */

DROP TABLE IF EXISTS `vw_hrmis_office_jo_total`;

/*!50001 DROP VIEW IF EXISTS `vw_hrmis_office_jo_total` */;
/*!50001 DROP TABLE IF EXISTS `vw_hrmis_office_jo_total` */;

/*!50001 CREATE TABLE  `vw_hrmis_office_jo_total`(
 `office` varchar(300) ,
 `totalJO` bigint(21) 
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
 `gender` varchar(50) 
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

/*View structure for view vw_hrmis_office_casual_total */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_office_casual_total` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_office_casual_total` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_office_casual_total` AS select distinct `org`.`name` AS `office`,(select count(`cix`.`objid`) from ((((`hrmis_appointmentcasualitems` `cix` join `hrmis_appointmentcasual` `acx` on((`acx`.`objid` = `cix`.`parentid`))) join `hrmis_pds` `pdsx` on((`pdsx`.`objid` = `cix`.`pds_objid`))) join `hrmis_tblemploymentplantilla` `plantx` on((`plantx`.`objid` = `cix`.`plantilla_objid`))) join `references_tblorganizationunit` `orgx` on((`orgx`.`orgunitid` = `plantx`.`org_orgunitid`))) where ((`orgx`.`name` = `org`.`name`) and `cix`.`parentid` in (select `aco`.`objid` from `hrmis_appointmentcasual` `aco` where (`aco`.`effectiveuntil` > now())) and (not(`pdsx`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`))))) AS `totalCasual` from (((((`hrmis_appointmentcasual` `ac` join `hrmis_appointmentcasualitems` `ci` on((`ci`.`parentid` = `ac`.`objid`))) join `hrmis_pds` `pds` on((`pds`.`objid` = `ci`.`pds_objid`))) join `hrmis_tblemploymentplantilla` `plant` on((`plant`.`objid` = `ci`.`plantilla_objid`))) join `references_tbljobposition` `job` on((`job`.`objid` = `plant`.`jobposition_objid`))) join `references_tblorganizationunit` `org` on((`org`.`orgunitid` = `plant`.`org_orgunitid`))) where (`ci`.`parentid` in (select `ac`.`objid` from `hrmis_appointmentcasual` `ac` where (`ac`.`effectiveuntil` > now())) and (not(`pds`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`)))) order by `office` */;

/*View structure for view vw_hrmis_office_jo_total */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_office_jo_total` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_office_jo_total` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_office_jo_total` AS select distinct `org`.`name` AS `office`,(select count(`cix`.`objid`) from (((`hrmis_appointmentjoborderitems` `cix` join `hrmis_appointmentjoborder` `acx` on((`acx`.`objid` = `cix`.`parentid`))) join `hrmis_pds` `pdsx` on((`pdsx`.`objid` = `cix`.`pdsid`))) join `references_tblorganizationunit` `orgx` on((`orgx`.`orgunitid` = `acx`.`org_orgunitid`))) where ((`orgx`.`name` = `org`.`name`) and `cix`.`parentid` in (select `aco`.`objid` from `hrmis_appointmentjoborder` `aco` where (`aco`.`effectiveuntil` > now())) and (not(`pdsx`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`))))) AS `totalJO` from (((`hrmis_appointmentjoborder` `ac` join `hrmis_appointmentjoborderitems` `ci` on((`ci`.`parentid` = `ac`.`objid`))) join `hrmis_pds` `pds` on((`pds`.`objid` = `ci`.`pdsid`))) join `references_tblorganizationunit` `org` on((`org`.`orgunitid` = `ac`.`org_orgunitid`))) where (`ci`.`parentid` in (select `ac`.`objid` from `hrmis_appointmentjoborder` `ac` where (`ac`.`effectiveuntil` > now())) and (not(`pds`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`)))) order by `office` */;

/*View structure for view vw_hrmis_pds_all */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_pds_all` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_pds_all` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_pds_all` AS select `ac`.`status` AS `status`,`pds`.`person_name` AS `employee`,`org`.`name` AS `org`,`job`.`name` AS `position`,`pds`.`person_birthdate` AS `birthdate`,(date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) AS `age`,if(((date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) > 60),'YES','NO') AS `retirable`,`pds`.`person_civilstatus` AS `civilstatus`,`pds`.`person_gender` AS `gender` from (((((`hrmis_appointmentcasual` `ac` join `hrmis_appointmentcasualitems` `ci` on((`ci`.`parentid` = `ac`.`objid`))) join `hrmis_pds` `pds` on((`pds`.`objid` = `ci`.`pds_objid`))) join `hrmis_tblemploymentplantilla` `plant` on((`plant`.`objid` = `ci`.`plantilla_objid`))) join `references_tbljobposition` `job` on((`job`.`objid` = `plant`.`jobposition_objid`))) join `references_tblorganizationunit` `org` on((`org`.`orgunitid` = `plant`.`org_orgunitid`))) where (`ci`.`parentid` in (select `ac`.`objid` from `hrmis_appointmentcasual` `ac` where (`ac`.`effectiveuntil` > now())) and (not(`pds`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`)))) union select `ajo`.`status` AS `status`,`pds`.`person_name` AS `employee`,`org`.`name` AS `org`,`job`.`name` AS `position`,`pds`.`person_birthdate` AS `birthdate`,(date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) AS `age`,if(((date_format(from_days((to_days(curdate()) - to_days(`pds`.`person_birthdate`))),'%Y') + 0) > 60),'YES','NO') AS `retirable`,`pds`.`person_civilstatus` AS `civilstatus`,`pds`.`person_gender` AS `gender` from ((((`hrmis_appointmentjoborder` `ajo` join `hrmis_appointmentjoborderitems` `ajoi` on((`ajoi`.`parentid` = `ajo`.`objid`))) join `hrmis_pds` `pds` on((`pds`.`objid` = `ajoi`.`pdsid`))) join `references_tbljobposition` `job` on((`job`.`objid` = `ajoi`.`positionid`))) join `references_tblorganizationunit` `org` on((`org`.`orgunitid` = `ajo`.`org_orgunitid`))) where (`ajoi`.`parentid` in (select `hrmis_appointmentjoborder`.`objid` from `hrmis_appointmentjoborder` where (`hrmis_appointmentjoborder`.`effectiveuntil` > now())) and (not(`pds`.`objid` in (select `hrmis_serviceretire`.`pdsid` from `hrmis_serviceretire`)))) order by `employee` */;

/*View structure for view vw_hrmis_pds_totals */

/*!50001 DROP TABLE IF EXISTS `vw_hrmis_pds_totals` */;
/*!50001 DROP VIEW IF EXISTS `vw_hrmis_pds_totals` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_hrmis_pds_totals` AS select sum(if((`vw_hrmis_pds_all`.`status` = 'JO'),1,0)) AS `totalJO`,sum(if(((`vw_hrmis_pds_all`.`status` = 'JO') and (`vw_hrmis_pds_all`.`gender` = 'M')),1,0)) AS `totalMaleJO`,sum(if(((`vw_hrmis_pds_all`.`status` = 'JO') and (`vw_hrmis_pds_all`.`gender` = 'F')),1,0)) AS `totalFemaleJO`,sum(if((`vw_hrmis_pds_all`.`status` = 'CASUAL'),1,0)) AS `totalCasual`,sum(if(((`vw_hrmis_pds_all`.`status` = 'CASUAL') and (`vw_hrmis_pds_all`.`gender` = 'M')),1,0)) AS `totalMaleCasual`,sum(if(((`vw_hrmis_pds_all`.`status` = 'CASUAL') and (`vw_hrmis_pds_all`.`gender` = 'F')),1,0)) AS `totalFemaleCasual`,sum(if((`vw_hrmis_pds_all`.`retirable` = 'YES'),1,0)) AS `totalRetirable`,sum(if((`vw_hrmis_pds_all`.`retirable` = 'NO'),1,0)) AS `totalNotRetirable`,sum(if((`vw_hrmis_pds_all`.`gender` = 'M'),1,0)) AS `totalMale`,sum(if((`vw_hrmis_pds_all`.`gender` = 'F'),1,0)) AS `totalFemale`,count(0) AS `totalRecord` from `vw_hrmis_pds_all` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
