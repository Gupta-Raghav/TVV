const oracledb = require('oracledb');
const config = {
    user: "saxena.prakhar",
      password: "jIiJwONpi8CG1uRk9h7fwIlR",
      connectionString: "oracle.cise.ufl.edu:1521/orcl",
};

async function testConnection(empId) {
    let conn;

    try {
        conn = await oracledb.getConnection(config);

        const result = await conn.execute('SELECT COUNT(*) FROM "SINHA.KSHITIJ".Observation', {});

        console.log(result);
    } catch (err) {
        console.log('Ouch!', err);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            await conn.close();
        }
    }
}

getEmployee(101);