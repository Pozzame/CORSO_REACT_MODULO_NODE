// esempi/giorno2/08-validazione-body.js
//
// Argomento: validazione manuale del body di una richiesta.
// Esegui con: npm run g2:08
//
// Prova con POST http://localhost:3000/dipendenti e questi body:
//   { "nome": "Sara", "cognome": "Bianchi", "reparto": "HR", "stipendio": 32000 }  -> 201
//   { "nome": "Sara" }                                                            -> 400 (campi mancanti)
//   { "nome": "Sara", "cognome": "Bianchi", "reparto": "HR", "stipendio": "tanti"} -> 400 (tipo sbagliato)

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/dipendenti', function (req, res) {
    const { nome, cognome, reparto, stipendio } = req.body;

    // Verifica campi obbligatori
    if (!nome || !cognome || !reparto) {
        return res.status(400).json({
            errore: 'I campi nome, cognome e reparto sono obbligatori'
        });
    }

    // Verifica tipo
    if (stipendio !== undefined && typeof stipendio !== 'number') {
        return res.status(400).json({
            errore: 'Lo stipendio deve essere un numero'
        });
    }

    // Tutto ok: procedi con la creazione
    res.status(201).json({ messaggio: 'Dipendente creato', nome, cognome, reparto, stipendio: stipendio || null });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('Per progetti più grandi: librerie dedicate come express-validator o joi.');
});
