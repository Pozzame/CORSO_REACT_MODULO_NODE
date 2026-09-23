// esempi/giorno2/02-parametri-rotta-query-string.js
//
// Argomento: req.params (parametri di rotta) e req.query (query string).
// Esegui con: npm run g2:02
//
// Prova:
//   GET http://localhost:3000/dipendenti/42
//   GET http://localhost:3000/reparti/IT/dipendenti/7
//   GET http://localhost:3000/dipendenti?reparto=IT&limite=2

const express = require('express');
const app = express();
const PORT = 3000;

const tuttiIDipendenti = [
    { id: 1, nome: 'Luca', reparto: 'IT' },
    { id: 2, nome: 'Sara', reparto: 'HR' },
    { id: 3, nome: 'Marco', reparto: 'IT' },
    { id: 4, nome: 'Anna', reparto: 'CFO' }
];

// --- req.params: valori dentro l'URL, definiti con ":" nel percorso ---

// :id è un parametro di rotta
app.get('/dipendenti/:id', function (req, res) {
    const id = req.params.id;
    res.json({ messaggio: `Richiesto dipendente con id: ${id}`, tipoDiId: typeof id });
    // ATTENZIONE: req.params.id è sempre una STRINGA, anche se sembra un numero.
    // Per usarlo come numero: const idNumero = parseInt(req.params.id);
});

// si possono avere più parametri nello stesso URL
app.get('/reparti/:reparto/dipendenti/:id', function (req, res) {
    const { reparto, id } = req.params;
    res.json({ reparto, id });
});

// --- req.query: valori dopo il "?" nell'URL, per filtri/ordinamento/paginazione ---

app.get('/dipendenti', function (req, res) {
    const reparto = req.query.reparto;   // es. 'IT'
    const limite = req.query.limite;     // es. '2' (stringa!)

    let risultati = tuttiIDipendenti;
    if (reparto) {
        risultati = risultati.filter(d => d.reparto === reparto);
    }

    res.json(risultati.slice(0, parseInt(limite) || 20));
});

app.listen(PORT, function () {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
    console.log('req.params identifica UNA risorsa (/dipendenti/42); req.query filtra un elenco (/dipendenti?reparto=IT).');
});
