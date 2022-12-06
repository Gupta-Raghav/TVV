const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
var cors = require('cors');
const config = {
    user: "saxena.prakhar",
    password: "jIiJwONpi8CG1uRk9h7fwIlR",
    connectionString: "oracle.cise.ufl.edu:1521/orcl",
};
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
oracledb.initOracleClient({ libDir: "C:\\Users\\91977\\Downloads\\instantclient_21_7" });
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/q1', async function(req, res) {
    //res.send({ express: 'Hello From Express' });
    let conn;
    try {
        conn = await oracledb.getConnection(config);

        const result = await conn.execute(
            `SELECT YearSeasonTotal.Year,
            season,
            COUNTofSeason*100/totalofYear AS percentage
     FROM
       (SELECT YEAR,
               season,
               count(seqid) AS COUNTofSeason
        FROM
          (SELECT seqid,
                  Extract(YEAR
                          FROM v.date_time) YEAR,
                                            CASE WHEN Extract(MONTH
                                                              FROM v.date_time) = 12
           OR Extract(MONTH
                      FROM v.date_time) = 1
           OR Extract(MONTH
                      FROM v.date_time) = 2 THEN 'Winter' WHEN Extract(MONTH
                                                                       FROM v.date_time) = 3
           OR Extract(MONTH
                      FROM v.date_time) = 4
           OR Extract(MONTH
                      FROM v.date_time) = 5 THEN 'Spring' WHEN Extract(MONTH
                                                                       FROM v.date_time) = 6
           OR Extract(MONTH
                      FROM v.date_time) = 7
           OR Extract(MONTH
                      FROM v.date_time) = 8 THEN 'Summer' WHEN Extract(MONTH
                                                                       FROM v.date_time) = 9
           OR Extract(MONTH
                      FROM v.date_time) = 10
           OR Extract(MONTH
                      FROM v.date_time) = 11 THEN 'Autumn' END season
           FROM "ALIYA.ABDULLAH".violation v ,
                "ALIYA.ABDULLAH".factors f
           WHERE f.factorid = v.factorid
             AND f.fatal = 'Yes'
             and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
             )
        GROUP BY YEAR,
                 season
        ORDER BY YEAR,
                 SEASON) YearSeasonTotal,
       (SELECT EXTRACT(YEAR
                       FROM v.date_time) YEAR,
                                         COUNT(*) totalofYear
        FROM "ALIYA.ABDULLAH".violation v
        JOIN "ALIYA.ABDULLAH".factors f ON v.factorid = f.factorid
        JOIN
          (SELECT LEVEL AS MONTH,
                           CASE WHEN LEVEL = 12
           OR LEVEL = 1
           OR LEVEL = 2 THEN 'Winter' WHEN LEVEL = 3
           OR LEVEL = 4
           OR LEVEL = 5 THEN 'Spring' WHEN LEVEL = 6
           OR LEVEL = 7
           OR LEVEL = 8 THEN 'Summer' WHEN LEVEL = 9
           OR LEVEL = 10
           OR LEVEL = 11 THEN 'Autumn' END AS season
           FROM dual CONNECT BY LEVEL <= 12) sea ON sea.MONTH = EXTRACT(MONTH
                                                                        FROM v.date_time)
        WHERE f.fatal = 'Yes'
        and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
        GROUP BY EXTRACT(YEAR
                         FROM v.date_time)
        ORDER BY YEAR) yearTotal
     WHERE yearTotal.year = YearSeasonTotal.year
     `,
     [req.body.startDate,req.body.endDate,req.body.startDate,req.body.endDate],
            {
                outFormat: oracledb.OBJECT
            }
        );

        res.send(JSON.stringify(result));
        //console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
});



app.post('/api/q2', async function(req, res) {
    //res.send({ express: 'Hello From Express' });
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        console.log(req);
        console.log(req.body.startDate);
        console.log(req.body.endDate);
        const result = await conn.execute(
            `SELECT extract(YEAR FROM v.date_time) year,
            extract(MONTH FROM v.date_time) month,
            race,
            count(*) count
     FROM
     -- START select violations that occured in the top 10 penal codes
       (SELECT *
        FROM "ALIYA.ABDULLAH".violation v,
             "ALIYA.ABDULLAH".penalcode pc
        WHERE pc.title IN
     -- START select top 10 penal codes that violations are related to
            (SELECT title
             FROM
               (SELECT title,
                       count(*) AS COUNT
                FROM "ALIYA.ABDULLAH".violation v,
                     "ALIYA.ABDULLAH".penalcode pc
                WHERE v.charge = pc.pcid 
                and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
                GROUP BY pc.title
                ORDER BY COUNT DESC FETCH FIRST 10 ROWS ONLY)
             )
     -- END
        AND v.charge = pc.pcid) v,
     -- END, now join with driver to get race of the violator
         "ALIYA.ABDULLAH".driver drv
         WHERE drv.seqid = v.seqid
         and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
     GROUP BY extract(YEAR FROM v.date_time),
              extract(MONTH FROM v.date_time),
              race
     ORDER BY extract(YEAR FROM v.date_time),
              extract(MONTH FROM v.date_time),
              race`,
            [req.body.startDate,req.body.endDate,req.body.startDate,req.body.endDate],
            {
                outFormat: oracledb.OBJECT
            }
        );

        res.send(JSON.stringify(result));
        //console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
});

