// esempi/giorno4/02-session-based/app.js
//
// Approccio 2: Session-based. Richiede: npm install express-session bcryptjs
// (già inclusi nel package.json del corso).
// Esegui con: npm run g4:session
//
// Come testarlo (con Thunder Client/Postman, che mantiene i cookie tra le richieste
// della stessa collection):
//   1. POST http://localhost:3000/auth/login   { "username": "admin", "password": "password123" }
//   2. GET  http://localhost:3000/dipendenti   (funziona: il cookie di sessione viene inviato automaticamente)
//   3. POST http://localhost:3000/auth/logout
//   4. GET  http://localhost:3000/dipendenti   (torna 401: sessione distrutta)

require('dotenv').config();

const express = require('express');
const session = require('express-session');

const verificaSessione = require('./middleware/verificaSessione');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'chiave-segreta-dev',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,       // true in produzione con HTTPS
        httpOnly: true,      // il cookie non è accessibile da JavaScript nel browser
        maxAge: 1000 * 60 * 60 * 24  // 24 ore in millisecondi
    }
}));

app.use('/auth', authRouter);

const dipendentiRouter = express.Router();
dipendentiRouter.get('/', function (req, res) {
    res.json({ messaggio: `Elenco dipendenti (sessione di ${req.session.username})` });
});
app.use('/dipendenti', verificaSessione, dipendentiRouter);

app.listen(PORT, function () {
    console.log(`Server Session-based in ascolto su http://localhost:${PORT}`);
    console.log('ATTENZIONE: le sessioni in memoria si perdono ad ogni riavvio del server. In produzione: Redis o un DB.');
});
