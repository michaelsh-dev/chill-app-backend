const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/movie', authMiddleware.verifyToken, movieController.getMovies);


module.exports = router;