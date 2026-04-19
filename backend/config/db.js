const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Micxenn123109Sql',
  database: 'chill_db',
  port: 3306 // karena kamu pakai ini di workbench
});

db.connect((err) => {
  if (err) {
    console.error('Database error:', err);
    return;
  }
  console.log('Database connected');
});

module.exports = db;