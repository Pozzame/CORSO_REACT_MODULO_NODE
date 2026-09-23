// esempi/giorno2/router-modulare/app.js
//
// Argomento: montare un router modulare con app.use().
// Esegui con: npm run g2:03
//
// Prova:
//   GET  http://localhost:3000/dipendenti
//   GET  http://localhost:3000/dipendenti/42
//   POST http://localhost:3000/dipendenti

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());   // necessario per leggere il body delle richieste (POST/PUT)

// importa il router definito in routes-dipendenti.js
const dipendentiRouter = require('./routes-dipendenti');

// monta il router sul prefisso /dipendenti: tutte le route definite nel router
// diventano accessibili come /dipendenti, /dipendenti/:id, ecc.
app.use('/dipendenti', dipendentiRouter);

app.listen(PORT, function () {
    console.log(`Server su porta ${PORT}`);
    console.log('Il prefisso "/dipendenti" passato a app.use() si somma al percorso di ogni route nel router.');
});
