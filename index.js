require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/', auth);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;