const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/produtos', productRoutes);

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

//teste