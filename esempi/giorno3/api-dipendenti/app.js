// esempi/giorno3/api-dipendenti/app.js
//
// API REST completa "Gestione Dipendenti": struttura del progetto, controller,
// router, dati in memoria, middleware globali, 404, gestione errori.
// Esegui con: npm run g3:api
//
// Testala con Thunder Client o Postman (vedi in fondo alla dispensa gli esempi
// di richieste GET/POST/PATCH/DELETE).

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const dipendentiRouter = require('./routes/dipendenti');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware globali
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Route
app.use('/dipendenti', dipendentiRouter);

// Route radice
app.get('/', function (req, res) {
    res.json({ messaggio: 'API Gestione Dipendenti', versione: '1.0' });
});

// 404
app.use(function (req, res) {
    res.status(404).json({ errore: 'Risorsa non trovata' });
});

// Middleware di errore
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ errore: err.message });
});

app.listen(PORT, function () {
    console.log(`Server avviato su http://localhost:${PORT}`);
});

// RICORDA (dalla dispensa): quando i dati in memoria verranno sostituiti da MySQL
// nel modulo successivo, la struttura (route/controller/app.js) resterà identica:
// cambierà solo il contenuto del controller, dove l'array diventerà una query SQL.
