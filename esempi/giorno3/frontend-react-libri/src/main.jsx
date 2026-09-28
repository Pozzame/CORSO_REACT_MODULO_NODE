// src/main.jsx
//
// Punto di ingresso: monta il componente <App /> dentro il div#root definito
// in index.html. È l'unico file che tocca il DOM direttamente.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
