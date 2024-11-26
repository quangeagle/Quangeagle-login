// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faChevronDown, faSearch, faCartShopping, faHeart, faUser, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// function Header({ username }) {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState('Phan Van Tri');

//     const handleDropdownToggle = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleItemClick = (item) => {
//         setSelectedItem(item);
//         setIsDropdownOpen(false);
//     };

//     const items = ['Phan Van Tri', 'Sala', 'Phan Huy Ich'];

//     return (
//         <header>
//             <div className="bg-amber-400 h-14 w-full flex flex-row ">
//                 <Link to='/home'>
//                 <img src="emart.png" alt="Grab" className=' ml-32 w-36 h-8 mt-2' />
//                 </Link>
              
//                 <div className="relative group">
//                     <div className='flex flex-row  text-white mt-4 ml-4'>
//                         <p><FontAwesomeIcon icon={faBars} /> </p>
//                         <p className='text-lg ml-1'>Tất cả danh mục </p>
//                     </div>
//                     <div className="hidden absolute bg-white shadow-lg rounded mt-2 w-80 -left-40 group-hover:block z-50">
//                         <div className="p-2 hover:bg-gray-100 relative group/edit1">
//                         <Link to='/listProduct'>
//                         <p className=' hover:text-orange-500 hover:cursor-pointer'>Khuyến mãi </p>
//                         </Link>
//                         </div>
//                         <div className="p-2 hover:bg-gray-100 relative group/edit z-100">
//                         <Link to='/listProduct'>
//                         <p  className=' hover:text-orange-500 hover:cursor-pointer'>  Thực phẩm tươi sống </p>
//                         </Link>
                         
//                             <div className="hidden absolute -top-10 left-full bg-white shadow-lg rounded w-48 group-hover/edit:block z-50 ">
//                             <Link to='/listProduct'>
//                             <div className="p-2 hover:bg-gray-100 z-50  hover:text-orange-500 hover:cursor-pointer">Rau </div>
//                             </Link> 
//                             <Link to='/listProduct'>
//                             <div className="p-2 hover:bg-gray-100 z-50  hover:text-orange-500 hover:cursor-pointer">Củ quả</div>
//                             </Link> 
//                             <Link to='/listProduct'>
//                             <div className="p-2 hover:bg-gray-100 z-50  hover:text-orange-500 hover:cursor-pointer">Trái cây</div>
//                             </Link>
//                             </div>
//                         </div>
//                         <div className="p-2 hover:bg-gray-100 relative group/edit2 z-100">
//                         <Link to='/listProduct'>
//                         <p  className=' hover:text-orange-500 hover:cursor-pointer'>  Thực phẩm chế biên sẵn </p>
//                         </Link>
                       
//                             <div className="hidden absolute -top-20 left-full bg-white shadow-lg rounde w-48 group-hover/edit2:block z-50">
//                             <Link to='/listProduct'>
//                             <div className="p-2 hover:bg-gray-100 z-50 hover:text-orange-500 hover:cursor-pointer " >Lẩu</div>
//                             </Link> 
//                             <Link to='/listProduct'>
//                             <div className="p-2 hover:bg-gray-100 z-50 hover:text-orange-500 hover:cursor-pointer">Cơm</div>
//                             </Link>
//                             <Link to='/listProduct'>
//                             <div className="p-2 hover:bg-gray-100 z-50 hover:text-orange-500 hover:cursor-pointer">Bún</div>
//                             </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <img src="logo1.png" alt="Grab" className=' w-7 h-9 mt-2 ml-3 mr-2' />
//                 <div className='relative'>
//                     <div
//                         className='flex flex-row bg-white rounded-2xl h-8 w-24 mt-2 cursor-pointer'
//                         onClick={handleDropdownToggle}
//                     >
//                         <div className='flex flex-row text-center'>
//                             <p className='text-xs mt-2 ml-1'>{selectedItem}</p>
//                             <p className='text-xs mt-2 ml-1'>
//                                 <FontAwesomeIcon icon={faChevronDown} className=' ml-1' />
//                             </p>
//                         </div>
//                     </div>
//                     {isDropdownOpen && (
//                         <div className='absolute bg-white shadow-lg rounded mt-2 w-24 z-50'>
//                             {items.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     className='cursor-pointer text-xs border-b-2 px-2 py-1 rounded-2xl hover:bg-gray-200'
//                                     onClick={() => handleItemClick(item)}
//                                 >
//                                     {item}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//                 <div className='relative -mt-3 flex flex-row items-center'>
//                     <input
//                         className='flex-1 bg-white w-96 h-8 ml-4 mt-2 rounded-2xl pl-10'
//                         type='text'
//                         placeholder='Tìm sản phẩm mong muốn ...'
//                     />
//                     <FontAwesomeIcon
//                         icon={faSearch}
//                         className='absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500'
//                     />
//                 </div>
//                 <div className='flex flex-col  text-white ml-5 text-sm mt-2 cursor-pointer'>
//                     <Link to='/login'>
//                         <p className='ml-6 text-base'><FontAwesomeIcon icon={faUser} /> </p>
//                         <p>Đăng Nhập </p>
//                     </Link>
//                 </div>
//                 <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer'>
//                     <Link to='/cart'>
//                     <p className='ml-3 text-base'><FontAwesomeIcon icon={faCartShopping} /> </p>
//                     <p>Giỏ Hàng </p>
//                     </Link>
                   
//                 </div>
//                 <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer'>
//                     <Link to='/likelist'>
//                         <p className='ml-3 text-base'><FontAwesomeIcon icon={faHeart} /> </p>
//                         <p>Yêu Thích </p>
//                     </Link>
//                 </div>
//                 <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer '>
//                     <p className='ml-3 text-base'><FontAwesomeIcon icon={faEarthAmericas} /> </p>
//                     <p>English </p>
//                 </div>
//                 {username && (
//                     <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer'>
//                         <p className='ml-3 text-base'>Xin chào, {username}</p>
//                     </div>
//                 )}
//             </div>
//         </header>
//     );
// }

// export default Header;




import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faSearch, faCartShopping, faHeart, faUser, faEarthAmericas, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { user, updateUserInfo } = useUser();
    const navigate = useNavigate();

    const handleUserDropdownToggle = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        axios.get('http://localhost:3004/auth/logout')
            .then(() => {
                updateUserInfo(null, ''); // Đặt lại thông tin người dùng
                localStorage.removeItem('authToken'); 
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    // Chỉ hiển thị menu người dùng khi đã đăng nhập
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token && !user.username) {
            // Kiểm tra nếu đã có token nhưng chưa có thông tin user trong context thì gọi hàm verify
            axios.get('http://localhost:3004/auth/verify', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                if (response.data.login) {
                    updateUserInfo(response.data.userId, response.data.username); // Cập nhật thông tin người dùng
                }
            })
            .catch(error => console.error('Lỗi xác minh đăng nhập:', error));
        }
    }, [user, updateUserInfo]);

    return (
        <header>
            <div className="bg-amber-400 h-14 w-full flex items-center justify-between px-32">
                <Link to='/'>
                    <img src="emart.png" alt="Grab" className='w-36 h-8 mt-2' />
                </Link>
                <p className="text-white font-bold text-3xl">Trang Admin Emart</p>
                <div className='flex flex-col text-white ml-5 text-sm mt-2 cursor-pointer '>
                    <p className='ml-3 text-base'><FontAwesomeIcon icon={faEarthAmericas} /> </p>
                    <p>English </p>
                </div>
            </div>
        </header>
    );
    
}

export default Header;
