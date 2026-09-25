const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//1. **Due utenti** in `routes/auth.js` (stesso schema degli esempi): uno con
//   `ruolo: 'admin'`, uno con `ruolo: 'bibliotecario'`. Password hashate con
//   `bcryptjs` (puoi riusare l'hash di esempio, corrisponde a `password123`).
//   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const HASH_PASSWORD_ESEMPIO = '$2a$10$TyF5A/.YRWTn1cWF7/Q21O/iVvCxHZYJSG1YOMhnGenyrkRh8L.y.';

const utenti = [
  {
    id: 1,
    username: 'admin',
    passwordHash: HASH_PASSWORD_ESEMPIO,
    ruolo: 'admin'
  },
  {
    id: 2,
    username: 'bibliotecario',
    passwordHash: HASH_PASSWORD_ESEMPIO,
    ruolo: 'bibliotecario'
  }
];

//2. `POST /auth/login` — verifica le credenziali e restituisce un token JWT
//   contenente `id`, `username`, `ruolo`.
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ errore: 'Username e password sono richiesti' });
  }

  const utente = utenti.find(u => u.username === username);
        /* console.log("Utente: ", utente); */
       /* console.log("Password inserita: " + password);
        console.log("Hash password inserita: " + await bcrypt.hash(password, 10)); */
  const passwordValida = await bcrypt.compare(password, utente.passwordHash);
        /* console.log("Risultato di bcrypt.compare(password, utente.passwordHash): " + passwordValida); */
  if (!utente || !passwordValida) {
    return res.status(401).json({ errore: 'Credenziali non valide' });
  }

  const token = jwt.sign(
    {
      id: utente.id,
      username: utente.username,
      ruolo: utente.ruolo
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
});

module.exports = router;