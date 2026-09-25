// esempi/giorno4/02-session-based/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Utenti con password hashate (in un progetto reale vengono dal database).
// Per generare un hash: bcrypt.hashSync('password123', 10)
const utenti = [
    {
        id: 1,
        username: 'admin',
        // hash di 'password123'
        passwordHash: '$2b$10$uhLCXNyGpfWoIC8hXmieqOn1kA2Kh8C.hNNy6R.ADGH1cNmtXUI7i'
    }
];

// POST /auth/login
router.post('/login', function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ errore: 'Username e password obbligatori' });
    }

    const utente = utenti.find(u => u.username === username);
    if (!utente || !bcrypt.compareSync(password, utente.passwordHash)) {
        return res.status(401).json({ errore: 'Credenziali non valide' });
    }

    // Crea la sessione
    req.session.utenteId = utente.id;
    req.session.username = utente.username;

    res.json({ messaggio: 'Login effettuato', username: utente.username });
});

// POST /auth/logout
router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) return res.status(500).json({ errore: 'Errore durante il logout' });
        res.json({ messaggio: 'Logout effettuato' });
    });
});

module.exports = router;
