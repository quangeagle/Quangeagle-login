// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; 
// const ManagePendingProducts = () => {
//   const [pendingProducts, setPendingProducts] = useState([]); // Danh sách sản phẩm đang chờ duyệt
//   const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm đã chọn
//   const { supplierId } = useParams();
//   // Lấy danh sách sản phẩm đang chờ duyệt của nhà cung cấp
//   useEffect(() => {
//     fetchPendingProducts();
//   }, [supplierId]);

//   const fetchPendingProducts = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3006/product/supplier/${supplierId}/pending-products`);
//       setPendingProducts(response.data);
//     } catch (error) {
//       console.error('Lỗi khi lấy sản phẩm chờ duyệt:', error);
//     }
//   };

//   // Chọn hoặc bỏ chọn sản phẩm
//   const handleProductSelection = (productId) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(selectedProducts.filter(id => id !== productId)); // Bỏ chọn
//     } else {
//       setSelectedProducts([...selectedProducts, productId]); // Chọn
//     }
//   };

//   // Duyệt các sản phẩm đã chọn
//   const approveSelectedProducts = async () => {
//     try {
//       await axios.post('http://localhost:3006/product/approve-multiple', { productIds: selectedProducts });
//       alert('Duyệt sản phẩm thành công');
//       setSelectedProducts([]); // Xóa các sản phẩm đã chọn
//       fetchPendingProducts(); // Tải lại danh sách sản phẩm
//     } catch (error) {
//       console.error('Lỗi khi duyệt sản phẩm:', error);
//     }
//   };

//   // Duyệt từng sản phẩm
//   const approveProduct = async (productId) => {
//     try {
//       await axios.post(`http://localhost:3006/product/approve/${productId}`);
//       alert('Duyệt sản phẩm thành công');
//       fetchPendingProducts(); // Tải lại danh sách sản phẩm
//     } catch (error) {
//       console.error('Lỗi khi duyệt sản phẩm:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sản phẩm chờ duyệt của nhà cung cấp</h2>

