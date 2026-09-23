// esempi/giorno2/07-gestione-errori-middleware.js
//
// Argomento: middleware di errore (4 parametri), next(err), route asincrone e try/catch.
// Esegui con: npm run g2:07
//
// Prova:
//   GET http://localhost:3000/dipendenti/1    (esiste -> 200)
//   GET http://localhost:3000/dipendenti/999  (non esiste -> 404 gestito da next(err))
//   GET http://localhost:3000/dipendenti-async/1    (versione async, esiste -> 200)
//   GET http://localhost:3000/dipendenti-async/999  (versione async, non esiste -> 404)
//   GET http://localhost:3000/errore-non-previsto    (eccezione non gestita -> 500)

const express = require('express');
const app = express();
const PORT = 3000;

const dipendenti = [
    { id: 1, nome: 'Luca' },
    { id: 2, nome: 'Sara' }
];

function trovaDipendente(id) {
    return dipendenti.find(d => d.id === id);
}

// simula un'operazione asincrona (es. una query a un database)
function trovaDipendenteAsync(id) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(trovaDipendente(id));
        }, 200);
    });
}

// --- Route SINCRONA con gestione errori ---
app.get('/dipendenti/:id', function (req, res, next) {
    try {
        const dipendente = trovaDipendente(parseInt(req.params.id));
        if (!dipendente) {
            const err = new Error('Dipendente non trovato');
            err.status = 404;
            return next(err); // passa l'errore al middleware di errore
        }
        res.json(dipendente);
    } catch (e) {
        next(e); // passa qualsiasi eccezione al middleware di errore
    }
});

// --- Route ASINCRONA con gestione errori ---
// In Express 4 (usato in questo corso) un errore dentro una funzione async NON
// viene intercettato automaticamente: va sempre usato try/catch + next(e).
app.get('/dipendenti-async/:id', async function (req, res, next) {
    try {
        const dipendente = await trovaDipendenteAsync(parseInt(req.params.id));
        if (!dipendente) {
            const err = new Error('Dipendente non trovato');
            err.status = 404;
            return next(err);
        }
        res.json(dipendente);
    } catch (e) {
        next(e); // anche il rifiuto della Promise arriva qui
    }
});

// --- Route che genera un errore inatteso, per vedere il 500 ---
app.get('/errore-non-previsto', function (req, res, next) {
    try {
        throw new Error('Qualcosa è andato storto in modo imprevisto');
    } catch (e) {
        next(e); // nessun err.status -> il middleware userà 500 come default
    }
});

// Il middleware di errore va DOPO tutte le route e ha SEMPRE 4 parametri:
// (err, req, res, next). Se ne manca anche uno solo, Express non lo riconosce
// come middleware di errore.
app.use(function (err, req, res, next) {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        errore: err.message || 'Errore interno del server'
    });
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
