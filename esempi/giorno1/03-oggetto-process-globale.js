// esempi/giorno1/03-oggetto-process-globale.js
//
// Argomento: l'oggetto globale, process, __dirname e __filename.
// Esegui con: npm run g1:03

console.log('--- process ---');
console.log('Versione di Node.js in uso:', process.version);
console.log('Sistema operativo:', process.platform); // win32, linux, darwin
console.log('Numero di argomenti passati:', process.argv.length);

// process.argv contiene gli argomenti passati da riga di comando:
// process.argv[0] = percorso dell'eseguibile Node.js
// process.argv[1] = percorso dello script in esecuzione
// process.argv[2] = primo argomento passato dall'utente (se presente)
console.log('process.argv completo:', process.argv);

// process.env contiene le variabili d'ambiente del sistema operativo.
// Da qui si leggono, per esempio, chiavi segrete e configurazione del server.
// Lo useremo in ogni progetto Express (vedi 06-dotenv-env.js).
console.log('\n--- process.env (solo alcune chiavi di esempio) ---');
console.log('PATH definito:', typeof process.env.PATH !== 'undefined');

// __dirname e __filename esistono solo nei moduli CommonJS (quelli con
// require/module.exports, usati in questa dispensa). Non esistono nei
// moduli ES (import/export).
console.log('\n--- __dirname e __filename ---');
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// Perché sono utili: per costruire percorsi di file in modo affidabile,
// indipendentemente da dove viene lanciato lo script, invece di scrivere
// percorsi assoluti a mano (che cambiano da computer a computer).
const path = require('path');
const percorsoFileDati = path.join(__dirname, 'dati', 'config.json');
console.log('Percorso costruito con __dirname + path.join:', percorsoFileDati);
