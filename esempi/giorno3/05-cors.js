// esempi/giorno3/05-cors.js
//
// Argomento: CORS (Cross-Origin Resource Sharing).
// Esegui con: npm run g3:05
//
// Il problema: se il frontend (es. React su porta 5173) e l'API (porta 3000)
// girano su porte diverse, il browser le considera "origini diverse" e blocca
// la lettura della risposta a meno che il server non autorizzi esplicitamente
// quell'origine con gli header CORS.

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// --- Versione permissiva (development): accetta richieste da QUALSIASI origine ---
app.use(cors());

// --- Versione ristretta (produzione), commentata per confronto ---
/*
app.use(cors({
    origin: 'https://miodominio.com',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
*/

app.get('/dipendenti', function (req, res) {
    res.json([{ id: 1, nome: 'Luca' }]);
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('ATTENZIONE: CORS protegge solo le richieste dal browser. Postman, curl o un altro server possono chiamare l\'API comunque. Per proteggere le route serve l\'autenticazione (giorno 4).');
});
