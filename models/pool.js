const { Pool } = require("pg");

const DB_CONNECTION =
  "postgres://cpxbyhnsnywrpe:903c0129dc6e092a83a2aafd0800aae5f34a06789232425d426fcf6dcb1fdcf0@ec2-184-73-169-151.compute-1.amazonaws.com:5432/d6q7deovdml5q2";

const pool = (module.exports = new Pool({
  connectionString: DB_CONNECTION,
  ssl: true
}));
