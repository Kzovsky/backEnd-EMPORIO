const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "#4Sx7918Brse2f0De$0100!LixO@9B*%&";

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { nome, telefone, senha } = req.body;

    const userExistente = await User.findOne({ telefone });
    if (userExistente) {
      return res.status(400).json({ error: 'Telefone já cadastrado' });
    }

    const novoUsuario = new User({ nome, telefone, senha });
    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar', details: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { telefone, senha } = req.body;
    console.log("Dados recebidos:", telefone, senha);

    const usuario = await User.findOne({ telefone });
    console.log("Usuário encontrado:", usuario);

    if (!usuario || !(await usuario.verificarSenha(senha))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, nome: usuario.nome, id: usuario._id });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao logar', details: err.message });
  }
});

module.exports = router;
