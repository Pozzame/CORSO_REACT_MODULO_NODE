// esempi/giorno2/06-oggetto-res-e-status.js
//
// Argomento: l'oggetto res in dettaglio e i codici di stato HTTP.
// Esegui con: npm run g2:06
//
// Prova:
//   GET http://localhost:3000/200
//   GET http://localhost:3000/201
//   GET http://localhost:3000/204
//   GET http://localhost:3000/400
//   GET http://localhost:3000/401
//   GET http://localhost:3000/403
//   GET http://localhost:3000/404
//   GET http://localhost:3000/500

const express = require('express');
const app = express();
const PORT = 3000;

// 2xx — Successo
app.get('/200', (req, res) => res.status(200).json({ ok: true, significato: 'OK: richiesta completata con successo' }));
app.get('/201', (req, res) => res.status(201).json({ id: 99, significato: 'Created: risorsa creata (tipico di una POST)' }));
app.get('/204', (req, res) => res.status(204).end()); // No Content: nessun body nella risposta

// 4xx — Errore del client
app.get('/400', (req, res) => res.status(400).json({ errore: 'Bad Request: dati mancanti o non validi' }));
app.get('/401', (req, res) => res.status(401).json({ errore: 'Unauthorized: non autenticato' }));
app.get('/403', (req, res) => res.status(403).json({ errore: 'Forbidden: autenticato ma senza permessi' }));
app.get('/404', (req, res) => res.status(404).json({ errore: 'Not Found: risorsa inesistente' }));

// 5xx — Errore del server
app.get('/500', (req, res) => res.status(500).json({ errore: 'Internal Server Error: errore non gestito nel codice' }));

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('Un client che riceve 200 si aspetta successo; 400 sa che l\'errore è nei suoi dati; 500 sa che il problema è sul server.');
});
