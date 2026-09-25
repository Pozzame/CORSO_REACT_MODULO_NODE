// esempi/giorno4/03-jwt/routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const utenti = [
    {
        id: 1,
        username: 'admin',
        ruolo: 'admin',
        passwordHash: '$2b$10$uhLCXNyGpfWoIC8hXmieqOn1kA2Kh8C.hNNy6R.ADGH1cNmtXUI7i'
    },
    {
        id: 2,
        username: 'operatore',
        ruolo: 'operatore',
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

    // Genera il token JWT
    const token = jwt.sign(
        { id: utente.id, username: utente.username, ruolo: utente.ruolo },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
        messaggio: 'Login effettuato',
        token,
        utente: { id: utente.id, username: utente.username, ruolo: utente.ruolo }
    });
});

module.exports = router;
