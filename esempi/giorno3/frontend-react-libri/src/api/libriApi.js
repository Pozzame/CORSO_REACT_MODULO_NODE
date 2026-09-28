// src/api/libriApi.js
//
// Tutte le chiamate all'API "Gestione Libreria" (esercizi/giorno3/soluzione/
// del corso Node.js) vivono qui, separate dai componenti React. I componenti
// non chiamano mai fetch() direttamente: chiamano queste funzioni.
//
// L'API va avviata separatamente sulla porta 3000 (npm run es:g3 nel progetto
// corso-nodejs-2026). Il server ha già cors() abilitato, quindi accetta
// richieste da questo frontend anche se gira su una porta diversa (Vite usa
// la 5173 di default) — è lo stesso CORS visto in esempi/giorno3/05-cors.js.
//
// Nessuna autenticazione qui: questa è la versione "semplice" dell'API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; //da modificare per fare funzionare in render
function headerAutenticazione(token) {
  const result = token ? {authorization: 'Bearer ' + token} : {};
  return result;
}

// Legge la risposta e normalizza gli errori: se lo status non è 2xx, lancia
// un Error con il messaggio restituito dal server (o uno generico).
async function gestisciRisposta(res) {
  if (res.status === 204) {
    return null; // No Content, tipico della DELETE
  }
  const corpo = await res.json().catch(() => null);
  if (!res.ok) {
    const messaggio = (corpo && corpo.errore) || `Errore HTTP ${res.status}`;
    throw new Error(messaggio);
  }
  return corpo;
}

//POST auth/login- questa rotta è l'unica che non richiede un token perchè è lei che lo genera
export async function login(username, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  return gestisciRisposta(res); //messaggio, token, utente
}

// GET /libri (con filtro opzionale ?genere=...)
export async function getLibri(token, genere) {
  console.log('getLibri ingresso');
  const url = new URL(`${API_BASE_URL}/libri`);
  if (genere) {
    url.searchParams.set('genere', genere);
  }
  const res = await fetch(url, {headers: headerAutenticazione(token)});
  return gestisciRisposta(res);
}

// GET /libri/:id
export async function getLibro(id) {
  const res = await fetch(`${API_BASE_URL}/libri/${id}`);
  return gestisciRisposta(res);
}

// POST /libri
export async function creaLibro(datiLibro) {
  const res = await fetch(`${API_BASE_URL}/libri`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datiLibro)
  });
  return gestisciRisposta(res);
}

// PUT /libri/:id — sostituzione completa (l'API del giorno 3 non ha PATCH)
export async function sostituisciLibro(id, datiCompleti) {
  const res = await fetch(`${API_BASE_URL}/libri/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datiCompleti)
  });
  return gestisciRisposta(res);
}

// DELETE /libri/:id
export async function eliminaLibro(id) {
  const res = await fetch(`${API_BASE_URL}/libri/${id}`, {
    method: 'DELETE'
  });
  return gestisciRisposta(res);
}
