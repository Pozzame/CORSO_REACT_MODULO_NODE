// esempi/giorno4/01-basic-auth/middleware/basicAuth.js
//
// Approccio 1: Basic Auth. Nessun pacchetto aggiuntivo richiesto: si legge e
// decodifica l'header Authorization manualmente.

// Utenti validi (in un progetto reale vengono dal database)
const utenti = [
    { username: 'admin', password: 'password123' },
    { username: 'operatore', password: 'qwerty456' }
];

function basicAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="API"');
        return res.status(401).json({ errore: 'Autenticazione richiesta' });
    }

    // Decodifica le credenziali da Base64
    const base64 = authHeader.split(' ')[1];
    const credenziali = Buffer.from(base64, 'base64').toString('utf8');
    const [username, password] = credenziali.split(':');

    // Verifica le credenziali
    const utente = utenti.find(
        u => u.username === username && u.password === password
    );

    if (!utente) {
        return res.status(401).json({ errore: 'Credenziali non valide' });
    }

    req.utente = { username }; // aggiunge i dati utente a req
    next();
}

module.exports = basicAuth;
