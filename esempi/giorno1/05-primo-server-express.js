// esempi/giorno1/05-primo-server-express.js
//
// Argomento: struttura base di un'applicazione Express, il ciclo request-response.
// Esegui con: npm run g1:05
// Poi apri il browser su http://localhost:3000

const express = require('express');

// crea l'applicazione Express
const app = express();

// definisce la porta su cui il server ascolterà
const PORT = 3000;

// definisce una route: quando arriva una GET su '/', risponde con JSON
app.get('/', function (req, res) {
    //  ^^^                  ^^^   ^^^
    //  metodo HTTP          req   res
    //  e percorso           |     |
    //                       |     risposta da inviare al client
    //                       richiesta ricevuta dal client
    res.json({ messaggio: 'Server Express funzionante!' });
});

// una seconda route, per vedere che possiamo averne quante ne vogliamo
app.get('/saluto', function (req, res) {
    res.json({ messaggio: 'Ciao dal server!' });
});

// avvia il server
app.listen(PORT, function () {
    console.log(`Server avviato su http://localhost:${PORT}`);
});

// RICORDA: ogni route deve sempre inviare una risposta (res.json/res.send/...).
// Se la dimentichi, il client resta in attesa indefinitamente fino al timeout.
