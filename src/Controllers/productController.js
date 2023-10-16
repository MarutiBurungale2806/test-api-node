const Product = require('../Models/Product');

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createProduct: async (req, res) => {
    const { name, description, price } = req.body;

    try {
      const newProduct = new Product({ name, description, price });
      const product = await newProduct.save();
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  },

  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateProduct: async (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.name = name;
      product.description = description;
      product.price = price;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: 'Bad request' });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.remove();
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
