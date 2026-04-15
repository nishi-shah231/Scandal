const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { Order } = require('../models/Order');
const { calculateOrderAmount } = require('../utils/helpers');

const router = express.Router();

// Initialize Razorpay with placeholder keys for TEST mode
// Ideally these should come from process.env, but using hardcoded basic test keys for this demo snippet if empty
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_zI3v3H3d2e67O', // Test keys for development purposes
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'Z2WvU3a4qX2O6nI7iE2k8h2z'
});

// Create Order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, paymentType, customerInfo, items, userId } = req.body;

    if (paymentType === 'COD') {
      // Cash on delivery: bypass razorpay order generation
      const newOrder = await Order.create({
        customerInfo,
        items,
        totalAmount: calculateOrderAmount(amount),
        paymentType: 'COD',
        paymentStatus: 'Pending (COD)',
        userId
      });
      return res.json({ success: true, orderId: newOrder.id, message: 'COD Order created successfully' });
    }

    // RAZORPAY
    const options = {
      amount: calculateOrderAmount(amount * 100), // Razorpay expects amount in paise
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`
    };

    try {
      const order = await razorpay.orders.create(options);

      // Save initial order in DB
      const dbOrder = await Order.create({
        customerInfo,
        items,
        totalAmount: calculateOrderAmount(amount), // keep in INR
        paymentType: 'RAZORPAY',
        paymentStatus: 'Awaiting Payment',
        razorpayOrderId: order.id,
        userId
      });

      res.json({ success: true, order, dbOrderId: dbOrder.id });
    } catch (razorError) {
      console.error('Razorpay Error Details:', razorError);
      throw new Error(`Razorpay Error: ${razorError.description || razorError.message || 'Unknown Razorpay error'}`);
    }

  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error creating order',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Verify Payment Signature
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dbOrderId } = req.body;

    const shasum = crypto.createHmac('sha256', razorpay.key_secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      await Order.update({ paymentStatus: 'Failed' }, { where: { id: dbOrderId } });
      return res.status(400).json({ success: false, message: 'Transaction not legit!' });
    }

    // Payment is valid
    await Order.update({
      paymentStatus: 'Success',
      razorpayPaymentId: razorpay_payment_id
    }, { where: { id: dbOrderId } });

    res.json({ success: true, message: 'Payment verified successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error verifying payment' });
  }
});


// TRY-ON ROUTE
router.post("/try-on", async (req, res) => {
  try {
    const { personImage, productImage } = req.body;

    const Replicate = require("replicate");
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    });

    const output = await replicate.run(
      "cjwbw/tryon",
      {
        input: {
          image: personImage,
          garment: productImage
        }
      }
    );

    res.json({ success: true, image: output });

  } catch (err) {
    console.error("Try-on error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
