const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Criar um novo pedido (POST)
router.post("/order", async (req, res) => {
  try {
    const body = req.body;

    // Mapear os campos do JSON enviado para o formato do MongoDB
    const orderMapped = {
      orderId: body.numeroPedido,
      value: body.valorTotal,
      creationDate: new Date(body.dataCriacao),
      items: body.items.map(item => ({
        productId: item.idItem,
        quantity: Number(item.quantidadeItem),
        price: Number(item.valorItem)
      }))
    };

    const newOrder = await Order.create(orderMapped);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar o pedido", detalhes: err.message });
  }
});

// Obter os dados de um pedido pelo número do pedido (GET)
router.get("/order/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar o pedido", detalhes: err.message });
  }
});

// Listar todos os pedidos (GET opcional)
router.get("/order/list", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar pedidos", detalhes: err.message });
  }
});

// Atualizar um pedido pelo número do pedido (PUT opcional)
router.put("/order/:orderId", async (req, res) => {
  try {
    const updated = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar o pedido", detalhes: err.message });
  }
});

// Deletar um pedido pelo número do pedido (DELETE opcional)
router.delete("/order/:orderId", async (req, res) => {
  try {
    const result = await Order.deleteOne({ orderId: req.params.orderId });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json({ message: "Pedido deletado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar o pedido", detalhes: err.message });
  }
});

module.exports = router;
