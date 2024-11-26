


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CreateHangHoaAndCate = () => {
//   // States for Hanghoa
//   const [hanghoaName, setHanghoaName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   // States for Category
//   const [categoryName, setCategoryName] = useState('');
//   const [hanghoas, setHanghoas] = useState([]); // Store all created hanghoas
//   const [selectedHanghoa, setSelectedHanghoa] = useState(''); // To link a category to a hanghoa

//   // States for Unit Options
//   const [unitName, setUnitName] = useState('');
//   const [itemsPerUnit, setItemsPerUnit] = useState('');
//   const [unitOptions, setUnitOptions] = useState([]); // Store unit options for the category

//   // Fetch existing hanghoas when the component loads
//   useEffect(() => {
//     const fetchHanghoas = async () => {
//       try {
//         const res = await axios.get('http://localhost:3005/hanghoa/all'); // Adjust API endpoint if needed
//         setHanghoas(res.data);
//       } catch (error) {
//         setErrorMessage('Lỗi khi tải hàng hóa.');
//       }
//     };

//     fetchHanghoas();
//   }, []);

//   // Create Hanghoa
//   const handleCreateHanghoa = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       const res = await axios.post('http://localhost:3005/hanghoa/create', { name: hanghoaName });
//       setSuccessMessage(`Hàng hóa "${res.data.name}" đã được tạo thành công!`);
//       setHanghoaName('');
//       setHanghoas([...hanghoas, res.data]); // Add the new hanghoa to the dropdown
//     } catch (error) {
//       setErrorMessage('Đã xảy ra lỗi khi tạo hàng hóa.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add unit option to the list
//   const handleAddUnitOption = () => {
//     if (unitName && itemsPerUnit) {
//       setUnitOptions([...unitOptions, { unitName, itemsPerUnit: parseInt(itemsPerUnit) }]);
//       setUnitName('');
//       setItemsPerUnit('');
//     } else {
//       setErrorMessage('Vui lòng nhập đầy đủ thông tin đơn vị và số lượng.');
//     }
//   };

//   // Remove a unit option from the list
//   const handleRemoveUnitOption = (index) => {
//     const newUnitOptions = unitOptions.filter((_, i) => i !== index);
//     setUnitOptions(newUnitOptions);
//   };

//   // Create Category linked to a selected Hanghoa
//   const handleCreateCategory = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMessage('');
//     setErrorMessage('');

//     if (!selectedHanghoa) {
//       setErrorMessage('Vui lòng chọn một hàng hóa.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:3005/category/them', {
//         name: categoryName,
//         hanghoaId: selectedHanghoa,
//         unitOptions
//       });
//       setSuccessMessage(`Danh mục "${res.data.name}" đã được tạo thành công!`);
//       setCategoryName('');
//       setSelectedHanghoa('');
//       setUnitOptions([]); // Clear unit options after category creation
//     } catch (error) {
//       setErrorMessage('Đã xảy ra lỗi khi tạo danh mục.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Tạo Hàng Hóa và Danh Mục</h2>

//       {/* Success or Error Messages */}
//       {successMessage && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{successMessage}</div>}
//       {errorMessage && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{errorMessage}</div>}

//       {/* Form for creating Hanghoa */}
//       <form onSubmit={handleCreateHanghoa}>
//         <label htmlFor="hanghoaName" className="block text-lg font-medium text-gray-700 mb-2">
//           Tên hàng hóa
//         </label>
//         <input
//           type="text"
//           id="hanghoaName"
//           name="hanghoaName"
//           value={hanghoaName}
//           onChange={(e) => setHanghoaName(e.target.value)}
//           required
//           className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           placeholder="Nhập tên hàng hóa"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
//             loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Đang tạo...' : 'Tạo hàng hóa'}
//         </button>
//       </form>

//       {/* Form for creating Category */}
//       <form onSubmit={handleCreateCategory} className="mt-8">
//         <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700 mb-2">
//           Tên danh mục
//         </label>
//         <input
//           type="text"
//           id="categoryName"
//           name="categoryName"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           required
//           className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           placeholder="Nhập tên danh mục"
//         />

//         {/* Dropdown to select Hanghoa */}
//         <label htmlFor="hanghoaSelect" className="block text-lg font-medium text-gray-700 mb-2">
//           Chọn hàng hóa
//         </label>
//         <select
//           id="hanghoaSelect"
//           name="hanghoaSelect"
//           value={selectedHanghoa}
//           onChange={(e) => setSelectedHanghoa(e.target.value)}
//           required
//           className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="">Chọn hàng hóa</option>
//           {hanghoas.map(hanghoa => (
//             <option key={hanghoa._id} value={hanghoa._id}>
//               {hanghoa.name}
//             </option>
//           ))}
//         </select>

//         {/* Unit Options for Category */}
//         <div className="mt-4">
//           <h3 className="text-lg font-medium mb-2">Đơn vị tính</h3>
//           <div className="flex gap-2 mb-4">
//             <input
//               type="text"
//               placeholder="Tên đơn vị (VD: Thùng)"
//               value={unitName}
//               onChange={(e) => setUnitName(e.target.value)}
//               className="w-1/2 p-2 border rounded"
//             />
//             <input
//               type="number"
//               placeholder="Số lượng mỗi đơn vị"
//               value={itemsPerUnit}
//               onChange={(e) => setItemsPerUnit(e.target.value)}
//               className="w-1/2 p-2 border rounded"
//             />
//             <button
//               type="button"
//               onClick={handleAddUnitOption}
//               className="p-2 bg-blue-500 text-white rounded"
//             >
//               Thêm đơn vị
//             </button>
//           </div>

//           {/* List of added unit options */}
//           <ul>
//             {unitOptions.map((unit, index) => (
//               <li key={index} className="flex justify-between mb-2">
//                 <span>{unit.unitName} - {unit.itemsPerUnit} sản phẩm</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveUnitOption(index)}
//                   className="text-red-500"
//                 >
//                   Xóa
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${
//             loading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {loading ? 'Đang tạo...' : 'Tạo danh mục'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateHangHoaAndCate;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar1';

const CreateHangHoaAndCate = () => {
  // States for Hanghoa
  const [hanghoaName, setHanghoaName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // States for Category
  const [categoryName, setCategoryName] = useState('');
  const [hanghoas, setHanghoas] = useState([]); // Store all created hanghoas
  const [selectedHanghoa, setSelectedHanghoa] = useState(''); // To link a category to a hanghoa

  // States for Unit Options
  const [unitName, setUnitName] = useState('');
  const [unitQuantity, setUnitQuantity] = useState('');
  const [unitOptions, setUnitOptions] = useState([]); // Store unit options for the category

  // Fetch existing hanghoas when the component loads
  useEffect(() => {
    const fetchHanghoas = async () => {
      try {
        const res = await axios.get('http://localhost:3005/hanghoa/all'); // Adjust API endpoint if needed
        setHanghoas(res.data);
      } catch (error) {
        setErrorMessage('Lỗi khi tải hàng hóa.');
      }
    };

    fetchHanghoas();
  }, []);

  // Create Hanghoa
  const handleCreateHanghoa = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:3005/hanghoa/create', { name: hanghoaName });
      setSuccessMessage(`Hàng hóa "${res.data.name}" đã được tạo thành công!`);
      setHanghoaName('');
      setHanghoas([...hanghoas, res.data]); // Add the new hanghoa to the dropdown
    } catch (error) {
      setErrorMessage('Đã xảy ra lỗi khi tạo hàng hóa.');
    } finally {
      setLoading(false);
    }
  };

  // Add unit option with multiple quantities
  const handleAddUnitOption = () => {
    if (unitName && unitQuantity && !isNaN(unitQuantity) && parseInt(unitQuantity) > 0) {
      const existingUnit = unitOptions.find((option) => option.unitName === unitName);
  
      if (existingUnit) {
        // Add new quantity to the existing unit
        existingUnit.quantities.push(parseInt(unitQuantity)); // Change 'itemsPerUnit' to 'quantities'
        setUnitOptions([...unitOptions]);
      } else {
        // Add new unit with initial quantity
        setUnitOptions([...unitOptions, { unitName, quantities: [parseInt(unitQuantity)] }]); // Change 'itemsPerUnit' to 'quantities'
      }
  
      setUnitName('');
      setUnitQuantity('');
    } else {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin đơn vị và số lượng hợp lệ.');
    }
  };

  // Remove a specific quantity from a unit option
  const handleRemoveUnitQuantity = (unitIndex, quantityIndex) => {
    const updatedUnitOptions = [...unitOptions];
    updatedUnitOptions[unitIndex].quantities.splice(quantityIndex, 1); // Change 'itemsPerUnit' to 'quantities'
  
    // If no quantities left, remove the unit entirely
    if (updatedUnitOptions[unitIndex].quantities.length === 0) { // Change 'itemsPerUnit' to 'quantities'
      updatedUnitOptions.splice(unitIndex, 1);
    }
  
    setUnitOptions(updatedUnitOptions);
  };

  // Create Category linked to a selected Hanghoa
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
  
    if (!selectedHanghoa) {
      setErrorMessage('Vui lòng chọn một hàng hóa.');
      setLoading(false);
      return;
    }
  
    // Chuyển đổi unitOptions thành mảng đơn giản các quantities
    const quantities = unitOptions.flatMap(unit => unit.quantities); // Chuyển 'itemsPerUnit' thành 'quantities'
    console.log(unitOptions);
    
    try {
      const res = await axios.post('http://localhost:3005/category/them', {
        name: categoryName,
        hanghoaId: selectedHanghoa,
        unitOptions: unitOptions.map(unit => ({
          unitName: unit.unitName,
          quantities: unit.quantities, // Sử dụng quantities đã chuyển đổi
        })),
      });
      setSuccessMessage(`Danh mục "${res.data.name}" đã được tạo thành công!`);
      setCategoryName('');
      setSelectedHanghoa('');
      setUnitOptions([]); // Clear unit options after category creation
    } catch (error) {
      console.error(error.response); // Xem chi tiết lỗi trả về từ server
      setErrorMessage(`Lỗi: ${error.response ? error.response.data.message : 'Không xác định'}`);
      setErrorMessage('Đã xảy ra lỗi khi tạo danh mục.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <Sidebar/>
      <div className="  flex-1 max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      
      <h2 className="text-2xl font-bold mb-6 text-center">Tạo Hàng Hóa và Danh Mục</h2>

      {/* Success or Error Messages */}
      {successMessage && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{successMessage}</div>}
      {errorMessage && <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{errorMessage}</div>}

      {/* Form for creating Hanghoa */}
      <form onSubmit={handleCreateHanghoa}>
        <label htmlFor="hanghoaName" className="block text-lg font-medium text-gray-700 mb-2">
          Tên hàng hóa
        </label>
        <input
          type="text"
          id="hanghoaName"
          name="hanghoaName"
          value={hanghoaName}
          onChange={(e) => setHanghoaName(e.target.value)}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nhập tên hàng hóa"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Đang tạo...' : 'Tạo hàng hóa'}
        </button>
      </form>

      {/* Form for creating Category */}
      <form onSubmit={handleCreateCategory} className="mt-8">
        <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700 mb-2">
          Tên danh mục
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Nhập tên danh mục"
        />

        {/* Dropdown to select Hanghoa */}
        <label htmlFor="hanghoaSelect" className="block text-lg font-medium text-gray-700 mb-2">
          Chọn hàng hóa
        </label>
        <select
          id="hanghoaSelect"
          name="hanghoaSelect"
          value={selectedHanghoa}
          onChange={(e) => setSelectedHanghoa(e.target.value)}
          required
          className="block w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Chọn hàng hóa</option>
          {hanghoas.map((hanghoa) => (
            <option key={hanghoa._id} value={hanghoa._id}>
              {hanghoa.name}
            </option>
          ))}
        </select>

        {/* Unit Options for Category */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Đơn vị và Số lượng</h3>
          <div className="flex mb-4">
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              placeholder="Tên đơn vị"
              className="w-1/3 p-3 border border-gray-300 rounded-l-md"
            />
            <input
              type="number"
              value={unitQuantity}
              onChange={(e) => setUnitQuantity(e.target.value)}
              placeholder="Số lượng"
              className="w-1/3 p-3 border border-gray-300"
            />
            <button
              type="button"
              onClick={handleAddUnitOption}
              className="w-1/3 p-3 bg-green-500 text-white rounded-r-md hover:bg-green-600"
            >
              Thêm
            </button>
          </div>

          {/* Display unit options */}
          <ul>
            {unitOptions.map((unit, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{unit.unitName}: {unit.quantities.join(', ')}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveUnitQuantity(index)}
                  className="text-red-600"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Đang tạo...' : 'Tạo danh mục'}
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default CreateHangHoaAndCate;
