  const express = require('express');
  const cors = require('cors');
  require('dotenv').config();

  const { sequelize } = require('./config/db');
  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/products');
  const cartRoutes = require('./routes/cart');
  const paymentRoutes = require('./routes/payment');
  const userRoutes = require('./routes/user');
  const orderRoutes = require('./routes/orders');
  const reviewRoutes = require('./routes/reviews');
  const adminRoutes = require('./routes/admin');
  require('./models/Order');
  require('./models/Address');
  require('./models/Review');
  require('./models/User'); // ensure user is initialized

  const app = express();

  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/payment', paymentRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/', (req, res) => res.json({ message: 'Vastra API running ✦' }));

  const PORT = process.env.PORT || 5000;

  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Database connected & synced ✦');
      if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, '0.0.0.0', () =>
          console.log(`Server running on port ${PORT} ✦`)
        );
      }
    })
    .catch(err => console.error('DB connection error:', err));

  module.exports = app;
