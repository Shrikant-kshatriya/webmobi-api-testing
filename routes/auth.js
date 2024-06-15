const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/authController');
const checKAuth = require('../middleware/checkAuth');

router
.post('/register', register)
.post('/login', login)
.get('/profile',checKAuth, profile);  

module.exports = router;