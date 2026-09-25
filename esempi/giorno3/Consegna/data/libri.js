let libri = [
    { id: 1, titolo: 'Il nome della rosa', autore: 'Umberto Eco', genere: 'romanzo', anno: 1980 },
    { id: 2, titolo: 'Fondazione', autore: 'Isaac Asimov', genere: 'fantascienza', anno: 1951 },
    { id: 3, titolo: 'Se questo è un uomo', autore: 'Primo Levi', genere: 'memoriale', anno: 1947 },
    { id: 4, titolo: 'Neuromante', autore: 'William Gibson', genere: 'fantascienza', anno: 1984 }
];

let prossimoId = 5;

module.exports = { libri, getProssimoId: () => prossimoId++ };