require('dotenv').config();

module.exports = {
    user: "saxena.prakhar",
      password: "jIiJwONpi8CG1uRk9h7fwIlR",
      connectionString: "localhost/XE",

    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};