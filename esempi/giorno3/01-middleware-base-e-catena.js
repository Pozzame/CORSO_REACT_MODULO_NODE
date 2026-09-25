// esempi/giorno3/01-middleware-base-e-catena.js
//
// Argomento: cos'è un middleware, come funziona la catena, next().
// Esegui con: npm run g3:01
//
// Prova:
//   GET http://localhost:3000/qualsiasi-percorso
// e osserva in console l'ordine di stampa: prima il middleware, poi la route.

const express = require('express');
const app = express();
const PORT = 3000;

// Un middleware è una funzione (req, res, next) eseguita PRIMA che la route
// finale gestisca la richiesta. Riceve gli stessi req/res della route, più next().
function mioMiddleware(req, res, next) {
    console.log('Richiesta ricevuta:', req.method, req.url);
    next(); // passa al prossimo middleware o alla route
}

app.use(mioMiddleware);

app.get('/', function (req, res) {
    res.json({ messaggio: 'La route finale, eseguita dopo il middleware' });
});

// Cosa può fare ogni funzione nella catena:
// - leggere o modificare req e res
// - terminare la catena inviando una risposta (res.json, res.send, ...)
// - passare il controllo alla funzione successiva chiamando next()
// - passare un errore alla catena di errori chiamando next(err)

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('ATTENZIONE: se un middleware non chiama next() e non risponde, la richiesta resta bloccata per sempre.');
});
