// esempi/giorno1/01-sync-vs-async.js
//
// Argomento: codice sincrono vs asincrono, event loop.
// Esegui con: npm run g1:01

// ---------------------------------------------------------------------------
// 1) CODICE SINCRONO
// Ogni riga aspetta che la precedente sia completata prima di procedere.
// ---------------------------------------------------------------------------

function calcolaQualcosa() {
  // simulazione di un calcolo pesante ma sincrono (blocca il thread)
  let somma = 0;
  for (let i = 0; i < 1e6; i++) {
    somma += i;
  }
  return somma;
}

console.log('--- Blocco sincrono ---');
const risultato = calcolaQualcosa(); // blocca finché non finisce
console.log('Risultato calcolo:', risultato); // eseguita solo dopo

// ---------------------------------------------------------------------------
// 2) CODICE ASINCRONO
// L'operazione parte, il codice successivo NON aspetta il risultato.
// Il callback viene eseguito solo quando l'operazione è completata.
// ---------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');

console.log('\n--- Blocco asincrono ---');
console.log('Prima della lettura');

fs.readFile(path.join(__dirname, 'testo.txt'), 'utf8', function (err, contenuto) {
  if (err) {
    console.error('Errore nella lettura del file:', err.message);
    return;
  }
  // questo codice viene eseguito DOPO che il file è stato letto,
  // anche se è scritto PRIMA di "Dopo la lettura" nel codice sorgente
  console.log('Contenuto del file:', contenuto.trim());
});

console.log('Dopo la lettura');

// Output atteso nel terminale:
//
// Prima della lettura
// Dopo la lettura        <-- viene prima!
// Contenuto del file:... <-- viene dopo!
//
