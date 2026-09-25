// esempi/giorno3/api-dipendenti/controllers/dipendentiController.js
//
// Il controller contiene la logica di ogni operazione. Separarlo dalla route
// tiene il codice organizzato e facilita i test.

const { dipendenti, getProssimoId } = require('../data/dipendenti');

// GET /dipendenti — restituisce tutti i dipendenti, con filtro opzionale per reparto
function getAll(req, res) {
    const { reparto } = req.query;
    let risultati = dipendenti;
    if (reparto) {
        risultati = dipendenti.filter(
            d => d.reparto.toLowerCase() === reparto.toLowerCase()
        );
    }
    res.json({
        totale: risultati.length,
        dati: risultati
    });
}

// GET /dipendenti/:id — restituisce un singolo dipendente
function getById(req, res) {
    const id = parseInt(req.params.id);
    const dipendente = dipendenti.find(d => d.id === id);
    if (!dipendente) {
        return res.status(404).json({
            errore: `Dipendente con id ${id} non trovato`
        });
    }
    res.json(dipendente);
}

// POST /dipendenti — crea un nuovo dipendente
function create(req, res) {
    const { nome, cognome, reparto, stipendio } = req.body;
    if (!nome || !cognome || !reparto) {
        return res.status(400).json({
            errore: 'I campi nome, cognome e reparto sono obbligatori'
        });
    }
    const nuovoDipendente = {
        id: getProssimoId(),
        nome,
        cognome,
        reparto,
        stipendio: stipendio || null
    };
    dipendenti.push(nuovoDipendente);
    res.status(201).json(nuovoDipendente);
}

// PUT /dipendenti/:id — sostituisce completamente un dipendente
function update(req, res) {
    const id = parseInt(req.params.id);
    const indice = dipendenti.findIndex(d => d.id === id);
    if (indice === -1) {
        return res.status(404).json({
            errore: `Dipendente con id ${id} non trovato`
        });
    }
    const { nome, cognome, reparto, stipendio } = req.body;
    if (!nome || !cognome || !reparto) {
        return res.status(400).json({
            errore: 'I campi nome, cognome e reparto sono obbligatori'
        });
    }
    dipendenti[indice] = { id, nome, cognome, reparto, stipendio: stipendio || null };
    res.json(dipendenti[indice]);
}

// PATCH /dipendenti/:id — aggiorna parzialmente un dipendente
function partialUpdate(req, res) {
    const id = parseInt(req.params.id);
    const indice = dipendenti.findIndex(d => d.id === id);
    if (indice === -1) {
        return res.status(404).json({
            errore: `Dipendente con id ${id} non trovato`
        });
    }
    // Unisce i dati esistenti con quelli nuovi (l'id resta quello originale)
    dipendenti[indice] = { ...dipendenti[indice], ...req.body, id };
    res.json(dipendenti[indice]);
}

// DELETE /dipendenti/:id — elimina un dipendente
function remove(req, res) {
    const id = parseInt(req.params.id);
    const indice = dipendenti.findIndex(d => d.id === id);
    if (indice === -1) {
        return res.status(404).json({
            errore: `Dipendente con id ${id} non trovato`
        });
    }
    dipendenti.splice(indice, 1);
    res.status(204).end();
}

module.exports = { getAll, getById, create, update, partialUpdate, remove };