app.post('/api/qa', async function(req, res) {
    //res.send({ express: 'Hello From Express' });
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        
        const result = await conn.execute(
            `select count(*) count FROM "ALIYA.ABDULLAH".violation v`,
            {},
            {
                outFormat: oracledb.OBJECT
            }
        );
        
        res.send(JSON.stringify(result));
        //console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
});

// app.get('/api/q21', async function(req, res) {
//     //res.send({ express: 'Hello From Express' });
//     let conn;
//     try {
//         conn = await oracledb.getConnection(config);

//         const result = await conn.execute(
//             'SELECT COUNT(*) from "SINHA.KSHITIJ".observation',
//             {},
//             {
//                 outFormat: oracledb.OBJECT
//             }
//         );

//         res.send(JSON.stringify(result));
//         //console.log(result);
//     } catch (err) {
//         console.log('Ouch!', err);
//     } finally {
//         if (conn) {
//             // conn assignment worked, need to close
//             await conn.close();
//         }
//     }
// });

app.post('/api/q3', async function(req, res) {
    //res.send({ express: 'Hello From Express' });
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        // let st = req.state;
        // let pol = req.pollutant;
        console.log(req.body);
        const result = await conn.execute(
            `SELECT YEAR,
            quarter,
            make,
            count(*) COUNT
     FROM
       (SELECT extract(YEAR FROM v.date_time) YEAR, quarters.quarter, vt.make
        FROM "ALIYA.ABDULLAH".violation v
            JOIN "ALIYA.ABDULLAH".driver drv ON v.seqid=drv.seqid
            JOIN "ALIYA.ABDULLAH".VehicleType vt ON drv.vid=vt.vid
            JOIN "ALIYA.ABDULLAH".factors fac
                        on v.factorid = fac.factorid,
              (SELECT LEVEL AS MONTH,
                     CASE 
                         WHEN LEVEL BETWEEN 1 AND 3 THEN '1st quarter' 
                         WHEN LEVEL BETWEEN 4 AND 6 THEN '2nd quarter' 
                         WHEN LEVEL BETWEEN 7 AND 9 THEN '3rd quarter' 
                         WHEN LEVEL BETWEEN 10 AND 12 THEN'4th quarter' 
                     END AS quarter
               FROM dual CONNECT BY LEVEL <= 12
               ) quarters
        WHERE fac.personal_injury='Yes' AND quarters.month = extract(MONTH FROM v.date_time)
        AND v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
        AND vt.make IN
     -- START get top 10 unsafe vehicles manufacturers
            (select make from (SELECT make, count(*) count
                 FROM "ALIYA.ABDULLAH".VehicleType vt
                     JOIN
                       (SELECT *
                        FROM "ALIYA.ABDULLAH".violation v
                        JOIN "ALIYA.ABDULLAH".driver drv 
                        ON v.seqid=drv.seqid
                        JOIN "ALIYA.ABDULLAH".factors fac
                        on v.factorid = fac.factorid
                        where fac.personal_injury='Yes'
                        and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
                         ) drivers 
                     ON drivers.vid=vt.vid
                 GROUP BY make HAVING COUNT(*)>=100
                 ORDER BY COUNT DESC)
                 FETCH FIRST 5 ROWS ONLY)
     -- END
       )
     GROUP BY YEAR,
              quarter,
              make
     ORDER BY YEAR,
              quarter,
              make
     `,
            [ req.body.startDate, req.body.endDate,req.body.startDate, req.body.endDate ],
            {
                outFormat: oracledb.OBJECT
            }
        );

        res.send(JSON.stringify(result));
        //console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
});

