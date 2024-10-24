




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from './UserContext';

// const Shipping = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [shippingInfo, setShippingInfo] = useState({
//     address: '',
//     name: '',
//     phone: '',
//     email: '',
//     selectedDate: '',
//     selectedTime: '',
//     paymentMethod: 'COD', // Hoặc 'CreditCard'
//     creditCardNumber: '',
//     expiryDate: '',
//     securityCode: '',
//     note: ''
//   });
//   const { userId } = useUser();

//   useEffect(() => {
//     if (userId) {
//       axios.get(`http://localhost:3004/cart/${userId}`)
//         .then(response => {
//           console.log('Cart items response:', response.data);
//           if (response.data && Array.isArray(response.data.cartItems)) {
//             setCartItems(response.data.cartItems);
//           } else {
//             console.error('Received data is not in the expected format:', response.data);
//             setCartItems([]);
//           }
//         })
//         .catch(error => {
//           console.error('Error fetching cart items:', error);
//         });
//     }
//   }, [userId]);

//   const handleShippingInfoChange = (e) => {
//     const { name, value } = e.target;
//     setShippingInfo({
//       ...shippingInfo,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     axios.post('http://localhost:3004/ship/themship', { 
//       ...shippingInfo, 
//       userId,
//       orderItems: cartItems.map(item => ({
//         productId: item.productId._id, // Hoặc `item.productId` tùy vào cách bạn lưu trữ ID sản phẩm
//         quantity: item.quantity
//       }))
//     })
//       .then(response => {
//         console.log('Shipping info saved successfully');
//       })
//       .catch(error => {
//         console.error('Error saving shipping info:', error);
//       });
//   };
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2">Hình sản phẩm</th>
//             <th className="border p-2">Tên sản phẩm</th>
//             <th className="border p-2">Số lượng</th>
//             <th className="border p-2">Giá</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.length > 0 ? (
//             cartItems.map(item => (
//               <tr key={item._id || item.productId}>
//                 <td className="border p-2">
//                   <img src={item.productId.imageUrl} alt="Product" className="w-20 h-20 object-cover" />
//                 </td>
//                 <td className="border p-2">{item.productId.name}</td>
//                 <td className="border p-2">{item.quantity}</td>
//                 <td className="border p-2">{item.productId.price}₫</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="border p-2 text-center">Giỏ hàng trống</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <h2 className="text-xl font-bold mt-6 mb-4">Thông tin giao hàng</h2>
//       <div className="mb-4">
//         <label className="block mb-2">
//           Địa chỉ:
//           <input
//             type="text"
//             name="address"
//             value={shippingInfo.address}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Tên:
//           <input
//             type="text"
//             name="name"
//             value={shippingInfo.name}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Số điện thoại:
//           <input
//             type="text"
//             name="phone"
//             value={shippingInfo.phone}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={shippingInfo.email}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Ngày giao hàng:
//           <input
//             type="date"
//             name="selectedDate"
//             value={shippingInfo.selectedDate}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Giờ giao hàng:
//           <input
//             type="time"
//             name="selectedTime"
//             value={shippingInfo.selectedTime}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//         <label className="block mb-2">
//           Phương thức thanh toán:
//           <select
//             name="paymentMethod"
//             value={shippingInfo.paymentMethod}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           >
//             <option value="COD">Thanh toán khi nhận hàng (COD)</option>
//             <option value="CreditCard">Thẻ tín dụng</option>
//           </select>
//         </label>
//         {shippingInfo.paymentMethod === 'CreditCard' && (
//           <>
//             <label className="block mb-2">
//               Số thẻ tín dụng:
//               <input
//                 type="text"
//                 name="creditCardNumber"
//                 value={shippingInfo.creditCardNumber}
//                 onChange={handleShippingInfoChange}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Ngày hết hạn:
//               <input
//                 type="text"
//                 name="expiryDate"
//                 value={shippingInfo.expiryDate}
//                 onChange={handleShippingInfoChange}
//                 className="border p-2 w-full"
//               />
//             </label>
//             <label className="block mb-2">
//               Mã bảo mật:
//               <input
//                 type="text"
//                 name="securityCode"
//                 value={shippingInfo.securityCode}
//                 onChange={handleShippingInfoChange}
//                 className="border p-2 w-full"
//               />
//             </label>
//           </>
//         )}
//         <label className="block mb-2">
//           Ghi chú:
//           <textarea
//             name="note"
//             value={shippingInfo.note}
//             onChange={handleShippingInfoChange}
//             className="border p-2 w-full"
//           />
//         </label>
//       </div>
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white py-2 px-4 rounded"
//       >
//         Xác nhận
//       </button>
//     </div>
//   );
// };

