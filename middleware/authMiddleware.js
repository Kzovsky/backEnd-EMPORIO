const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "#4Sx7918Brse2f0De$0100!LixO@9B*%&";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // acessível nas rotas
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}

module.exports = authMiddleware;
