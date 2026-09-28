// src/components/ElencoLibri.jsx
//
// Componente "di presentazione": riceve i dati già pronti (array libri) e
// delle funzioni da chiamare sui click. Non fa nessuna chiamata di rete lui
// stesso — è App.jsx a occuparsene e a passargli i risultati come prop.

function ElencoLibri({ libri, onSeleziona, onElimina }) {
    if (libri.length === 0) {
        return <p>Nessun libro trovato.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Titolo</th>
                    <th>Autore</th>
                    <th>Genere</th>
                    <th>Anno</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                {libri.map((libro) => (
                    <tr key={libro.id}>
                        <td>{libro.titolo}</td>
                        <td>{libro.autore}</td>
                        <td>{libro.genere ?? '—'}</td>
                        <td>{libro.anno ?? '—'}</td>
                        <td>
                            <button onClick={() => onSeleziona(libro.id)}>
                                Dettaglio
                            </button>
                            <button onClick={() => onElimina(libro.id)}>
                                Elimina
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ElencoLibri;
