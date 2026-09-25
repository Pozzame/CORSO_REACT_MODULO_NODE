// esempi/giorno3/07-ordine-middleware-app-completa.js
//
// Argomento: l'ordine dei middleware in app.js (riepilogo di tutto il giorno 3).
// Esegui con: npm run g3:07
//
// Questo file ricalca l'ordine consigliato dalla dispensa. Usa una versione
// semplificata del router dipendenti solo per far vedere l'ordine dei pezzi:
// la versione COMPLETA con controller separato è in esempi/giorno3/api-dipendenti/.

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware globali (sicurezza, CORS, logging) — il più presto possibile
app.use(cors());
app.use(morgan('dev'));

// 2. Parsing del body — PRIMA delle route che leggono req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Route
const router = express.Router();
router.get('/', function (req, res) {
    res.json({ messaggio: 'Elenco dipendenti' });
});
app.use('/dipendenti', router);

app.get('/', function (req, res) {
    res.json({ messaggio: 'API di esempio, ordine middleware corretto' });
});

// 4. Handler per 404 — DOPO tutte le route
app.use(function (req, res) {
    res.status(404).json({ errore: 'Risorsa non trovata' });
});

// 5. Middleware di errore — SEMPRE per ultimo
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ errore: err.message });
});

app.listen(PORT, function () {
    console.log(`Server su porta ${PORT}`);
});

// RICORDA l'ordine: middleware globali -> parsing body -> route -> 404 -> errore.
// Invertire questo ordine è la causa più comune di bug "misteriosi" in Express.
