// src/components/DettaglioLibro.jsx
//
// Mostra il libro selezionato (già caricato da App.jsx con una GET
// /libri/:id) e permette la sostituzione completa (PUT /libri/:id).

import { useState, useEffect } from 'react';

function DettaglioLibro({ libro, onChiudi, onSalva }) {
    const [campi, setCampi] = useState(libro);

    // Se App.jsx passa un libro diverso (nuova selezione), aggiorna il form
    useEffect(() => {
        setCampi(libro);
    }, [libro]);

    function gestisciCambiamento(evento) {
        const { name, value } = evento.target;
        setCampi((precedenti) => ({ ...precedenti, [name]: value }));
    }

    function gestisciSubmit(evento) {
        evento.preventDefault();
        // PUT richiede sempre titolo e autore: sostituisce l'intero oggetto.
        onSalva(libro.id, {
            titolo: campi.titolo,
            autore: campi.autore,
            genere: campi.genere || null,
            anno: campi.anno ? Number(campi.anno) : null
        });
    }

    return (
        <div>
            <h2>Dettaglio libro #{libro.id} (modifica completa, PUT)</h2>
            <form onSubmit={gestisciSubmit}>
                <input name="titolo" value={campi.titolo} onChange={gestisciCambiamento} required />
                <input name="autore" value={campi.autore} onChange={gestisciCambiamento} required />
                <input name="genere" value={campi.genere ?? ''} onChange={gestisciCambiamento} />
                <input
                    name="anno"
                    type="number"
                    value={campi.anno ?? ''}
                    onChange={gestisciCambiamento}
                />
                <button type="submit">Salva</button>
                <button type="button" onClick={onChiudi}>Chiudi</button>
            </form>
        </div>
    );
}

export default DettaglioLibro;
