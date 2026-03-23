const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET /api/cart/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const items = await Cart.findAll({ where: { sessionId: req.params.sessionId } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/cart
router.post('/', async (req, res) => {
  try {
    const { sessionId, productId, productName, productImage, price, qty, category } = req.body;
    if (!sessionId || !productId) return res.status(400).json({ message: 'sessionId and productId required' });

    let item = await Cart.findOne({ where: { sessionId, productId } });
    if (item) {
      item.qty += qty || 1;
      await item.save();
    } else {
      item = await Cart.create({ sessionId, productId, productName, productImage, price, qty: qty || 1, category });
    }
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/cart/:id
router.put('/:id', async (req, res) => {
  try {
    const item = await Cart.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });
    item.qty = req.body.qty;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await Cart.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });
    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/cart/session/:sessionId (clear cart)
router.delete('/session/:sessionId', async (req, res) => {
  try {
    await Cart.destroy({ where: { sessionId: req.params.sessionId } });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
