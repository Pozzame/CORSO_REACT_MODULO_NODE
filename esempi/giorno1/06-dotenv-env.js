// esempi/giorno1/06-dotenv-env.js
//
// Argomento: variabili d'ambiente con .env, process.env.PORT, app.listen.
// Esegui con: npm run g1:06
//
// Richiede che esista un file .env nella radice del progetto (copialo da
// .env.example se non l'hai ancora fatto: cp .env.example .env)

require('dotenv').config();   // carica le variabili dal file .env, PRIMA di tutto il resto

const express = require('express');
const app = express();

// usa la variabile d'ambiente PORT, oppure 3000 come default se non è definita
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.json({
        messaggio: 'Server attivo',
        porta: PORT,
        // NON fare mai questo in un progetto reale con dati sensibili:
        // qui lo mostriamo solo a scopo didattico.
        variabiliCaricateDaEnv: Object.keys(process.env).filter(k =>
            ['PORT', 'SESSION_SECRET', 'JWT_SECRET', 'JWT_EXPIRES_IN'].includes(k)
        )
    });
});

// app.listen accetta: porta, host opzionale, callback opzionale
app.listen(PORT, function () {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});

// IMPORTANTE: .env deve sempre stare nel .gitignore. Contiene informazioni
// sensibili (password, chiavi API) e cambia tra sviluppo/preproduzione/produzione.
