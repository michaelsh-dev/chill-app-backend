require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const movieRoutes = require('./routes/movieRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use(uploadRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

app.get('/protected', authMiddleware.verifyToken, (req, res) => {
  res.json({
    message: 'Akses berhasil',
    user: req.user
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});