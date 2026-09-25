// esempi/giorno3/api-dipendenti/data/dipendenti.js
//
// Dati in memoria: sostituto temporaneo del database (arriverà nel modulo successivo).

let dipendenti = [
    { id: 1, nome: 'Luca', cognome: 'Ferrari', reparto: 'IT', stipendio: 35000 },
    { id: 2, nome: 'Sara', cognome: 'Bianchi', reparto: 'HR', stipendio: 32000 },
    { id: 3, nome: 'Marco', cognome: 'Ricci', reparto: 'IT', stipendio: 38000 },
    { id: 4, nome: 'Anna', cognome: 'Conti', reparto: 'CFO', stipendio: 42000 },
    { id: 5, nome: 'Paolo', cognome: 'Esposito', reparto: 'HR', stipendio: 31000 }
];

// Contatore per gli ID auto-incrementali
let prossimoId = 6;

module.exports = { dipendenti, getProssimoId: () => prossimoId++ };
