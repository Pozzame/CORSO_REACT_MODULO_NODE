// esempi/giorno1/07-metodi-risposta.js
//
// Argomento: i metodi di risposta principali di res (json, send, status, redirect).
// Esegui con: npm run g1:07
//
// Prova con il browser o con Thunder Client/Postman:
//   GET  http://localhost:3000/json
//   GET  http://localhost:3000/testo
//   GET  http://localhost:3000/html
//   GET  http://localhost:3000/creato
//   GET  http://localhost:3000/non-trovato
//   GET  http://localhost:3000/vecchia-pagina   (segue il redirect)
//   GET  http://localhost:3000/vuoto

const express = require('express');
const app = express();
const PORT = 3000;

// Inviare JSON (il più usato nelle API)
app.get('/json', function (req, res) {
    res.json({ id: 1, nome: 'Luca', reparto: 'IT' });
});

// Inviare testo semplice
app.get('/testo', function (req, res) {
    res.send('Ciao!');
});

// Inviare HTML
app.get('/html', function (req, res) {
    res.send('<h1>Ciao!</h1><p>Questo è HTML inviato con res.send</p>');
});

// Impostare uno status code prima di rispondere
app.get('/creato', function (req, res) {
    res.status(201).json({ messaggio: 'Creato con successo' });
});

app.get('/non-trovato', function (req, res) {
    res.status(404).json({ errore: 'Risorsa non trovata' });
});

// Reindirizzare il client a un altro URL
app.get('/vecchia-pagina', function (req, res) {
    res.redirect('/json'); // 302 Found di default
});

// Terminare la risposta senza inviare dati
app.get('/vuoto', function (req, res) {
    res.status(204).end();
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('Prova le rotte: /json /testo /html /creato /non-trovato /vecchia-pagina /vuoto');
});
