require('dotenv').config();
const dbConnection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    register: async (req, res) => {
        try {
            // Creating a new database connection
            const db = await dbConnection();

            const { username, email, password } = req.body;

            // checking for missing fields
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'Please provide username, email, and password' });
            }
            
            // checking for existing user
            const [result] = await db.query(`SELECT * FROM users WHERE username = ? AND email = ?`, [username, email]);
            if (result.length > 0) {
                return res.status(400).json({ error: 'User already exists' });
            }
                
            // creating new user
            const values = [username, email, await bcrypt.hash(password, 10)];
            const [results] = await db.execute('INSERT INTO `users` (`username`, `email`, `password`) VALUES (?, ?, ?)', values);
            res.status(201).json({message: 'registration successful', results: results});
        } catch (error) {
            res.status(500).json({message: 'registration failed',error: error.message});
        }
    },

    login: async (req, res) => {
        try {
            // Creating a new database connection
            const db = await dbConnection();
    
            // username and password for login
            const { username, password } = req.body;
    
            // Checking for missing fields
            if (!username || !password) {
                return res.status(400).json({ error: 'Please provide email and password' });
            }
    
            // checking for existing user
            const [user] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
            if (user.length === 0) {
                return res.status(400).json({ error: 'User does not exist' });
            }
    
            // checking for correct password
            const isMatch = bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
    
            // generating token
            const token = jwt.sign({ username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.status(200).json({ message: 'login successful', token: token });
            
        } catch (error) {
            res.status(500).json({message: 'login failed', error: error.message});
        }
    },

    profile: async (req, res) => {
        
        try {
            // Creating a new database connection
            const db = await dbConnection();

            // getting profile
            const [profile] = await db.query(`SELECT username, email FROM users WHERE username = ?`, [req.user.username]);
            res.status(200).json({ profile: profile });

        } catch (error) {
            res.status(500).json({ error: error.message});
        }
    }
}