// controllers/productController.js
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  const produtos = await Product.find();
  res.json(produtos);
};

const createProduct = async (req, res) => {
  const novo = new Product(req.body);
  await novo.save();
  res.status(201).json(novo);
};

const updateProduct = async (req, res) => {
  const atualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produto excluído com sucesso" });
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
//teste