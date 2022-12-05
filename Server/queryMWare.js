const db = require("oracledb");
const fs = require('fs');
db.outFormat = db.OUT_FORMAT_OBJECT;

export async function mWare() {
  try {
    db.initOracleClient({ libDir: "C:\\Users\\91977\\Downloads\\instantclient_21_7" });
  } catch (err) {
    console.error("Whoops!");
    console.error(err);
    process.exit(1);
  }
  let con;
  try {
    con = await db.getConnection({
      user: "saxena.prakhar",
      password: "jIiJwONpi8CG1uRk9h7fwIlR",
      connectionString: "oracle.cise.ufl.edu:1521/orcl",
    });

    const query = fs.readFileSync('./Query1.txt',"UTF-8");
    console.log(query);
    const data = await con.execute(query);
    const realdata = JSON.stringify(data.rows);
    return realdata;
    fs.writeFile('result.json', realdata, (err) => {
              if (err) throw err;
          })
    // console.log(data.rows);
  } catch (error) {
    console.error(error);
  }
}
mWare();