// esempi/giorno3/04-morgan-logging.js
//
// Argomento: logging delle richieste con morgan.
// Esegui con: npm run g3:04
//
// Prova a fare qualche richiesta (GET, POST...) e osserva il log colorato in console:
//   GET /dipendenti 200 3.456 ms - 245

const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(express.json());

// 'dev' produce log colorati e concisi: metodo, URL, status, tempo di risposta
app.use(morgan('dev'));

app.get('/dipendenti', function (req, res) {
    res.json([{ id: 1, nome: 'Luca' }]);
});

app.post('/dipendenti', function (req, res) {
    res.status(201).json({ messaggio: 'Creato' });
});

app.get('/dipendenti/99', function (req, res) {
    res.status(404).json({ errore: 'Non trovato' });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('Altri formati disponibili: combined (produzione, stile Apache), common, short, tiny.');
});
