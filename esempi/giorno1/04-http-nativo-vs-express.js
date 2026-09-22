// esempi/giorno1/04-http-nativo-vs-express.js
//
// Argomento: perché usare Express invece del modulo http nativo.
// Questo file mostra ENTRAMBE le versioni: la prima è commentata (per non far
// collidere le due porte), la seconda è quella attiva.
//
// Esegui con: npm run g1:04
// Poi apri http://localhost:3000/ e http://localhost:3000/utenti

// ---------------------------------------------------------------------------
// VERSIONE 1 — modulo http nativo (commentata: decommentare per far vedere
// la differenza dal vivo, disattivando prima la versione Express sotto)
// ---------------------------------------------------------------------------
/*
const http = require('http');

const server = http.createServer(function (req, res) {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ messaggio: 'Home' }));
    } else if (req.method === 'GET' && req.url === '/utenti') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([{ id: 1, nome: 'Luca' }]));
    } else {
        res.writeHead(404);
        res.end('Non trovato');
    }
});

server.listen(3000, () => console.log('Server http nativo su porta 3000'));
*/

// ---------------------------------------------------------------------------
// VERSIONE 2 — stesso identico server, scritto con Express
// ---------------------------------------------------------------------------
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.json({ messaggio: 'Home' });
});

app.get('/utenti', function (req, res) {
    res.json([{ id: 1, nome: 'Luca' }]);
});

// Express gestisce automaticamente le route non trovate (per ora con un
// semplice "Cannot GET /xxx": lo miglioreremo il giorno 2)

app.listen(3000, function () {
    console.log('Server Express in ascolto su http://localhost:3000');
    console.log('Confronta la lunghezza e la leggibilità con la versione http nativo qui sopra (commentata).');
});
