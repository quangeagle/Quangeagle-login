import express from 'express';
import { createProduct, getProductsByCategory, deleteProduct, updateProduct , getAllProducts,getProductById } from '../controllers/productController.js';

const router = express.Router();

router.post('/themSP', createProduct);
router.get('/category/:categoryId', getProductsByCategory);
router.delete('/xoaSP/:id', deleteProduct);
router.put('/suaSP/:id', updateProduct);
router.get('/get', getAllProducts);
router.get('/products/:id', getProductById);
export { router as productRouter };
