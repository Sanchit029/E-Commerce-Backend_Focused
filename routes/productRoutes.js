const express = require('express');
const auth = require('../middleware/authMiddleware');
const router = express.Router();
const { getProducts, getProductById, postProducts, deleteProduct, updateProduct } = require('../controllers/productController');

// GET all products (any authenticated user)
router.get('/', auth(), getProducts);

// Get product by id (any authenticated user)
router.get('/:id', auth(), getProductById);

// post request (admin only)
router.post('/', auth('admin'), postProducts);

// delete request (admin only)
router.delete('/:id', auth('admin'), deleteProduct);

// update request (admin only)
router.put('/:id', auth('admin'), updateProduct);

module.exports = router;