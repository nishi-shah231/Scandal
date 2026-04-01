const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true // Allow guest checkout
  },
  customerInfo: {
    type: DataTypes.JSON,
    allowNull: false
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.INTEGER, // in INR
    allowNull: false
  },
  paymentType: {
    type: DataTypes.STRING, // 'RAZORPAY' or 'COD'
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.STRING, // 'Pending', 'Success', 'Failed'
    defaultValue: 'Pending'
  },
  razorpayOrderId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  razorpayPaymentId: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = { Order };
