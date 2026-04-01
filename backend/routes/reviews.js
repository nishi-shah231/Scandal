const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/Review');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// GET /api/reviews/:productId
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: req.params.productId },
      order: [['createdAt', 'DESC']]
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// POST /api/reviews
router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId, userName, comment, rating } = req.body;
    if (!productId || !comment || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const review = await Review.create({
      productId,
      userId: req.userId,
      userName,
      comment,
      rating
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review', error: err.message });
  }
});

module.exports = router;
