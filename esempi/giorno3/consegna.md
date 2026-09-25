# Esercizio giorno 3 — API REST completa: "Gestione Libreria"

**Argomenti coinvolti:** tutto il giorno 3 — middleware integrati, morgan, cors,
struttura a livelli (data/controller/route), CRUD completo, 404, middleware di errore.

## Obiettivo

Costruire da zero un'API REST completa per gestire i libri di una libreria,
**seguendo esattamente la stessa struttura** vista nell'esempio
`esempi/giorno3/api-dipendenti/`:

```
esercizio-soluzione/
├── data/
│   └── libri.js
├── controllers/
│   └── libriController.js
├── routes/
│   └── libri.js
└── app.js
```

## Dati di partenza (in `data/libri.js`)

```js
let libri = [
    { id: 1, titolo: 'Il nome della rosa', autore: 'Umberto Eco', genere: 'romanzo', anno: 1980 },
    { id: 2, titolo: 'Fondazione', autore: 'Isaac Asimov', genere: 'fantascienza', anno: 1951 },
    { id: 3, titolo: 'Se questo è un uomo', autore: 'Primo Levi', genere: 'memoriale', anno: 1947 },
    { id: 4, titolo: 'Neuromante', autore: 'William Gibson', genere: 'fantascienza', anno: 1984 }
];
let prossimoId = 5;
module.exports = { libri, getProssimoId: () => prossimoId++ };
```

## Requisiti

### `controllers/libriController.js`

Cinque funzioni, esattamente come nel controller dipendenti:

1. `getAll(req, res)` — restituisce `{ totale, dati }`, con filtro opzionale
   `?genere=...` via query string.
2. `getById(req, res)` — restituisce il libro con quell'id, o `404` se non esiste.
3. `create(req, res)` — crea un libro. Campi obbligatori: `titolo`, `autore`.
   `genere` e `anno` sono opzionali (default: `null`). Risposta `201`.
4. `update(req, res)` — sostituzione completa (`PUT`): richiede tutti i campi
   obbligatori, altrimenti `400`.
5. `remove(req, res)` — elimina il libro, risposta `204`, o `404` se non esiste.

### `routes/libri.js`

Un `express.Router()` che collega ogni metodo HTTP alla funzione corrispondente
del controller (stesso schema di `esempi/giorno3/api-dipendenti/routes/dipendenti.js`).

### `app.js`

1. Carica `dotenv` e usa `process.env.PORT` (default `3000`).
2. Middleware globali, **nell'ordine corretto**: `cors()`, `morgan('dev')`,
   `express.json()`.
3. Monta il router su `/libri`.
4. Una rotta `GET /` che risponde con un messaggio di benvenuto dell'API.
5. Handler 404 generico (dopo tutte le route).
6. Middleware di errore a 4 parametri (per ultimo).

## Come verificarlo

Con Thunder Client/Postman, prova l'intero ciclo CRUD:

```
GET    http://localhost:3000/libri
GET    http://localhost:3000/libri?genere=fantascienza
GET    http://localhost:3000/libri/2
POST   http://localhost:3000/libri        (body: titolo + autore)
PUT    http://localhost:3000/libri/2      (body completo)
DELETE http://localhost:3000/libri/2
GET    http://localhost:3000/libri/999    (404)
GET    http://localhost:3000/non-esiste   (404 handler generico)
```

La soluzione completa è in `soluzione/` (`npm run es:g3`). Sarà anche il punto di
partenza dell'esercizio del giorno 4 (proteggerla con JWT).
