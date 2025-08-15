const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de segurança para restringir acesso à rede interna
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  if (!ip.startsWith('::ffff:172.17.') && ip !== '::1') {
    return res.status(403).json({ error: 'Acesso restrito à rede interna' });
  }
  next();
});

// Configuração do CORS para aceitar apenas seu frontend interno
app.use(cors({
  origin: [
    `http://172.17.2.159:3000`, // frontend React
    `http://172.17.2.159`       // se abrir direto
  ],
  credentials: true
}));

app.use(express.json());

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas protegidas (authMiddleware pode ser reativado depois)
app.use('/api/produtos', productRoutes);

// Conexão com o MongoDB e inicialização do servidor
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando em http://172.17.2.159:${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));
