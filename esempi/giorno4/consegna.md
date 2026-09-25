# Esercizio giorno 4 — Proteggere l'API "Gestione Libreria" con JWT

**Argomenti coinvolti:** JWT, `bcryptjs`, middleware `verificaJWT`, middleware
`verificaRuolo`, integrazione con un'API REST già esistente.

## Punto di partenza

Parti dalla soluzione dell'esercizio del giorno 3 (`esercizi/giorno3/soluzione/`,
l'API "Gestione Libreria"). Aggiungi l'autenticazione JWT così com'è stata vista
negli esempi (`esempi/giorno4/03-jwt/`).

## Obiettivo

```
esercizio-soluzione/
├── data/libri.js                    (invariato dal giorno 3)
├── controllers/libriController.js   (invariato dal giorno 3)
├── routes/libri.js                  (invariato dal giorno 3)
├── routes/auth.js                   (NUOVO)
├── middleware/verificaJWT.js        (NUOVO)
├── middleware/verificaRuolo.js      (NUOVO)
└── app.js                           (aggiornato)
```

## Requisiti

1. **Due utenti** in `routes/auth.js` (stesso schema degli esempi): uno con
   `ruolo: 'admin'`, uno con `ruolo: 'bibliotecario'`. Password hashate con
   `bcryptjs` (puoi riusare l'hash di esempio, corrisponde a `password123`).
2. `POST /auth/login` — verifica le credenziali e restituisce un token JWT
   contenente `id`, `username`, `ruolo`.
3. **Tutte** le rotte sotto `/libri` richiedono un token JWT valido
   (middleware `verificaJWT` applicato in `app.js`, non dentro il router).
4. Solo l'utente con ruolo `admin` può eseguire la `DELETE /libri/:id`
   (middleware `verificaRuolo('admin')` applicato **nel router**, sulla singola
   rotta — non in `app.js`, per lo stesso motivo spiegato nella dispensa:
   altrimenti il controllo del ruolo non verrebbe mai eseguito).
5. Le altre operazioni (`GET`, `POST`, `PUT`) restano accessibili a qualunque
   utente autenticato, indipendentemente dal ruolo.
6. `JWT_SECRET` e `JWT_EXPIRES_IN` vanno letti da `.env` (usa lo stesso `.env`
   del progetto principale).

## Come verificarlo

```
POST   http://localhost:3000/auth/login
       { "username": "admin", "password": "password123" }
       -> 200, restituisce un token

GET    http://localhost:3000/libri                     (senza token) -> 401
GET    http://localhost:3000/libri                     (con token)   -> 200

DELETE http://localhost:3000/libri/2   (token di "bibliotecario")    -> 403
DELETE http://localhost:3000/libri/2   (token di "admin")            -> 204
```

La soluzione completa è in `soluzione/` (`npm run es:g4`).
