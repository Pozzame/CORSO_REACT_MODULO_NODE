//1. Carica `dotenv` e usa `process.env.PORT` (default `3000`).
require('dotenv').config();
const PORT = process.env.PORT || 3001;

//2. Middleware globali, **nell'ordine corretto**: `cors()`, `morgan('dev')`,
//   `express.json()`.
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//3. Monta il router su `/libri`.
const libriRouter = require('./routes/libri');

//3. **Tutte** le rotte sotto `/libri` richiedono un token JWT valido
//   (middleware `verificaJWT` applicato in `app.js`, non dentro il router).
const authRoutes = require('./routes/auth');
const verificaJWT = require('./middleware/verificaJWT');
app.use('/auth', authRoutes);
app.use('/libri', verificaJWT, libriRouter);
/* app.use('/libri', verificaJWT, (req, res, next) => {
  if (req.method === 'DELETE') {
    return verificaRuolo('admin')(req, res, next);
  }
  next();
}, libriRouter); */

// 4. Una rotta `GET /` che risponde con un messaggio di benvenuto dell'API.
app.get('/', function (req, res) {
    res.json({ messaggio: 'Benvenuto in API Gestione Libreria', versione: '1.0' });
});

// 5. Handler 404 generico (dopo tutte le route).
app.use(function (req, res) {
    res.status(404).json({ errore: 'Risorsa non trovata' });
});

//6. Middleware di errore a 4 parametri (per ultimo).
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ errore: 'Errore interno del server' });
});

app.listen(PORT, function () {
    console.log(`Server avviato su http://localhost:${PORT}`);
});