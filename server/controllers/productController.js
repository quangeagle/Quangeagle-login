import { Product } from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { supplierId, categoryId, name, description, price, imageUrl, quantity, unit } = req.body;
    
    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl,
      quantity,
      unit,
      category: categoryId,  
      Supplier: supplierId,  
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, supplierId, name, description, price, imageUrl, quantity, unit } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { category: categoryId, Supplier: supplierId, name, description, price, imageUrl, quantity, unit },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await Product.findById(id)

    if (!productDetail) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    res.json(productDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
