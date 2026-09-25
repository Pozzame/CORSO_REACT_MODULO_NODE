// esempi/giorno3/06-middleware-personalizzati.js
//
// Argomento: scrivere middleware personalizzati (logging, verifica token, arricchire req).
// Esegui con: npm run g3:06
//
// Prova:
//   GET http://localhost:3000/status                          (aggiungiTimestamp)
//   GET http://localhost:3000/profilo                         (401: token mancante)
//   GET http://localhost:3000/profilo  con header Authorization: Bearer abc123  (200)

const express = require('express');
const app = express();
const PORT = 3000;

// --- Middleware di logging personalizzato: misura la durata della richiesta ---
function logger(req, res, next) {
    const inizio = Date.now();
    console.log(`--> ${req.method} ${req.url}`);
    // 'finish' viene emesso quando la risposta è stata inviata
    res.on('finish', function () {
        const durata = Date.now() - inizio;
        console.log(`<-- ${req.method} ${req.url} ${res.statusCode} (${durata}ms)`);
    });
    next();
}
app.use(logger);

// --- Middleware di verifica token ---
function verificaToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ errore: 'Token mancante' });
    }
    const token = authHeader.split(' ')[1]; // formato: 'Bearer abc123...'
    if (!token) {
        return res.status(401).json({ errore: 'Formato token non valido' });
    }
    req.token = token; // aggiunge il token a req per le route successive
    next();
}

// applicato a una singola route
app.get('/profilo', verificaToken, function (req, res) {
    res.json({ messaggio: 'Profilo accessibile', token: req.token });
});

// --- Middleware per aggiungere dati a req, disponibili per le route successive ---
function aggiungiTimestamp(req, res, next) {
    req.timestamp = new Date().toISOString();
    next();
}
app.use(aggiungiTimestamp);

app.get('/status', function (req, res) {
    res.json({ status: 'OK', timestamp: req.timestamp });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
