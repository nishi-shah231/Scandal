const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => res.json({ message: 'Vastra API running ✦' }));

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected & synced ✦');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ✦`));
  })
  .catch(err => console.error('DB connection error:', err));
