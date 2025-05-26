const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: 'Register gagal' });
        const token = jwt.sign({ id: results.insertId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(201).json({
            message: 'User terdaftar',
            token
        });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            console.log(`Username "${username}" tidak ditemukan`);
            return res.status(401).json({ error: 'User tidak ditemukan' });
        }

        const user = results[0];
        console.log(`Login attempt for ${username}. Password (input): ${password}`);
        console.log(`Password (stored hash): ${user.password}`);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password tidak cocok');
            return res.status(401).json({ error: 'Password salah' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.json({ token });
    });
};


module.exports = { register, login };
