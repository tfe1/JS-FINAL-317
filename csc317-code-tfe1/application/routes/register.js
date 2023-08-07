const express = require('express');
const router = express.Router();
const db = require('../conf/database');

router.post('/', async function(req, res, next) {
    const { username, password, email } = req.body;

    try {
        // Check if the email is already registered
        const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Email is already registered' });
        }

        // Insert the new user into the database
        await db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email]);
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