//       {pendingProducts.length === 0 ? (
//         <p className="text-center text-lg text-gray-500">Không có sản phẩm nào đang chờ duyệt.</p>
//       ) : (
//         <div>
//           {/* Bảng hiển thị sản phẩm */}
//           <table className="min-w-full bg-white shadow-lg rounded-lg">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 text-left">Chọn</th>
//                 <th className="px-6 py-3 text-left">Tên sản phẩm</th>
//                 <th className="px-6 py-3 text-left">Mô tả</th>
//                 <th className="px-6 py-3 text-left">Hành động</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingProducts.map((product) => (
//                 <tr key={product._id}>
//                   <td className="px-6 py-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product._id)}
//                       onChange={() => handleProductSelection(product._id)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{product.name}</td>
//                   <td className="px-6 py-4">{product.description}</td>
//                   <td className="px-6 py-4">
//                     <button
//                       onClick={() => approveProduct(product._id)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md"
//                     >
//                       Duyệt
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Duyệt tất cả sản phẩm đã chọn */}
//           {selectedProducts.length > 0 && (
//             <div className="mt-6 text-center">
//               <button
//                 onClick={approveSelectedProducts}
//                 className="bg-green-500 text-white px-6 py-3 rounded-md"
//               >
//                 Duyệt tất cả sản phẩm đã chọn
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManagePendingProducts;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ManagePendingProducts = () => {
//   const [pendingProducts, setPendingProducts] = useState([]); // Danh sách sản phẩm đang chờ duyệt
//   const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm đã chọn
//   const { supplierId } = useParams();

//   useEffect(() => {
//     fetchPendingProducts();
//   }, [supplierId]);

//   const fetchPendingProducts = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3006/product/supplier/${supplierId}/pending-products`
//       );
//       setPendingProducts(response.data);
//     } catch (error) {
//       console.error('Lỗi khi lấy sản phẩm chờ duyệt:', error);
//     }
//   };

//   const handleProductSelection = (productId) => {
//     if (selectedProducts.includes(productId)) {
//       setSelectedProducts(selectedProducts.filter((id) => id !== productId));
//     } else {
//       setSelectedProducts([...selectedProducts, productId]);
//     }
//   };

//   const approveSelectedProducts = async () => {
//     try {
//       await axios.post('http://localhost:3006/product/approve-multiple', {
//         productIds: selectedProducts,
//       });
//       alert('Duyệt sản phẩm thành công');
//       setSelectedProducts([]);
//       fetchPendingProducts();
//     } catch (error) {
//       console.error('Lỗi khi duyệt sản phẩm:', error);
//     }
//   };

//   const approveProduct = async (productId) => {
//     try {
//       await axios.post(`http://localhost:3006/product/approve/${productId}`);
//       alert('Duyệt sản phẩm thành công');
//       fetchPendingProducts();
//     } catch (error) {
//       console.error('Lỗi khi duyệt sản phẩm:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//       {/* Nút duyệt tất cả sản phẩm */}
//       <div className="text-center mb-6">
//         {selectedProducts.length > 0 && (
//           <button
//             onClick={approveSelectedProducts}
//             className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-md hover:bg-green-600"
//           >
//             Duyệt tất cả sản phẩm đã chọn
//           </button>
//         )}
//       </div>

//       {/* Danh sách sản phẩm */}
//       <div className="flex-1 p-6 mt-10 bg-white h-auto rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold mb-6 text-center">
//           Sản phẩm chờ duyệt
//         </h2>
//         {pendingProducts.length === 0 ? (
//           <p className="text-center text-lg text-gray-500">
//             Không có sản phẩm nào đang chờ duyệt.
//           </p>
//         ) : (
//           <ul className="space-y-4">
//             {pendingProducts.map((product) => (
//               <li
//                 key={product._id}
//                 className="bg-gray-100 p-6 rounded-lg shadow-md flex space-x-6"
//               >
//                 <div className="flex-shrink-0">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     className="w-24 h-24 object-cover rounded-md"
//                   />
//                 </div>
//                 <div className="flex-grow">
//                   <h3 className="text-xl font-semibold">{product.name}</h3>
//                   <p className="text-gray-600">
//                     <strong>Mô tả:</strong> {product.description}
//                   </p>
//                   <p className="text-gray-600">
//                     <strong>Trạng thái:</strong> {product.status}
//                   </p>
//                   <p className="text-gray-600">
//                     <strong>Giảm giá:</strong> {product.discount}%
//                   </p>
//                   <p className="text-gray-600">
//                     <strong>Nhà cung cấp:</strong> {product.supplier}
//                   </p>
//                   {product.versions.map((version, i) => (
//                     <div key={i} className="text-gray-600">
//                       <p>
//                         <strong>Phiên bản:</strong> {version.name}
//                       </p>
//                       <p>
//                         <strong>Giá:</strong> {version.price}₫
//                       </p>
//                       <p>
//                         <strong>Đơn vị:</strong> {version.unit}
//                       </p>
//                       <p>
//                         <strong>Số lượng:</strong> {version.quantity}
//                       </p>
//                       <p>
//                         <strong>Tổng số lượng:</strong> {version.totalQuantity}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => approveProduct(product._id)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
//                   >
//                     Duyệt
//                   </button>
//                   <div className="ml-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product._id)}
//                       onChange={() => handleProductSelection(product._id)}
//                       className="h-5 w-5 text-green-600"
//                     />
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManagePendingProducts;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ManagePendingProducts = () => {
  const [pendingProducts, setPendingProducts] = useState([]); // Danh sách sản phẩm đang chờ duyệt
  const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm đã chọn
  const { supplierId } = useParams();

  useEffect(() => {
    fetchPendingProducts();
  }, [supplierId]);

  const fetchPendingProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3006/product/supplier/${supplierId}/pending-products`
      );
      setPendingProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm chờ duyệt:', error);
    }
  };

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const approveSelectedProducts = async () => {
    console.log('Danh sách sản phẩm đã chọn:', selectedProducts); 
    try {
      await axios.post('http://localhost:3006/product/products/approve-multiple', {
        productIds: selectedProducts,
      });
      // Log phản hồi từ API
      alert('Duyệt sản phẩm thành công');
      setSelectedProducts([]);
      fetchPendingProducts();
    } catch (error) {
      console.error('Lỗi khi duyệt sản phẩm:', error);
    }
  };

  const approveProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:3006/product/duyet/${productId}`);
      alert('Duyệt sản phẩm thành công');
      fetchPendingProducts();
    } catch (error) {
      console.error('Lỗi khi duyệt sản phẩm:', error);
    }
  };

  // Chọn tất cả sản phẩm
  const handleSelectAll = () => {
    const allProductIds = pendingProducts.map((product) => product._id);
    setSelectedProducts(allProductIds); // Chọn tất cả sản phẩm
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {/* Nút chọn và duyệt tất cả sản phẩm */}
      <div className="text-center mb-6">
        <button
          onClick={handleSelectAll}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-md hover:bg-green-600 mr-4"
        >
          Chọn tất cả
        </button>
        {selectedProducts.length > 0 && (
          <button
            onClick={approveSelectedProducts}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl font-bold shadow-md hover:bg-blue-600"
          >
            Duyệt tất cả sản phẩm đã chọn
          </button>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className="flex-1 p-6 mt-10 bg-white h-auto rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Sản phẩm chờ duyệt
        </h2>
        {pendingProducts.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            Không có sản phẩm nào đang chờ duyệt.
          </p>
        ) : (
          <ul className="space-y-4">
            {pendingProducts.map((product) => (
              <li
                key={product._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex space-x-6"
              >
                <div className="flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">
                    <strong>Mô tả:</strong> {product.description}
                  </p>
                  <p className="text-gray-600">
                    <strong>Trạng thái:</strong> {product.status}
                  </p>
                  <p className="text-gray-600">
                    <strong>Giảm giá:</strong> {product.discount}%
                  </p>
                  <p className="text-gray-600">
                    <strong>Nhà cung cấp:</strong> {product.supplier}
                  </p>
                  {product.versions.map((version, i) => (
                    <div key={i} className="text-gray-600">
                      <p>
                        <strong>Phiên bản:</strong> {version.name}
                      </p>
                      <p>
                        <strong>Giá:</strong> {version.price}₫
                      </p>
                      <p>
                        <strong>Đơn vị:</strong> {version.unit}
                      </p>
                      <p>
                        <strong>Số lượng:</strong> {version.quantity}
                      </p>
                      <p>
                        <strong>Tổng số lượng:</strong> {version.totalQuantity}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => approveProduct(product._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Duyệt
                  </button>
                  <div className="ml-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleProductSelection(product._id)}
                      className="h-5 w-5 text-green-600"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManagePendingProducts;
