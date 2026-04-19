const db = require('../config/db');

exports.getMovies = (req, res) => {
  let query = 'SELECT * FROM movies WHERE 1=1';
  let values = [];

  const { genre, search, sortBy } = req.query;

  if (genre) {
    query += ' AND genre = ?';
    values.push(genre);
  }

  if (search) {
    query += ' AND title LIKE ?';
    values.push(`%${search}%`);
  }

  if (sortBy) {
    query += ` ORDER BY ${sortBy}`;
  }

  db.query(query, values, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error server' });

    res.json(results);
  });
};