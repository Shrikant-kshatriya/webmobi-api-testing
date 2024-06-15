const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // checking for token
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ error: 'Please login' });
        }
    
        // verifying token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(400).json({ error: 'Please login' });
        }
        req.user={username: verified.username};
    
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}