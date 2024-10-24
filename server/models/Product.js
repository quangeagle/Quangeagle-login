import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  discount: {
    type: Number,
    default: 0, 
  },
  newPrice: {
    type: Number,
    default: 0, 
  },
  unit :{
    type: String,
    required: true,
  },
  Supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supplier',
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export { Product };
