import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '/EMART_ADMIN/emart_DA/emart-hk3/emat/components/sidebar1'; 
const CreateProduct = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3005/product/choduyet');
      setPendingProducts(res.data);
      
      // Sau khi đã lấy danh sách sản phẩm, lấy thông tin nhà cung cấp
      fetchSuppliers(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm chờ duyệt:', error);
    }
  };

  const fetchSuppliers = async (products) => {
    try {
      // Tạo một danh sách các Supplier IDs để lấy thông tin nhà cung cấp
      const supplierIds = [...new Set(products.map(product => product.Supplier))];
      
      const suppliersData = await Promise.all(
        supplierIds.map(id => axios.get(`http://localhost:3005/${id}`))
      );

      // Tạo đối tượng với key là Supplier ID và value là thông tin nhà cung cấp
      const suppliersObj = suppliersData.reduce((acc, res) => {
        acc[res.data._id] = res.data.name; // Giả sử tên nhà cung cấp nằm trong trường `name`
        return acc;
      }, {});

      setSuppliers(suppliersObj);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin nhà cung cấp:', error);
    }
  };

  const approveProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:3005/product/duyet/${productId}`);
      setMessage('Sản phẩm đã được duyệt.');
      fetchPendingProducts(); // Refresh list
    } catch (error) {
      console.error('Lỗi khi duyệt sản phẩm:', error);
    }
  };

  const rejectProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:3005/product/tuchoi/${productId}`);
      setMessage('Sản phẩm đã bị từ chối.');
      fetchPendingProducts(); // Refresh list
    } catch (error) {
      console.error('Lỗi khi từ chối sản phẩm:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
    <div classname =" bg-gray-400">
      <h2>Danh sách sản phẩm chờ duyệt</h2>
      {message && <p>{message}</p>}
      <ul>
        {pendingProducts.map((product) => (
          <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
            {/* Image and Product Details */}
            <div style={{ display: 'flex', flex: 1 }}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }}
              />
              <div>
                <p><strong>Tên sản phẩm:</strong> {product.name}</p>
                <p><strong>Giá:</strong> {product.price} VND</p>
                <p><strong>Số lượng:</strong> {product.quantity}</p>
                <p><strong>Nhà cung cấp:</strong> {suppliers[product.Supplier] || 'Không tìm thấy'}</p>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <button onClick={() => approveProduct(product._id)} style={{ marginBottom: '5px' }}>Duyệt</button>
              <button onClick={() => rejectProduct(product._id)}>Từ chối</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CreateProduct;
