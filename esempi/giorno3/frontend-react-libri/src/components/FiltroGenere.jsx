// src/components/FiltroGenere.jsx
//
// Un input controllato + submit: quando lo studente conferma, chiama
// onFiltra(testo). Il componente non sa nulla di fetch o dell'API: riceve
// solo una funzione da chiamare, è App.jsx a decidere cosa farne.

import { useState } from 'react';

function FiltroGenere({ valore, onFiltra }) {
    const [testo, setTesto] = useState(valore);

    function gestisciSubmit(evento) {
        evento.preventDefault();
        onFiltra(testo.trim());
    }

    function azzera() {
        setTesto('');
        onFiltra('');
    }

    return (
        <form onSubmit={gestisciSubmit}>
            <label htmlFor="filtro-genere">Filtra per genere:</label>
            <input
                id="filtro-genere"
                type="text"
                value={testo}
                onChange={(evento) => setTesto(evento.target.value)}
                placeholder="es. fantascienza"
            />
            <button type="submit">Filtra</button>
            {valore && (
                <button type="button" onClick={azzera}>
                    Azzera
                </button>
            )}
        </form>
    );
}

export default FiltroGenere;
