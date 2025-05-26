const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/authMiddleware');

// Create a new note
router.post('/', verifyToken, (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
    db.query(sql, [title, content], (err, result) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.status(201).json({ id: result.insertId, title, content });
    });
});

// Get all notes
router.get('/', verifyToken, (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Update a note
router.put('/:id', verifyToken, (req, res) => {
    const { title, content } = req.body;
    const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, req.params.id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json({ id: req.params.id, title, content });
    });
});

// Delete a note
router.delete('/:id', verifyToken, (req, res) => {
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(204).send();
    });
});

module.exports = router;