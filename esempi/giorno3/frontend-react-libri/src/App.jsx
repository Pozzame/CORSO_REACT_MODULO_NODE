// src/App.jsx
//
// Unico componente "intelligente" dell'app: tiene lo stato, chiama le funzioni
// di src/api/libriApi.js, e passa dati + funzioni ai componenti figli (che
// sono tutti "di presentazione", senza fetch al loro interno).

import {useState, useEffect, useCallback} from 'react';
import {getLibri, getLibro, creaLibro, sostituisciLibro, eliminaLibro, login} from './api/libriApi.js';
import FiltroGenere from './components/FiltroGenere.jsx';
import ElencoLibri from './components/ElencoLibri.jsx';
import FormNuovoLibro from './components/FormNuovoLibro.jsx';
import DettaglioLibro from './components/DettaglioLibro.jsx';
import LoginForm from './components/LoginForm.jsx';

function App() {
  //Autenticazione
  const [token, setToken] = useState(null);
  const [utente, setUtente] = useState(null);
  const [erroreLogin, setErroreLogin] = useState(null);

  //Dati e UI applicazione vera e propria
  const [libri, setLibri] = useState([]);
  const [genereFiltro, setGenereFiltro] = useState('');
  const [idSelezionato, setIdSelezionato] = useState(null);
  const [libroSelezionato, setLibroSelezionato] = useState(null);
  const [caricamento, setCaricamento] = useState(false);
  const [errore, setErrore] = useState(null);

  // GET /libri (con filtro), richiamata al mount e ogni volta che cambia
  // il filtro per genere.

  async function gestisciLogin(username, password) {
    setErroreLogin(null); //resetto eventuale errore precedente
    try {
      const risposta = await login(username, password);
      setToken(risposta.token);
      setUtente(risposta.utente);
    } catch (error) {
      setToken(null);
      setErroreLogin(error.message);
    }
  }

  const caricaLibri = useCallback(
    async function () {
      if (!token) return;
      setCaricamento(true);
      setErrore(null);
      try {
        const risposta = await getLibri(token, genereFiltro);
        setLibri(risposta.dati);
      } catch (e) {
        setErrore(e.message);
      } finally {
        setCaricamento(false);
      }
    },
    [token, genereFiltro]
  );

  useEffect(
    function () {
      caricaLibri();
    },
    [caricaLibri]
  );

  // GET /libri/:id, solo quando viene selezionato un libro dall'elenco
  useEffect(
    function () {
      if (idSelezionato === null) {
        setLibroSelezionato(null);
        return;
      }
      let annullato = false;
      getLibro(idSelezionato)
        .then(function (dati) {
          if (!annullato) setLibroSelezionato(dati);
        })
        .catch(function (e) {
          if (!annullato) setErrore(e.message);
        });
      return function () {
        annullato = true; // evita di aggiornare lo stato se il componente è cambiato nel frattempo
      };
    },
    [idSelezionato]
  );

  async function gestisciCreazione(nuovoLibro) {
    try {
      await creaLibro(nuovoLibro);
      await caricaLibri();
    } catch (e) {
      setErrore(e.message);
    }
  }

  async function gestisciEliminazione(id) {
    try {
      await eliminaLibro(id);
      if (idSelezionato === id) setIdSelezionato(null);
      await caricaLibri();
    } catch (e) {
      setErrore(e.message);
    }
  }

  async function gestisciModificaCompleta(id, datiCompleti) {
    try {
      await sostituisciLibro(id, datiCompleti);
      setIdSelezionato(null);
      await caricaLibri();
    } catch (e) {
      setErrore(e.message);
    }
  }

  return (
    <div>
      <h1>Gestione Libreria</h1>
      <p className="nota">
        Frontend React per l'API Express dell'esercizio del giorno 4 (deve girare su http://localhost:3000 —{' '}
        <code>npm run es:g4</code> nel progetto corso-nodejs-2026).
      </p>

      {errore && <p className="errore">Errore: {errore}</p>}

      <LoginForm onLogin={gestisciLogin} erroreLogin={erroreLogin} />

      <FiltroGenere valore={genereFiltro} onFiltra={setGenereFiltro} />

      <h2>Nuovo libro</h2>
      <FormNuovoLibro onCrea={gestisciCreazione} />

      <h2>Elenco</h2>
      {caricamento ?
        <p>Caricamento...</p>
      : <ElencoLibri libri={libri} onSeleziona={setIdSelezionato} onElimina={gestisciEliminazione} />}

      {libroSelezionato && (
        <DettaglioLibro
          libro={libroSelezionato}
          onChiudi={() => setIdSelezionato(null)}
          onSalva={gestisciModificaCompleta}
        />
      )}
    </div>
  );
}

export default App;
