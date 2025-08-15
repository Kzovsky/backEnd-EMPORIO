const Cart = require('../models/cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.json({ items: [], totalItems: 0, totalPrice: 0 });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar carrinho' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1, price: product.price });
    }

    cart.updateTotals();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar no carrinho' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ error: 'Carrinho não encontrado' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    cart.updateTotals();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover do carrinho' });
  }
};
