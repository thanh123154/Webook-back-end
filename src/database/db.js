const mysql = require("mysql");

const db = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b3baae331452db",
  password: "e855400f",
  database: "heroku_04e5e030befbdb2",
  multipleStatements: true,
});

module.exports = db;
