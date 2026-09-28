# Frontend React — Gestione Libreria (demo didattica)

App React minimale che consuma l'API "Gestione Libreria" dell'**esercizio del
giorno 3** (`corso-nodejs-2026/esercizi/giorno3/soluzione/`), per far vedere
come un frontend richiama le varie rotte di un'API REST e ne visualizza i dati.

Nessuna autenticazione qui: questa è la versione "semplice" dell'API. La
versione con login e JWT è quella dell'esercizio del giorno 4 (stessa
risorsa "libri", protetta).

## Struttura del progetto

```
index.html                     solo lo scheletro HTML (un <div id="root">, nient'altro)
src/
├── main.jsx                   monta <App /> dentro index.html
├── index.css                  stile minimo
├── App.jsx                    stato dell'app + orchestrazione delle chiamate API
├── api/
│   └── libriApi.js            TUTTE le fetch() verso il backend, in un solo file
└── components/
    ├── FiltroGenere.jsx       input per filtrare per genere (query string)
    ├── FormNuovoLibro.jsx     form di creazione (POST)
    ├── ElencoLibri.jsx        tabella con azioni (dettaglio / elimina)
    └── DettaglioLibro.jsx     dettaglio + modifica completa (PUT)
```

L'HTML (`index.html`) contiene solo lo scheletro della pagina: tutta la logica
e il markup dinamico stanno nei file `.jsx`. I componenti "di presentazione"
(`ElencoLibri`, `FormNuovoLibro`, `FiltroGenere`, `DettaglioLibro`) non
chiamano mai l'API direttamente: ricevono dati e funzioni come *props* da
`App.jsx`, che è l'unico punto in cui si chiamano le funzioni di
`api/libriApi.js`.

## Come avviarlo

Servono **due processi separati**, in due terminali:

**1. Il backend** (dal progetto `corso-nodejs-2026`):

```bash
npm run es:g3
```

Parte su `http://localhost:3000`.

**2. Il frontend** (da questa cartella):

```bash
npm install
npm run dev
```

Parte di default su `http://localhost:5173`. Apri quell'indirizzo nel browser.

Il backend ha già `cors()` abilitato (vedi `esempi/giorno3/05-cors.js` nella
dispensa del corso), quindi accetta senza problemi le richieste del frontend
anche se girano su porte diverse.

## Rotte dell'API richiamate, e da dove

| Rotta API | Metodo | Dove nel frontend |
|---|---|---|
| `GET /libri` (+ `?genere=...`) | GET | `FiltroGenere` → `App.caricaLibri` |
| `GET /libri/:id` | GET | click su "Dettaglio" nell'elenco → `DettaglioLibro` |
| `POST /libri` | POST | `FormNuovoLibro` |
| `PUT /libri/:id` | PUT | form di modifica in `DettaglioLibro` |
| `DELETE /libri/:id` | DELETE | pulsante "Elimina" nell'elenco |

L'API di questo esercizio non ha una rotta PATCH (a differenza di quella
dipendenti del giorno 3): l'unico modo per aggiornare un libro è la
sostituzione completa via PUT, ed è quello che infatti fa questo frontend.

Tutte e cinque le chiamate passano da `src/api/libriApi.js`: è l'unico file
che sa che esiste un URL `http://localhost:3000`.

## Gestione degli errori

`libriApi.js` centralizza anche la lettura degli errori: se l'API risponde
con uno status non-2xx, la funzione `gestisciRisposta` lancia un `Error` con
il messaggio che il server ha messo in `{ "errore": "..." }`. `App.jsx` lo
intercetta con `try/catch` e lo mostra in cima alla pagina — utile per far
vedere agli studenti cosa succede, per esempio, provando a filtrare per un
genere senza risultati, o eliminando due volte lo stesso libro.
