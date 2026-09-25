const jwt = require('jsonwebtoken');

const verificaJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ errore: 'Accesso negato: token mancante o formato errato' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ errore: 'Token non valido o scaduto' });
  }
};

module.exports = verificaJWT;