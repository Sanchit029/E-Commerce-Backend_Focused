// boilerplate
const Product = require("../models/Product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

//Post request

const postProducts = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      description: req.body.desc,
      category: req.body.category,
    });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Not able to store data", error });
  }
};
//Delete request

const deleteProduct = async (req, res) => {
  await Product.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "Deleted" });
};

// Update product by ID
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        description: req.body.desc,
        category: req.body.category,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Unable to update product", error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  postProducts,
  deleteProduct,
  updateProduct,
};
