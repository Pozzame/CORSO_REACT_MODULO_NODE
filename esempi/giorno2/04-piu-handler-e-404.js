// esempi/giorno2/04-piu-handler-e-404.js
//
// Argomento: route con più handler in sequenza (next()), gestione del 404 in JSON.
// Esegui con: npm run g2:04
//
// Prova:
//   GET http://localhost:3000/dipendenti/1     (autorizzato -> passa al secondo handler)
//   GET http://localhost:3000/area-riservata   (non autorizzato -> 403, il secondo handler non viene mai chiamato)
//   GET http://localhost:3000/una-rotta-a-caso (404 in JSON)

const express = require('express');
const app = express();
const PORT = 3000;

// Un handler "di verifica": se tutto ok chiama next() e passa il controllo
// all'handler successivo; altrimenti risponde lui stesso e la catena si ferma.
function verificaPermessi(req, res, next) {
    const autorizzato = true; // qui, in un caso reale, controlleresti un token/sessione
    if (!autorizzato) {
        return res.status(403).json({ errore: 'Accesso negato' });
    }
    next(); // passa al prossimo handler
}

function bloccaSempre(req, res, next) {
    return res.status(403).json({ errore: 'Area riservata: accesso negato' });
    // nota: qui NON chiamiamo next(), quindi la catena si ferma qui
}

// Una route può avere più funzioni handler: ognuna deve chiamare next()
// per passare il controllo alla successiva, oppure inviare una risposta.
app.get('/dipendenti/:id', verificaPermessi, function (req, res) {
    res.json({ id: req.params.id, nome: 'Luca' });
});

app.get('/area-riservata', bloccaSempre, function (req, res) {
    // questo handler non viene MAI eseguito, perché bloccaSempre non chiama next()
    res.json({ messaggio: 'Non dovresti mai vedere questo messaggio' });
});

// Handler "catch-all" per le rotte non trovate: DEVE stare DOPO tutte le altre
// route, perché Express valuta le route nell'ordine in cui sono registrate e
// usa la prima che corrisponde.
app.use(function (req, res) {
    res.status(404).json({
        errore: 'Risorsa non trovata',
        url: req.originalUrl
    });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
