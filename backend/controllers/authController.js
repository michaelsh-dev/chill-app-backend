const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (fullname, username, email, password)
      VALUES (?, ?, ?, ?)
    `;

    db.query(query, [fullname, username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Register gagal' });
      }

      res.status(201).json({
        message: 'Register berhasil'
      });
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error server' });

    if (results.length === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login berhasil',
      token
    });
  });
};