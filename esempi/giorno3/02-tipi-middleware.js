// esempi/giorno3/02-tipi-middleware.js
//
// Argomento: middleware di applicazione, di router, di errore.
// Esegui con: npm run g3:02
//
// Prova:
//   GET http://localhost:3000/               (solo middleware di applicazione globale)
//   GET http://localhost:3000/api/qualcosa    (globale + quello specifico per /api)
//   GET http://localhost:3000/dipendenti      (globale + middleware di router)
//   GET http://localhost:3000/errore          (attiva il middleware di errore)

const express = require('express');
const app = express();
const PORT = 3000;

// --- Middleware DI APPLICAZIONE: app.use(), eseguito per OGNI richiesta ---
app.use(function (req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware di applicazione ma legato a un prefisso: eseguito solo per /api/*
app.use('/api', function (req, res, next) {
    console.log('Richiesta alle API');
    next();
});

app.get('/', function (req, res) {
    res.json({ messaggio: 'Home' });
});

app.get('/api/qualcosa', function (req, res) {
    res.json({ messaggio: 'Risposta API' });
});

// --- Middleware DI ROUTER: si registra su un express.Router(), vale solo per quel router ---
const router = express.Router();

router.use(function (req, res, next) {
    console.log('Richiesta al router dipendenti');
    next();
});

router.get('/', function (req, res) {
    res.json({ messaggio: 'Elenco dipendenti' });
});

app.use('/dipendenti', router);

// Rotta di comodo per vedere il middleware di errore in azione
app.get('/errore', function (req, res, next) {
    next(new Error('Errore di esempio per il middleware di errore'));
});

// --- Middleware DI ERRORE: si riconosce dai 4 parametri, va sempre eseguito solo con next(err) ---
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ errore: err.message });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
