// esempi/giorno4/02-session-based/middleware/verificaSessione.js

function verificaSessione(req, res, next) {
    if (!req.session || !req.session.utenteId) {
        return res.status(401).json({ errore: 'Sessione non valida, effettua il login' });
    }
    next();
}

module.exports = verificaSessione;
