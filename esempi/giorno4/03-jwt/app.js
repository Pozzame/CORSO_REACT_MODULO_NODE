// esempi/giorno4/03-jwt/app.js
//
// Approccio 3: JWT. Richiede: npm install jsonwebtoken bcryptjs
// (già inclusi nel package.json del corso). Richiede anche JWT_SECRET e
// JWT_EXPIRES_IN nel file .env (vedi .env.example).
// Esegui con: npm run g4:jwt
//
// Come testarlo:
//   1. POST http://localhost:3000/auth/login   { "username": "admin", "password": "password123" }
//   2. Copia il "token" dalla risposta
//   3. GET  http://localhost:3000/dipendenti   con header Authorization: Bearer <token>
//   4. DELETE http://localhost:3000/dipendenti/5   con il token di "operatore" -> 403
//      DELETE http://localhost:3000/dipendenti/5   con il token di "admin"     -> 204
//      (entrambi gli utenti hanno la stessa password "password123" nell'esempio)

require('dotenv').config();

const express = require('express');

const verificaJWT = require('./middleware/verificaJWT');
const verificaRuolo = require('./middleware/verificaRuolo');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRouter);

// Tutte le route /dipendenti richiedono un token JWT valido
const dipendentiRouter = express.Router();

dipendentiRouter.get('/', function (req, res) {
    res.json({ messaggio: `Elenco dipendenti (utente: ${req.utente.username}, ruolo: ${req.utente.ruolo})` });
});

// Solo gli admin possono eliminare: verificaJWT (in app.js) gira prima e imposta
// req.utente, poi verificaRuolo('admin') lo controlla
dipendentiRouter.delete('/:id', verificaRuolo('admin'), function (req, res) {
    res.status(204).end();
});

app.use('/dipendenti', verificaJWT, dipendentiRouter);

app.listen(PORT, function () {
    console.log(`Server JWT in ascolto su http://localhost:${PORT}`);
    console.log('RICORDA: imposta una scadenza breve per i token in produzione, con refresh token per rinnovarli.');
});
