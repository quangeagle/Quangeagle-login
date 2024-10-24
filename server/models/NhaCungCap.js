// E:\emart\server\models\NhaCungCap.js
import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const SupplierModel = mongoose.model('Supplier', SupplierSchema);

export { SupplierModel as supplier };