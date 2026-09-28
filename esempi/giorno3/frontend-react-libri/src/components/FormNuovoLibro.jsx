// src/components/FormNuovoLibro.jsx
//
// Form controllato per la POST /libri. Il componente non chiama l'API: chiama
// onCrea(datiRaccolti) e lascia decidere ad App.jsx.

import {useState} from 'react';

const CAMPI_INIZIALI = {titolo: '', autore: '', genere: '', anno: ''};

function FormNuovoLibro({onCrea}) {
  const [campi, setCampi] = useState(CAMPI_INIZIALI);

  function gestisciCambiamento(evento) {
    const {name, value} = evento.target;
    setCampi(precedenti => ({...precedenti, [name]: value}));
  }

  function gestisciSubmit(evento) {
    evento.preventDefault();
    onCrea({
      titolo: campi.titolo,
      autore: campi.autore,
      // genere e anno sono opzionali nell'API: se vuoti non li mandiamo
      genere: campi.genere || undefined,
      anno: campi.anno ? Number(campi.anno) : undefined
    });
    setCampi(CAMPI_INIZIALI);
  }

  return (
    <form onSubmit={gestisciSubmit}>
      <input name="titolo" value={campi.titolo} onChange={gestisciCambiamento} placeholder="Titolo" />
      <input name="autore" value={campi.autore} onChange={gestisciCambiamento} placeholder="Autore" />
      <input name="genere" value={campi.genere} onChange={gestisciCambiamento} placeholder="Genere (opzionale)" />
      <input
        name="anno"
        value={campi.anno}
        onChange={gestisciCambiamento}
        placeholder="Anno (opzionale)"
        type="number"
      />
      <button type="submit">Crea libro</button>
    </form>
  );
}

export default FormNuovoLibro;
