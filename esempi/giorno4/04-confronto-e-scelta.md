# Confronto fra i tre approcci di autenticazione

| | **Basic Auth** | **Session-based** | **JWT** |
|---|---|---|---|
| Dove viaggiano le credenziali | Ad ogni richiesta, header `Authorization: Basic ...` | Solo al login; poi un cookie con l'ID di sessione | Solo al login; poi un token nell'header `Authorization: Bearer ...` |
| Stato lato server | Nessuno | Sì: le sessioni attive sono salvate (memoria/Redis/DB) | Nessuno: stateless, il server verifica solo la firma |
| Serve HTTPS in produzione | Sì, sempre | Consigliato | Consigliato |
| Scala su più server/istanze | Sì (nessuno stato) | No, a meno di uno store condiviso (Redis) | Sì (nessuno stato) |
| Invalidare prima della scadenza | N/A | Facile: `req.session.destroy()` | Difficile (serve una blacklist) |
| Uso tipico | API interne, tool di amministrazione | App web tradizionali, stesso dominio frontend/backend | API REST con frontend separato (React, mobile) |

## Come scegliere

- **Basic Auth**: adatto per API interne tra servizi, strumenti di amministrazione
  semplici, o quando serve la soluzione più rapida da implementare con HTTPS.
- **Session-based**: adatto per applicazioni web tradizionali con rendering
  server-side, dove frontend e backend sono sullo stesso dominio.
- **JWT**: adatto per API REST consumate da frontend separati (React, Vue, app
  mobile), architetture a microservizi, o quando il server deve restare stateless.

**Punto fermo qualunque approccio si scelga:** non salvare mai le password in
chiaro. Usa sempre `bcryptjs` (o una libreria equivalente) per fare l'hash prima
di salvare e per il confronto in fase di login.