// export default Shipping;
/////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const Shipping = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    name: '',
    phone: '',
    email: '',
    selectedDate: '',
    selectedTime: '',
    paymentMethod: 'COD', // Hoặc 'CreditCard'
    creditCardNumber: '',
    expiryDate: '',
    securityCode: '',
    note: ''
  });
  const { userId } = useUser();

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3004/cart/${userId}`)
        .then(response => {
          console.log('Cart items response:', response.data);
          if (response.data && Array.isArray(response.data.cartItems)) {
            setCartItems(response.data.cartItems);
          } else {
            console.error('Received data is not in the expected format:', response.data);
            setCartItems([]);
          }
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [userId]);

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3004/ship/themship', { 
      ...shippingInfo, 
      userId,
      orderItems: cartItems.map(item => ({
        productId: item.productId._id, // Hoặc `item.productId` tùy vào cách bạn lưu trữ ID sản phẩm
        quantity: item.quantity
      }))
    })
      .then(response => {
        console.log('Shipping info saved successfully');
      })
      .catch(error => {
        console.error('Error saving shipping info:', error);
      });
  };

  // Tính toán ngày hiện tại và ngày tối đa
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  // Định dạng ngày theo yyyy-mm-dd
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Giỏ hàng</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Hình sản phẩm</th>
            <th className="border p-2">Tên sản phẩm</th>
            <th className="border p-2">Số lượng</th>
            <th className="border p-2">Giá</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <tr key={item._id || item.productId}>
                <td className="border p-2">
                  <img src={item.productId.imageUrl} alt="Product" className="w-20 h-20 object-cover" />
                </td>
                <td className="border p-2">{item.productId.name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.productId.price}₫</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-2 text-center">Giỏ hàng trống</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-6 mb-4">Thông tin giao hàng</h2>
      <div className="mb-4">
        <label className="block mb-2">
          Địa chỉ:
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Tên:
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Số điện thoại:
          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Ngày giao hàng:
          <input
            type="date"
            name="selectedDate"
            value={shippingInfo.selectedDate}
            min={formatDate(today)}
            max={formatDate(maxDate)}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Giờ giao hàng:
          <input
            type="time"
            name="selectedTime"
            value={shippingInfo.selectedTime}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Phương thức thanh toán:
          <select
            name="paymentMethod"
            value={shippingInfo.paymentMethod}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          >
            <option value="COD">Thanh toán khi nhận hàng (COD)</option>
            <option value="CreditCard">Thẻ tín dụng</option>
          </select>
        </label>
        {shippingInfo.paymentMethod === 'CreditCard' && (
          <>
            <label className="block mb-2">
              Số thẻ tín dụng:
              <input
                type="text"
                name="creditCardNumber"
                value={shippingInfo.creditCardNumber}
                onChange={handleShippingInfoChange}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Ngày hết hạn:
              <input
                type="text"
                name="expiryDate"
                value={shippingInfo.expiryDate}
                onChange={handleShippingInfoChange}
                className="border p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Mã bảo mật:
              <input
                type="text"
                name="securityCode"
                value={shippingInfo.securityCode}
                onChange={handleShippingInfoChange}
                className="border p-2 w-full"
              />
            </label>
          </>
        )}
        <label className="block mb-2">
          Ghi chú:
          <textarea
            name="note"
            value={shippingInfo.note}
            onChange={handleShippingInfoChange}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Xác nhận
      </button>
    </div>
  );
};

export default Shipping;

