app.post('/api/q4', async function(req, res) {
    //res.send({ express: 'Hello From Express' });
    let conn;
    try {
        conn = await oracledb.getConnection(config);

        const result = await conn.execute(
            `
            SELECT extract(YEAR
                            FROM v.date_time) YEAR,
                                              quarters.quarter,
                                              a.district,
                                              count(*) AS COUNT
             FROM "ALIYA.ABDULLAH".violation v,"ALIYA.ABDULLAH".agency a,
               (SELECT LEVEL AS MONTH,
                                CASE
                                    WHEN LEVEL BETWEEN 1 AND 3 THEN '1st quarter'
                                    WHEN LEVEL BETWEEN 4 AND 6 THEN '2nd quarter'
                                    WHEN LEVEL BETWEEN 7 AND 9 THEN '3rd quarter'
                                    WHEN LEVEL BETWEEN 10 AND 12 THEN'4th quarter'
                                END AS quarter
                FROM dual CONNECT BY LEVEL <= 12) quarters
             WHERE v.agencyid = a.agencyid
             and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
               AND a.district IN
                 (SELECT a.district
                  FROM "ALIYA.ABDULLAH".violation v,
                       "ALIYA.ABDULLAH".agency a
                  WHERE v.agencyid = a.agencyid
                  and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
                    AND a.district LIKE '%District%')
               AND quarters.month = extract(MONTH
                                            FROM v.date_time)
             GROUP BY extract(YEAR
                              FROM v.date_time),
                      quarters.quarter,
                      a.district
                      order By YEAR, quarter `,
                      [ req.body.startDate, req.body.endDate,req.body.startDate, req.body.endDate ],
            {
                outFormat: oracledb.OBJECT
            }
        );

        res.send(JSON.stringify(result));
        //console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
});

app.post('/api/q5', async function(req, res) {
    //res.send({ express: 'Hello From Express' });
    let conn;
    try {
        conn = await oracledb.getConnection(config);

        const result = await conn.execute(
            `select year, description, cnt, prv, (cnt-prv)*100/prv change from (
                select year, description, cnt, lag(cnt,1) over (PARTITION BY description order by description) prv
                from (
                select
                extract(year from v.date_time) year,
                case
                    WHEN v.description like '%EXCESS%SPEED%' or description like '%SPEED%LIMIT%' OR v.Description LIKE '%SPEED ON HIGHWAY%' THEN 'OVER-SPEEDING'
                    WhEN REGEXP_LIKE (description, '\d* (IN A) \d*') THEN 'OVER-SPEEDING'
                    WHEN description like '%UNDER%INFLUENCE%' THEN 'DUI'
                    WHEN description like '%LIGHT%INOP%' OR  v.Description LIKE '%ILLUMINATING DEVICE%' OR v.Description LIKE '%PLATE ILLUMINATION%' OR v.Description LIKE '%LIGHTED FRONT LAMPS%' OR v.Description LIKE '%STOP LAMP%' OR v.Description LIKE '%HEADLAMPS%' THEN 'BROKEN LIGHTS'
                    WHEN v.Description LIKE '%HANDHELD TELEPHONE%' OR v.Description LIKE '%ELECTRONIC MSG%' THEN 'MOBILE'
                    WHEN v.Description LIKE '%EXPIRED REGISTRAION%' OR v.Description LIKE '%SUSPENDED REGISTRATION%' OR  v.Description LIKE '%SUSPENDED LICENSE%' OR v.Description LIKE '%REGISTRATION PLATES%' OR v.Description LIKE '%REGISTRATION CARD%' OR v.Description LIKE '%DISPLAY LICENSE%' THEN 'REGISTRATION'
                    WHEN v.Description LIKE '%STOP SIGN%' OR v.Description LIKE '%STOP AT SIGN%' THEN 'STOPSIGN'
                end description,
                count(*) cnt
                from "ALIYA.ABDULLAH".violation v
                where description is not null 
                and v.date_time between to_date(:startDate,'dd/mm/yyyy') and to_date(:endDate,'dd/mm/yyyy')
                group by extract(year from v.date_time),
                case
                    WHEN v.description like '%EXCESS%SPEED%' or description like '%SPEED%LIMIT%' OR v.Description LIKE '%SPEED ON HIGHWAY%' THEN 'OVER-SPEEDING'
                    WhEN REGEXP_LIKE (description, '\d* (IN A) \d*') THEN 'OVER-SPEEDING'
                    WHEN description like '%UNDER%INFLUENCE%' THEN 'DUI'
                    WHEN description like '%LIGHT%INOP%' OR  v.Description LIKE '%ILLUMINATING DEVICE%' OR v.Description LIKE '%PLATE ILLUMINATION%' OR v.Description LIKE '%LIGHTED FRONT LAMPS%' OR v.Description LIKE '%STOP LAMP%' OR v.Description LIKE '%HEADLAMPS%' THEN 'BROKEN LIGHTS'
                    WHEN v.Description LIKE '%HANDHELD TELEPHONE%' OR v.Description LIKE '%ELECTRONIC MSG%' THEN 'MOBILE'
                    WHEN v.Description LIKE '%EXPIRED REGISTRAION%' OR v.Description LIKE '%SUSPENDED REGISTRATION%' OR  v.Description LIKE '%SUSPENDED LICENSE%' OR v.Description LIKE '%REGISTRATION PLATES%' OR v.Description LIKE '%REGISTRATION CARD%' OR v.Description LIKE '%DISPLAY LICENSE%' THEN 'REGISTRATION'
                    WHEN v.Description LIKE '%STOP SIGN%' OR v.Description LIKE '%STOP AT SIGN%' THEN 'STOPSIGN'
                end
                order by year, description)
                where description is not null and year between 2013 and 2023
                order by description, year)`,
            [req.body.startDate,req.body.endDate],
            {
                outFormat: oracledb.OBJECT
            }
        );

        res.send(JSON.stringify(result));
        //console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
});




app.listen(port, () => console.log(`Listening on port ${port}`));