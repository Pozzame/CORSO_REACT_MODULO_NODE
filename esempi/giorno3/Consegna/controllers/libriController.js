let { libri, getProssimoId } = require('../data/libri');

//1. `getAll(req, res)` — restituisce `{ totale, dati }`, con filtro opzionale
//   `?genere=...` via query string.
const getAll = (req, res) => {
    const { genere } = req.query;
    let risultati = libri;

    if (genere) {
        risultati = risultati.filter(l => l.genere.toLowerCase() === genere.toLowerCase());
    }

    res.json({
        totale: risultati.length,
        dati: risultati
    });
};

//2. `getById(req, res)` — restituisce il libro con quell'id, o `404` se non esiste.
const getById = (req, res) => {
    /* const id = parseInt(req.params.id, 10); */
    const libro = libri.find(l => l.id === parseInt(req.params.id));

    if (!libro) {
        return res.status(404).json({ errore: 'Libro non trovato' });
    }

    res.json(libro);
};

//3. `create(req, res)` — crea un libro. Campi obbligatori: `titolo`, `autore`.
//   `genere` e `anno` sono opzionali (default: `null`). Risposta `201`.
const create = (req, res) => {
    const { titolo, autore, genere, anno } = req.body;

    if (!titolo || !autore) {
        return res.status(400).json({ errore: 'I campi "titolo" e "autore" sono obbligatori' });
    }

    const nuovoLibro = {
        id: getProssimoId(),
        titolo,
        autore,
        genere: genere !== undefined ? genere : null,
        anno: anno !== undefined ? anno : null
    };

    libri.push(nuovoLibro);
    res.status(201).json(nuovoLibro);
};

//4. `update(req, res)` — sostituzione completa (`PUT`): richiede tutti i campi
//   obbligatori, altrimenti `400`.
const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const libroIndex = libri.findIndex(l => l.id === id);

    if (libroIndex === -1) {
        return res.status(404).json({ errore: 'Libro non trovato' });
    }

    const { titolo, autore, genere, anno } = req.body;

    if (!titolo || !autore) {
        return res.status(400).json({ errore: 'I campi "titolo" e "autore" sono obbligatori per la sostituzione completa' });
    }

    libri[libroIndex] = {
        id,
        titolo,
        autore,
        genere: genere !== undefined ? genere : null,
        anno: anno !== undefined ? anno : null
    };

    res.json(libri[libroIndex]);
};

//5. `remove(req, res)` — elimina il libro, risposta `204`, o `404` se non esiste.
const remove = (req, res) => {
    /* const id = parseInt(req.params.id, 10); */
    const libroIndex = libri.findIndex(l => l.id === parseInt(req.params.id));

    if (libroIndex === -1) {
        return res.status(404).json({ errore: 'Libro non trovato' });
    }

    libri.splice(libroIndex, 1);
    res.status(204).send();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};