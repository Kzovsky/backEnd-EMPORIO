const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  admin: { type: Boolean, default: false },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }
});


// Hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

// Método p verificar senha
UserSchema.methods.verificarSenha = async function (senhaInformada) {
  return await bcrypt.compare(senhaInformada, this.senha);
};

module.exports = mongoose.model('User', UserSchema);
