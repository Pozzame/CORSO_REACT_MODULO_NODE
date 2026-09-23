/* # Esercizio 3 — Primo server Express personale

**Argomenti coinvolti:** struttura base di un'app Express, rotte GET, `res.json`/
`res.status`, variabili d'ambiente con `.env`.

## Obiettivo

Creare un file `server.js` che avvii un server Express con le seguenti rotte:

| Metodo | Percorso | Risposta |
|---|---|---|
| GET | `/` | `{ "messaggio": "Benvenuto nella mia prima API" }` |
| GET | `/chi-sono` | Un oggetto JSON con almeno `nome`, `corso`, `data_inizio` (a tua scelta) |
| GET | `/saluta/qualcuno` | Vedi sotto |
| GET | una rotta qualsiasi non definita | Risposta con **status 404** e un JSON `{ "errore": "..." }`, invece del messaggio HTML di default di Express |

Per `/saluta/qualcuno`: per ora (senza usare `req.params`, che vedremo il giorno 2)
crea semplicemente una rotta fissa `/saluta/fulvia` che risponde
`{ "messaggio": "Ciao Fulvia!" }`.

## Requisiti

1. La porta del server deve venire da `process.env.PORT`, con `3000` come valore
   di default se la variabile non è definita (usa `dotenv`).
2. Ogni rotta deve rispondere con `res.json(...)`.
3. La rotta "chi sono" deve rispondere con status `200` esplicito
   (`res.status(200).json(...)`), anche se è il default.
4. La gestione del 404 va messa **dopo** tutte le altre rotte definite.
5. Avvia il server con un `console.log` che conferma su quale porta è in ascolto.

## Come testarlo

Avvia il server e prova le rotte dal browser (solo le GET si possono testare così)
o con Thunder Client/Postman:

```
GET http://localhost:3000/
GET http://localhost:3000/chi-sono
GET http://localhost:3000/saluta/fulvia
GET http://localhost:3000/una-rotta-inventata   (deve rispondere 404 in JSON)
```

La soluzione completa è in `esercizio-03-soluzione.js` (`npm run es:g1:03`).
 */


require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ messaggio: "Benvenuto nella mia prima API" });
});

app.get('/chi-sono', (req, res) => {
  res.status(200).json({
    nome: "Matteo",
    corso: "Sviluppo Web Node.js",
    data_inizio: "2026-09-22"
  });
});

app.get('/saluta/fulvia', (req, res) => {
  res.json({ messaggio: "Ciao Fulvia!" });
});

app.use((req, res) => {
  res.status(404).json({ errore: "Risorsa non trovata", url: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Server Express avviato e in ascolto sulla porta ${PORT}`);
});