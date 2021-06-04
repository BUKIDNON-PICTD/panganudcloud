const { QueryTypes } = require("sequelize");
const db = require("../../config/tagabukidgisdb");

exports.bukidnoncovid19_view_summary = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NULL AND dtdied IS NULL, 1, 0)) AS totalactive,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NULL AND date_confirmed = DATE(NOW()) AND dtdied IS NULL, 1,0)) AS totalactivetoday,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared = DATE(NOW()) ,1,0)) AS totalrecoveredtoday,
        SUM(IF(date_confirmed IS NOT NULL AND dtdied IS NOT NULL, 1, 0)) AS totaldeceased,
        SUM(IF(date_confirmed IS NOT NULL AND dtdied = DATE(NOW()),1,0)) AS totaldeceasedtoday,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "", 1, 0)) AS totalconfirmed,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "" AND parentid IS NULL, 1, 0)) AS totalconfirmednonlocaltrans,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "" AND parentid IS NOT NULL, 1, 0)) AS totalconfirmedlocaltrans,
        SUM(IF(date_probable IS NOT NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalprobable,
        SUM(IF(date_probable = DATE(NOW()) AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalprobabletoday,
        SUM(IF(date_suspect IS NOT NULL AND date_probable IS NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalsuspect,
        SUM(IF(date_suspect = DATE(NOW()) AND date_probable  IS NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalsuspecttoday,
        SUM(IF(date_confirmed IS NULL AND date_cleared IS NOT NULL, 1, 0)) AS totalcompleted,
        SUM(IF(date_confirmed IS NULL AND date_cleared = DATE(NOW()), 1, 0)) AS totalcompletedtoday,
        SUM(IF((date_suspect IS NOT NULL OR date_probable IS NOT NULL) AND date_confirmed IS NULL AND date_cleared IS NULL AND dtqurantined IS NOT NULL, 1, 0)) AS totalquarantined,
        SUM(IF(date_confirmed IS NOT NULL AND person_gender = 'M', 1, 0)) AS totalconfirmedmale,
        SUM(IF(date_confirmed IS NOT NULL AND person_gender = 'F', 1, 0)) AS totalconfirmedfemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20, 1,0)) AS totalconfirmed20below,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20 AND person_gender = 'M', 1,0)) AS totalconfirmed20belowmale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20 AND person_gender = 'F', 1,0)) AS totalconfirmed20belowfemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60, 1,0)) AS totalconfirmed60above,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60 AND person_gender = 'M', 1,0)) AS totalconfirmed60abovemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60 AND person_gender = 'F', 1,0)) AS totalconfirmed60abovefemale
        FROM bukidnoncovid19
        WHERE address_muncity <> 'OUTSIDE BUKIDNON'`,
      { type: QueryTypes.SELECT }
    );
    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.bukidnoncovid19_view_municipality_dashboard = async (req, res) => {
  try {
    const { startdate, enddate, muncity } = req.query;
    const result = await db.query(
      `SELECT * FROM vw_covid19_summary_20200401_20210101
        UNION
        SELECT v.selected_date,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_confirmed = v.selected_date,1,0)) AS confirmedcase_selecteddate,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NOT NULL AND xx.date_cleared = v.selected_date,1,0)) AS recoveredcase_selecteddate,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.dtdied IS NOT NULL AND xx.dtdied = v.selected_date,1,0)) AS deceased_selecteddate,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_confirmed <= v.selected_date,1,0)) - SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NOT NULL AND xx.date_cleared <= v.selected_date,1,0)) - SUM(IF(xx.date_confirmed IS NOT NULL AND xx.dtdied IS NOT NULL AND xx.dtdied <= v.selected_date,1,0)) AS totalactive,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NOT NULL AND xx.date_cleared <= v.selected_date,1,0)) AS totalrecovered,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.dtdied IS NOT NULL AND xx.dtdied <= v.selected_date,1,0)) AS totaldeceased,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_confirmed <= v.selected_date,1,0)) AS totalconfirmed,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_confirmed <= v.selected_date AND xx.parentid IS NULL, 1, 0)) AS totalconfirmednonlocaltrans,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_confirmed <= v.selected_date AND xx.parentid IS NOT NULL, 1, 0)) AS totalconfirmedlocaltrans
        
        FROM 
        calendar v,
        bukidnoncovid19 xx
        WHERE v.selected_date BETWEEN '2021-06-01' AND :enddate
        AND xx.address_muncity LIKE :muncity
        AND xx.address_muncity <> 'OUTSIDE BUKIDNON'
        GROUP BY v.selected_date`,
      {
        replacements: {
          startdate: startdate,
          enddate: enddate,
          muncity:  muncity ? "%" + muncity + "%" : "%"
        },
        type: QueryTypes.SELECT,
      }
    );
    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.bukidnoncovid19_view_by_municipality_summary = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT address_muncity,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NULL AND dtdied IS NULL, 1, 0)) AS totalactive,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NULL AND date_confirmed = DATE(NOW()) AND dtdied IS NULL, 1,0)) AS totalactivetoday,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared = DATE(NOW()) ,1,0)) AS totalrecoveredtoday,
        SUM(IF(date_confirmed IS NOT NULL AND dtdied IS NOT NULL, 1, 0)) AS totaldeceased,
        SUM(IF(date_confirmed IS NOT NULL AND dtdied = DATE(NOW()),1,0)) AS totaldeceasedtoday,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "", 1, 0)) AS totalconfirmed,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "" AND parentid IS NULL, 1, 0)) AS totalconfirmednonlocaltrans,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "" AND parentid IS NOT NULL, 1, 0)) AS totalconfirmedlocaltrans,
        SUM(IF(date_probable IS NOT NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalprobable,
        SUM(IF(date_probable = DATE(NOW()) AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalprobabletoday,
        SUM(IF(date_suspect IS NOT NULL AND date_probable IS NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalsuspect,
        SUM(IF(date_suspect = DATE(NOW()) AND date_probable  IS NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalsuspecttoday,
        SUM(IF(date_confirmed IS NULL AND date_cleared IS NOT NULL, 1, 0)) AS totalcompleted,
        SUM(IF(date_confirmed IS NULL AND date_cleared = DATE(NOW()), 1, 0)) AS totalcompletedtoday,
        SUM(IF((date_suspect IS NOT NULL OR date_probable IS NOT NULL) AND date_confirmed IS NULL AND date_cleared IS NULL AND dtqurantined IS NOT NULL, 1, 0)) AS totalquarantined,
        SUM(IF(date_confirmed IS NOT NULL AND person_gender = 'M', 1, 0)) AS totalconfirmedmale,
        SUM(IF(date_confirmed IS NOT NULL AND person_gender = 'F', 1, 0)) AS totalconfirmedfemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20, 1,0)) AS totalconfirmed20below,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20 AND person_gender = 'M', 1,0)) AS totalconfirmed20belowmale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20 AND person_gender = 'F', 1,0)) AS totalconfirmed20belowfemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60, 1,0)) AS totalconfirmed60above,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60 AND person_gender = 'M', 1,0)) AS totalconfirmed60abovemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60 AND person_gender = 'F', 1,0)) AS totalconfirmed60abovefemale
        FROM bukidnoncovid19 
        WHERE address_muncity <> 'OUTSIDE BUKIDNON' 
        GROUP BY address_muncity
        
        UNION
        
        SELECT DISTINCT address_muncity,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NULL AND dtdied IS NULL, 1, 0)) AS totalactive,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NULL AND date_confirmed = DATE(NOW()) AND dtdied IS NULL, 1,0)) AS totalactivetoday,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
        SUM(IF(date_confirmed IS NOT NULL AND date_cleared = DATE(NOW()) ,1,0)) AS totalrecoveredtoday,
        SUM(IF(date_confirmed IS NOT NULL AND dtdied IS NOT NULL, 1, 0)) AS totaldeceased,
        SUM(IF(date_confirmed IS NOT NULL AND dtdied = DATE(NOW()),1,0)) AS totaldeceasedtoday,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "", 1, 0)) AS totalconfirmed,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "" AND parentid IS NULL, 1, 0)) AS totalconfirmednonlocaltrans,
        SUM(IF(date_confirmed IS NOT NULL AND date_confirmed <> "" AND parentid IS NOT NULL, 1, 0)) AS totalconfirmedlocaltrans,
        SUM(IF(date_probable IS NOT NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalprobable,
        SUM(IF(date_probable = DATE(NOW()) AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalprobabletoday,
        SUM(IF(date_suspect IS NOT NULL AND date_probable IS NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalsuspect,
        SUM(IF(date_suspect = DATE(NOW()) AND date_probable  IS NULL AND date_confirmed IS NULL AND date_cleared IS NULL, 1, 0)) AS totalsuspecttoday,
        SUM(IF(date_confirmed IS NULL AND date_cleared IS NOT NULL, 1, 0)) AS totalcompleted,
        SUM(IF(date_confirmed IS NULL AND date_cleared = DATE(NOW()), 1, 0)) AS totalcompletedtoday,
        SUM(IF((date_suspect IS NOT NULL OR date_probable IS NOT NULL) AND date_confirmed IS NULL AND date_cleared IS NULL AND dtqurantined IS NOT NULL, 1, 0)) AS totalquarantined,
        SUM(IF(date_confirmed IS NOT NULL AND person_gender = 'M', 1, 0)) AS totalconfirmedmale,
        SUM(IF(date_confirmed IS NOT NULL AND person_gender = 'F', 1, 0)) AS totalconfirmedfemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20, 1,0)) AS totalconfirmed20below,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20 AND person_gender = 'M', 1,0)) AS totalconfirmed20belowmale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) <= 20 AND person_gender = 'F', 1,0)) AS totalconfirmed20belowfemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60, 1,0)) AS totalconfirmed60above,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60 AND person_gender = 'M', 1,0)) AS totalconfirmed60abovemale,
        SUM(IF(date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(person_birthdate) >= 60 AND person_gender = 'F', 1,0)) AS totalconfirmed60abovefemale
        FROM bukidnoncovid19 
        WHERE address_muncity = 'OUTSIDE BUKIDNON' 
        GROUP BY address_muncity`,
      { type: QueryTypes.SELECT }
    );
    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.bukidnoncovid19_view_by_barangay_summary = async (req, res) => {
  try {
    const { muncity } = req.query;
    const result = await db.query(
      `SELECT UPPER(b.brgyname) as barangay,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_cleared IS NULL AND c.dtdied IS NULL, 1, 0)) AS totalactive,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_cleared IS NULL AND c.date_confirmed = DATE(NOW()) AND c.dtdied IS NULL, 1,0)) AS totalactivetoday,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_cleared = DATE(NOW()) ,1,0)) AS totalrecoveredtoday,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.dtdied IS NOT NULL, 1, 0)) AS totaldeceased,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.dtdied = DATE(NOW()),1,0)) AS totaldeceasedtoday,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_confirmed <> "", 1, 0)) AS totalconfirmed,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_confirmed <> "" AND parentid IS NULL, 1, 0)) AS totalconfirmednonlocaltrans,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.date_confirmed <> "" AND parentid IS NOT NULL, 1, 0)) AS totalconfirmedlocaltrans,
      SUM(IF(c.date_probable IS NOT NULL AND c.date_confirmed IS NULL AND c.date_cleared IS NULL, 1, 0)) AS totalprobable,
      SUM(IF(c.date_probable = DATE(NOW()) AND c.date_confirmed IS NULL AND c.date_cleared IS NULL, 1, 0)) AS totalprobabletoday,
      SUM(IF(c.date_suspect IS NOT NULL AND c.date_probable IS NULL AND c.date_confirmed IS NULL AND c.date_cleared IS NULL, 1, 0)) AS totalsuspect,
      SUM(IF(c.date_suspect = DATE(NOW()) AND c.date_probable  IS NULL AND c.date_confirmed IS NULL AND c.date_cleared IS NULL, 1, 0)) AS totalsuspecttoday,
      SUM(IF(c.date_confirmed IS NULL AND c.date_cleared IS NOT NULL, 1, 0)) AS totalcompleted,
      SUM(IF(c.date_confirmed IS NULL AND c.date_cleared = DATE(NOW()), 1, 0)) AS totalcompletedtoday,
      SUM(IF((c.date_suspect IS NOT NULL OR c.date_probable IS NOT NULL) AND c.date_confirmed IS NULL AND c.date_cleared IS NULL AND dtqurantined IS NOT NULL, 1, 0)) AS totalquarantined,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.person_gender = 'M', 1, 0)) AS totalconfirmedmale,
      SUM(IF(c.date_confirmed IS NOT NULL AND c.person_gender = 'F', 1, 0)) AS totalconfirmedfemale,
      SUM(IF(c.date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(c.person_birthdate) <= 20, 1,0)) AS totalconfirmed20below,
      SUM(IF(c.date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(c.person_birthdate) <= 20 AND c.person_gender = 'M', 1,0)) AS totalconfirmed20belowmale,
      SUM(IF(c.date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(c.person_birthdate) <= 20 AND c.person_gender = 'F', 1,0)) AS totalconfirmed20belowfemale,
      SUM(IF(c.date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(c.person_birthdate) >= 60, 1,0)) AS totalconfirmed60above,
      SUM(IF(c.date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(c.person_birthdate) >= 60 AND c.person_gender = 'M', 1,0)) AS totalconfirmed60abovemale,
      SUM(IF(c.date_confirmed IS NOT NULL AND YEAR(NOW()) - YEAR(c.person_birthdate) >= 60 AND c.person_gender = 'F', 1,0)) AS totalconfirmed60abovefemale
      FROM bukidnoncovid19 c
      INNER JOIN boundary_municipality m ON m.mun_city = c.address_muncity
      LEFT join boundary_barangay b on b.brgyname = c.address_barangay
      WHERE c.address_muncity = :muncity
      GROUP BY b.brgyname`,
      
      { 
        replacements: { muncity:  muncity  },
        type: QueryTypes.SELECT 
      }
    );
    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.bukidnoncovid19_view_agegroup_summary = async (req, res) => {

  try {
    const { muncity } = req.query;
    const result = await db.query(
      `SELECT xx.agerange,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NULL, 1, 0)) AS totalactive,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.dtdied IS NOT NULL, 1, 0)) AS totaldeceased
    FROM 
    (SELECT id,date_confirmed,date_cleared,dtdied, 
    CASE 
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) <= 10 THEN "below 10"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 11 AND 20 THEN "11-20"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 21 AND 30 THEN "21-30"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 31 AND 40 THEN "31-40"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 41 AND 50 THEN "41-50"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 51 AND 60 THEN "51-60"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 61 AND 70 THEN "61-70"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 71 AND 80 THEN "71-80"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) >= 81 THEN "above 81"
    ELSE "invalid age"
    END AS agerange
    FROM  bukidnoncovid19
    WHERE address_muncity LIKE :muncity
    AND address_muncity <> 'OUTSIDE BUKIDNON'
    ) xx
    WHERE xx.agerange = "below 10"
    
    
    UNION
    
    SELECT xx.agerange,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NULL, 1, 0)) AS totalactive,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.dtdied IS NOT NULL, 1, 0)) AS totaldeceased
    FROM 
    (SELECT id,date_confirmed,date_cleared,dtdied, 
    CASE 
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) <= 10 THEN "below 10"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 11 AND 20 THEN "11-20"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 21 AND 30 THEN "21-30"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 31 AND 40 THEN "31-40"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 41 AND 50 THEN "41-50"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 51 AND 60 THEN "51-60"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 61 AND 70 THEN "61-70"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 71 AND 80 THEN "71-80"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) >= 81 THEN "above 81"
    ELSE "invalid age"
    END AS agerange
    FROM  bukidnoncovid19
    WHERE address_muncity LIKE :muncity
    AND address_muncity <> 'OUTSIDE BUKIDNON') xx
    WHERE xx.agerange NOT IN ("below 10","above 81","invalid age")
    GROUP BY xx.agerange
    
    UNION
    
    SELECT xx.agerange,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NULL, 1, 0)) AS totalactive,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.date_cleared IS NOT NULL, 1, 0)) AS totalrecovered,
        SUM(IF(xx.date_confirmed IS NOT NULL AND xx.dtdied IS NOT NULL, 1, 0)) AS totaldeceased
    FROM 
    (SELECT id,date_confirmed,date_cleared,dtdied, 
    CASE 
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) <= 10 THEN "below 10"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 11 AND 20 THEN "11-20"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 21 AND 30 THEN "21-30"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 31 AND 40 THEN "31-40"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 41 AND 50 THEN "41-50"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 51 AND 60 THEN "51-60"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 61 AND 70 THEN "61-70"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) BETWEEN 71 AND 80 THEN "71-80"
    WHEN  YEAR(NOW()) - YEAR(person_birthdate) >= 81 THEN "above 81"
    ELSE "invalid age"
    END AS agerange
    FROM  bukidnoncovid19
    WHERE address_muncity LIKE :muncity
    AND address_muncity <> 'OUTSIDE BUKIDNON') xx
    WHERE xx.agerange = "above 81"`,
      {
        replacements: { muncity:  muncity ? "%" + muncity + "%" : "%"  },
        type: QueryTypes.SELECT,
      }
    );

    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getadar = async (req, res) => {

  try {
    const result = await db.query(
      `SELECT *,
      xx.totalcasesforpast2weeks/14 AS averageincidentcases,
      ((xx.totalcasesforpast2weeks/14)/xx.population) * 100000 As attackrate,
      CASE 
      WHEN ((xx.totalcasesforpast2weeks/14)/xx.population) * 100000 < 1 THEN "LOW"
      WHEN ((xx.totalcasesforpast2weeks/14)/xx.population) * 100000 > 7 THEN "HIGH"
      ELSE "MEDIUM"
      END AS adar
      FROM (
      SELECT p.municipality, 
      SUM(p.population2021) as population,
      (SELECT COUNT(*) FROM bukidnoncovid19 where address_muncity = p.municipality AND (date_confirmed BETWEEN DATE(NOW() - INTERVAL 14 DAY) AND DATE(NOW()))) as totalcasesforpast2weeks
      FROM population2021 p
      GROUP BY p.municipality)xx`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.gettwoweekgrowthrate = async (req, res) => {

  try {
    const result = await db.query(
      `SELECT *,
      xx.totalcasesforpast2weeks1/14 AS averageincidentcases1,
      ((xx.totalcasesforpast2weeks1/14)/xx.population) * 100000 As attackrate1,
      CASE 
      WHEN ((xx.totalcasesforpast2weeks1/14)/xx.population) * 100000 < 1 THEN "LOW"
      WHEN ((xx.totalcasesforpast2weeks1/14)/xx.population) * 100000 > 7 THEN "HIGH"
      ELSE "MEDIUM"
      END AS adar1,
      xx.totalcasesforpast2weeks2/14 AS averageincidentcases2,
      ((xx.totalcasesforpast2weeks2/14)/xx.population) * 100000 As attackrate2,
      CASE 
      WHEN ((xx.totalcasesforpast2weeks2/14)/xx.population) * 100000 < 1 THEN "LOW"
      WHEN ((xx.totalcasesforpast2weeks2/14)/xx.population) * 100000 > 7 THEN "HIGH"
      ELSE "MEDIUM"
      END AS adar2,
      ((totalcasesforpast2weeks1 - totalcasesforpast2weeks2) * 100)/totalcasesforpast2weeks2 AS growthrate,
      CASE 
      WHEN ((totalcasesforpast2weeks1 - totalcasesforpast2weeks2) * 100)/totalcasesforpast2weeks2 <= 0 THEN "LOW"
      WHEN ((totalcasesforpast2weeks1 - totalcasesforpast2weeks2) * 100)/totalcasesforpast2weeks2 > 200 THEN "HIGH"
      ELSE "MEDIUM"
      END AS twoweekgrowthrate
      FROM (
      SELECT p.municipality, 
      SUM(p.population2021) as population,
      (SELECT COUNT(*) FROM bukidnoncovid19 where address_muncity = p.municipality AND (date_confirmed BETWEEN DATE(NOW() - INTERVAL 14 DAY) AND DATE(NOW()))) as totalcasesforpast2weeks1,
      (SELECT COUNT(*) FROM bukidnoncovid19 where address_muncity = p.municipality AND (date_confirmed BETWEEN DATE(NOW() - INTERVAL 29 DAY) AND DATE(NOW() - INTERVAL 15 DAY))) as totalcasesforpast2weeks2
      FROM population2021 p
      GROUP BY p.municipality)xx;`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // const items = await Item.findOne();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

