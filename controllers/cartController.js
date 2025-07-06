// boilerplate
const Cart = require("../models/Cart");

// GET /api/cart
// getting the cart details
const getCart = async (req, res) => {
  try {
    const cartDetails = await Cart.find({ userId: req.user });
    res.json(cartDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Post request

const postCart = async (req, res) => {
  try {
    // Check if item already exists for this user and product name
    let cartItem = await Cart.findOne({ userId: req.user, name: req.body.name });
    if (cartItem) {
      // If price is different, update price (optional, for safety)
      if (cartItem.price !== req.body.price) {
        cartItem.price = req.body.price;
      }
      cartItem.quantity += 1;
      await cartItem.save();
      // Return the updated cart for the user
      const cartDetails = await Cart.find({ userId: req.user });
      return res.json(cartDetails);
    }
    // If not, create new
    cartItem = new Cart({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      userId: req.user
    });
    await cartItem.save();
    // Return the updated cart for the user
    const cartDetails = await Cart.find({ userId: req.user });
    res.json(cartDetails);
  } catch (error) {
    res.status(500).json({ message: "Not able to store data", error });
  }
};

// Update the quantity (decrement or remove)
const postCartQuantity = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      res.json(cartItem);
    } else {
      await Cart.deleteOne({ _id: req.params.id }); // safer than remove()
      res.json({ message: "Item removed from cart" });
    }
  } catch (error) {
    console.error(error); // Add this for debugging
    res.status(500).json({ message: "Not able to update cart", error });
  }
};
// DELETE /api/cart - clear the user's cart
const clearCart = async (req, res) => {
  try {
    // Assuming you have user info in req.user (from auth middleware)
    // and your Cart model has a userId field (add if not present)
    await Cart.deleteMany({ userId: req.user });
    res.json({ msg: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Unable to clear cart", error });
  }
};

module.exports = { getCart, postCart, postCartQuantity, clearCart };
