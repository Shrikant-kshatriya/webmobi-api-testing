import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnection from '../../config/db.js';

export const loginUser = async (username, password) => {
    const db = await dbConnection();

    // checking for existing user
    const [user] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
    if (user.length === 0) {
        throw new Error('User does not exist');
    }

    // checking for correct password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // generating token
    return jwt.sign({ username: user[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
