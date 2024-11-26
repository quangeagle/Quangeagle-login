



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const QlNhaCC = () => {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchPendingProducts();
//   }, []);

//   const fetchPendingProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:3005/product/choduyet');
//       setPendingProducts(res.data);
//     } catch (error) {
//       console.error('Lỗi khi lấy danh sách sản phẩm chờ duyệt:', error);
//     }
//   };

//   const approveProduct = async (productId) => {
//     try {
//       await axios.put(`http://localhost:3005/product/duyet/${productId}`);
//       setMessage('Sản phẩm đã được duyệt.');
//       fetchPendingProducts(); // Refresh list
//     } catch (error) {
//       console.error('Lỗi khi duyệt sản phẩm:', error);
//     }
//   };

//   const rejectProduct = async (productId) => {
//     try {
//       await axios.put(`http://localhost:3005/product/tuchoi/${productId}`);
//       setMessage('Sản phẩm đã bị từ chối.');
//       fetchPendingProducts(); // Refresh list
//     } catch (error) {
//       console.error('Lỗi khi từ chối sản phẩm:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Danh sách sản phẩm chờ duyệt</h2>
//       {message && <p>{message}</p>}
//       <ul>
//         {pendingProducts.map((product) => (
//           <li key={product._id}>
//             <p>{product.name}</p>
//             <button onClick={() => approveProduct(product._id)}>Duyệt</button>
//             <button onClick={() => rejectProduct(product._id)}>Từ chối</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default QlNhaCC;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom

const QlNhaCC = () => {
  const [suppliers, setSuppliers] = useState([]); // Danh sách nhà cung cấp

  // Lấy danh sách nhà cung cấp khi vào trang
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:3006/supplier/seen'); // Lấy danh sách nhà cung cấp
      setSuppliers(res.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Danh sách nhà cung cấp</h2>
      {suppliers.length === 0 ? (
        <p className="text-center text-lg text-gray-500">Không có nhà cung cấp nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              key={supplier._id}
            >
              <div className="flex items-center space-x-4">
                {/* Hiển thị hình ảnh nhà cung cấp */}
                <img
                  src={supplier.image}
                  alt={supplier.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="space-y-2">
                  {/* Hiển thị tên nhà cung cấp */}
                  <p className="text-lg font-semibold text-gray-800">{supplier.name}</p>
                  {/* Hiển thị địa chỉ nhà cung cấp nếu có */}
                  {supplier.address && (
                    <p className="text-sm text-gray-600">
                      <strong>Địa chỉ:</strong> {supplier.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Thêm Link để chuyển đến trang sản phẩm của nhà cung cấp */}
              <div className="mt-4 text-center">
                <Link
                  to={`/supplier/${supplier._id}`} // Chuyển đến trang sản phẩm của nhà cung cấp
                  className="text-blue-500 hover:text-blue-700"
                >
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QlNhaCC;
