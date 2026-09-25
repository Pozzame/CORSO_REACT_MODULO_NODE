const verificaRuolo = (...ruoliConsentiti) => {
  return (req, res, next) => {
    console.log(req.user.ruolo);
    if (!req.user || !req.user.ruolo) {
      return res.status(401).json({ errore: 'Utente non autenticato' });
    }

    if (!ruoliConsentiti.includes(req.user.ruolo)) {
      return res.status(403).json({ errore: 'Accesso negato: autorizzazioni insufficienti' });
    }

    next();
  };
};

module.exports = verificaRuolo;