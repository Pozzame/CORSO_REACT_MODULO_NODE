// esempi/giorno2/05-oggetto-req-dettagliato.js
//
// Argomento: l'oggetto req in dettaglio (params, query, body, headers, altre proprietà).
// Esegui con: npm run g2:05
//
// Prova:
//   GET  http://localhost:3000/dipendenti/42
//   GET  http://localhost:3000/dipendenti?reparto=IT&pagina=2&ordinamento=nome
//   POST http://localhost:3000/dipendenti   con body JSON { "nome": "Sara", "reparto": "HR" }
//   GET  http://localhost:3000/profilo      con header Authorization: Bearer abc123
//   GET  http://localhost:3000/info

const express = require('express');
const app = express();
const PORT = 3000;

// IMPORTANTE: senza questo middleware, req.body sarebbe undefined nelle POST/PUT.
// Va messo PRIMA delle route che leggono req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// req.params — parametri di rotta
app.get('/dipendenti/:id', function (req, res) {
    console.log('req.params:', req.params);       // { id: '42' }
    const id = parseInt(req.params.id);            // conversione esplicita a numero
    res.json({ id });
});

// req.query — parametri della query string
app.get('/dipendenti', function (req, res) {
    console.log('req.query:', req.query);
    const reparto = req.query.reparto;
    const pagina = parseInt(req.query.pagina) || 1;
    const ordinamento = req.query.ordinamento || 'id';
    res.json({ reparto, pagina, ordinamento });
});

// req.body — il corpo della richiesta (richiede express.json() sopra)
app.post('/dipendenti', function (req, res) {
    console.log('req.body:', req.body);
    const { nome, reparto } = req.body;
    if (!nome || !reparto) {
        return res.status(400).json({ errore: 'Nome e reparto sono obbligatori' });
    }
    res.status(201).json({ messaggio: 'Dipendente creato', nome, reparto });
});

// req.headers — le intestazioni HTTP
app.get('/profilo', function (req, res) {
    console.log('req.headers:', req.headers);
    const token = req.headers['authorization'];
    const contentType = req.headers['content-type'];
    res.json({ token: token || null, contentType: contentType || null });
});

// altre proprietà utili di req
app.get('/info', function (req, res) {
    res.json({
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        path: req.path,
        ip: req.ip,
        hostname: req.hostname
    });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
