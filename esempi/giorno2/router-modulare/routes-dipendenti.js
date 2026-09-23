// esempi/giorno2/router-modulare/routes-dipendenti.js
//
// Argomento: organizzare le route con express.Router, in un file separato.
// Questo file NON si avvia da solo: viene importato da app.js (vedi npm run g2:03).

const express = require('express');
const router = express.Router();

// Tutte le route qui sono RELATIVE al prefisso con cui il router verrà montato
// (vedi app.js: app.use('/dipendenti', router) -> "/" qui equivale a "/dipendenti")

router.get('/', function (req, res) {
    res.json({ messaggio: 'Elenco di tutti i dipendenti' });
});

router.get('/:id', function (req, res) {
    res.json({ messaggio: `Dipendente ${req.params.id}` });
});

router.post('/', function (req, res) {
    res.status(201).json({ messaggio: 'Dipendente creato' });
});

router.put('/:id', function (req, res) {
    res.json({ messaggio: `Dipendente ${req.params.id} aggiornato` });
});

router.delete('/:id', function (req, res) {
    res.json({ messaggio: `Dipendente ${req.params.id} eliminato` });
});

module.exports = router;
