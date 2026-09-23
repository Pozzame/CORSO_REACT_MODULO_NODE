// esempi/giorno2/01-route-base-crud.js
//
// Argomento: definizione di una route, i metodi HTTP e il loro significato.
// Esegui con: npm run g2:01
//
// Prova con Thunder Client/Postman (solo la GET è testabile da browser):
//   GET    http://localhost:3000/dipendenti
//   POST   http://localhost:3000/dipendenti
//   PUT    http://localhost:3000/dipendenti/1
//   PATCH  http://localhost:3000/dipendenti/1
//   DELETE http://localhost:3000/dipendenti/1

const express = require('express');
const app = express();
const PORT = 3000;

// app.METODO(percorso, funzioneHandler)
// METODO corrisponde a un metodo HTTP in minuscolo: get, post, put, delete, patch

app.get('/dipendenti', function (req, res) {
    // GET: leggere una risorsa. Non modifica nulla sul server.
    res.json({ messaggio: 'Elenco dipendenti' });
});

app.post('/dipendenti', function (req, res) {
    // POST: creare una nuova risorsa.
    res.status(201).json({ messaggio: 'Dipendente creato' });
});

app.put('/dipendenti/:id', function (req, res) {
    // PUT: sostituire COMPLETAMENTE una risorsa esistente.
    // Nel body dovrebbe essere specificato un oggetto dipendente completo.
    res.json({ messaggio: `Dipendente ${req.params.id} aggiornato (sostituzione completa)` });
});

app.patch('/dipendenti/:id', function (req, res) {
    // PATCH: aggiornare PARZIALMENTE una risorsa.
    // Nel body vanno specificate solo le proprietà che cambiano.
    res.json({ messaggio: `Dipendente ${req.params.id} aggiornato parzialmente` });
});

app.delete('/dipendenti/:id', function (req, res) {
    // DELETE: eliminare una risorsa.
    res.json({ messaggio: `Dipendente ${req.params.id} eliminato` });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('RICORDA: GET non deve mai modificare dati. POST crea, PUT/PATCH modificano, DELETE elimina.');
});
