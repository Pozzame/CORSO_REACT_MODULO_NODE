// esempi/giorno4/03-jwt/middleware/verificaJWT.js

const jwt = require('jsonwebtoken');

function verificaJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ errore: 'Token mancante' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica la firma e decodifica il payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.utente = payload; // { id, username, ruolo, iat, exp }
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ errore: 'Token scaduto, effettua nuovamente il login' });
        }
        return res.status(401).json({ errore: 'Token non valido' });
    }
}

module.exports = verificaJWT;
