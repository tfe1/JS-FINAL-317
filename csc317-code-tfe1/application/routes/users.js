var express = require('express');
var router = express.Router();
var db = require('../conf/database');

/* GET localhost:3000/users */
router.get('/', async function(req, res, next) {
    try {
        let [rows, fields] = await db.query('SELECT * FROM users;');
        res.status(200).json({ rows, fields });
    } catch (error) {
        next(error);
    }
});

/* POST localhost:3000/users/register */
router.post('/register', async function(req, res, next) {
    try {
        const { username, password, email } = req.body;

        // Check if email already exists in the database
        const [existingRows] = await db.query('SELECT * FROM users WHERE email = ?;', [email]);
        if (existingRows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // If email does not exist, proceed with user registration
        await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?);', [username, password, email]);
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
