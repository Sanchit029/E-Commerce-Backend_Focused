const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

const { getCart, postCartQuantity, postCart, clearCart } = require('../controllers/cartController');

// GET user's cart
router.get('/', auth, getCart);

// Add to cart
router.post('/', auth, postCart);

// Update quantity
router.post('/:id', auth, postCartQuantity);

// Clear cart (delete all items for user)
router.delete('/', auth, clearCart);

module.exports = router;