// esempi/giorno4/01-basic-auth/app.js
//
// Esegui con: npm run g4:basic
//
// Come testarlo con Thunder Client/Postman: nel tab "Auth" scegli "Basic Auth"
// e inserisci username "admin" / password "password123" (oppure "operatore" /
// "qwerty456"). In alternativa aggiungi manualmente l'header:
//   Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=
// (è la codifica Base64 di 'admin:password123')

const express = require('express');
const basicAuth = require('./middleware/basicAuth');

const app = express();
const PORT = 3000;

app.get('/pubblico', function (req, res) {
    res.json({ messaggio: 'Questa rotta è accessibile a chiunque' });
});

// Protegge tutte le route sotto /dipendenti
const dipendentiRouter = express.Router();
dipendentiRouter.get('/', function (req, res) {
    res.json({ messaggio: `Elenco dipendenti (autenticato come ${req.utente.username})` });
});
app.use('/dipendenti', basicAuth, dipendentiRouter);

// Oppure proteggere solo una route specifica di un router già esistente:
// router.delete('/:id', basicAuth, controller.remove);

app.listen(PORT, function () {
    console.log(`Server Basic Auth in ascolto su http://localhost:${PORT}`);
    console.log('ATTENZIONE: Basic Auth invia le credenziali ad ogni richiesta. In produzione richiede sempre HTTPS.');
});
