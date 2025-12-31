// config/db.js
const sql = require("mssql");


const config = {
  server: process.env.DB_HOST || "db",      
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  database: process.env.DB_NAME || "navision_consulting",
  user: process.env.DB_USER || "sa",               
  password: process.env.DB_PASSWORD || "StrongPass!123", 
  options: {
    encrypt: false,             
    trustServerCertificate: true, 
  },
};


const pool = new sql.ConnectionPool(config);

pool.connect()
  .then(() => console.log("MSSQL OK"))
  .catch(err => {
    console.error("MSSQL ERROR");
    console.error(err);
  });

module.exports = { sql, pool };
