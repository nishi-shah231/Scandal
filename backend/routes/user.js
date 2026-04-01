const express = require('express');
const Address = require('../models/Address');

const router = express.Router();

// Get user addresses
router.get('/:userId/addresses', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const addresses = await Address.findAll({ where: { userId } });
    res.json(addresses);
  } catch (err) {
    console.error('Error fetching addresses:', err);
    res.status(500).json({ 
      message: 'Server error fetching addresses', 
      error: err.message 
    });
  }
});

// Add new address
router.post('/:userId/addresses', async (req, res) => {
  try {
    const { fullName, phone, street, city, state, pincode, isDefault } = req.body;
    
    // If setting default, unset others
    if (isDefault) {
      await Address.update({ isDefault: false }, { where: { userId: req.params.userId } });
    }

    const address = await Address.create({
      userId: req.params.userId,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      isDefault: isDefault || false
    });

    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: 'Server error creating address', error: err.message });
  }
});

module.exports = router;
