import express from 'express';
import mongoose from 'mongoose';
import { Product } from './schema/productSchema.js';

const app = express();
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect('mongodb://localhost:27017/product')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

// ✅ Get all products
app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// ✅ Add a new product
app.post('/add', async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({ name, price, category, inStock });
    await newProduct.save();

    res.status(201).json({ message: "Product added"});
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});

// ✅ Get one product by name
app.get('/product/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// ✅ Delete a product by name
app.delete('/delete/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Product.deleteOne({ name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
