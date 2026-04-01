const express = require('express');
const { Order } = require('../models/Order');

const router = express.Router();

// Get orders for user
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.findAll({ 
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
