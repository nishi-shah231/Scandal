/**
 * Calculates and validates the final order amount.
 * @param {number} amount - The initial order amount
 * @returns {number} The rounded integer order amount
 */
function calculateOrderAmount(amount) {
  if (amount === undefined || amount === null || isNaN(amount) || amount < 0) {
    throw new Error('Invalid amount passed to calculateOrderAmount');
  }
  return Math.round(amount);
}

/**
 * Calculates the total cost of all items currently in a cart array.
 * @param {Array} items - Array of cart item objects containing a price and qty
 * @returns {number} Final total sum
 */
function calculateCartTotal(items) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return 0;
  }
  return items.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQty = parseInt(item.qty, 10) || 1;
    return total + (itemPrice * itemQty);
  }, 0);
}

module.exports = {
  calculateOrderAmount,
  calculateCartTotal,
};
