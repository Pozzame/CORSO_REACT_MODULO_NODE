// esempi/giorno3/03-middleware-integrati.js
//
// Argomento: middleware integrati in Express (express.json, express.urlencoded, express.static).
// Esegui con: npm run g3:03
//
// Prova:
//   POST http://localhost:3000/dati-json         con body JSON
//   POST http://localhost:3000/dati-form         con body x-www-form-urlencoded
//   GET  http://localhost:3000/pubblico/nota.txt (file servito staticamente)

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Parsing del body in formato JSON (Content-Type: application/json)
app.use(express.json());

// Parsing di form HTML (Content-Type: application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Servire file statici da una cartella: tutto ciò che è dentro "pubblico/"
// diventa accessibile direttamente via URL, senza bisogno di una route dedicata
app.use(express.static(path.join(__dirname, 'pubblico')));

app.post('/dati-json', function (req, res) {
    res.json({ ricevutoDaJson: req.body });
});

app.post('/dati-form', function (req, res) {
    res.json({ ricevutoDaForm: req.body });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('IMPORTANTE: express.json()/urlencoded() vanno registrati PRIMA delle route che leggono req.body.');
});
