const express = require("express");
const router = express.Router();
const OrderInfo = require("../models/orderInfo");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { phone, price, address, state, cep } = req.body;

    const order = await OrderInfo.create({
      userName: req.user.nome, 
      phone,
      price,
      address,
      state,
      cep
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar pedido", details: err.message });
  }
});

module.exports = router;
