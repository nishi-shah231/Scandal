const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { Order } = require('../models/Order');
const Review = require('../models/Review');

// GET Metrics
router.get('/metrics', async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalRevenueResult = await Order.sum('totalAmount', { 
        where: { paymentStatus: 'Success' } 
    });
    // In case no orders exist
    const totalRevenue = totalRevenueResult || 0;

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching metrics', error: err.message });
  }
});

// GET All Orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// PUT Update Order Status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    
    if (!orderStatus) {
      return res.status(400).json({ message: 'Missing orderStatus' });
    }

    await Order.update({ orderStatus }, { where: { id } });
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
});

// GET All Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// GET All Reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

module.exports = router;
