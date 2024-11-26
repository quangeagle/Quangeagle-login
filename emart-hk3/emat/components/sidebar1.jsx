import { useState } from 'react';
import { Link } from "react-router-dom";
import {
    CubeIcon,
    ChartBarIcon,
    ClipboardCheckIcon,
} from "@heroicons/react/solid";
import React from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

   
    const handleLogout = () => {
        axios.get('http://localhost:3004/auth/logout')
            .then(() => {
                updateUserInfo(null, '');
                localStorage.removeItem('authToken'); 
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <nav className="w-64 bg-[#ffd040] text-white p-6">
            <h2 className="text-lg font-semibold mb-4  text-black">Menu Admin</h2>
            <ul>
                <li className="mb-2">
                    <Link to="/" className="flex items-center hover:text-red-700 text-black">
                        <ChartBarIcon className="w-5 h-5 mr-2" />
                        Dashboard
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/create-product" className="flex items-center hover:text-red-700 text-black">
                        <CubeIcon className="w-5 h-5 mr-2" />
                    Duyệt 
                    </Link>
                </li>    
                <li className="mb-2">
                    <Link to="/Hang" className="flex items-center hover:text-red-700 text-black">
                        <ClipboardCheckIcon className="w-5 h-5 mr-2" />
                Hàng hóa và danh mục 
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/QLNCC" className="flex items-center hover:text-red-700 text-black">
                        <ClipboardCheckIcon className="w-5 h-5 mr-2" />
                Hàng hóa và danh mục 
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/QLNCC" className="flex items-center hover:text-red-700 text-black">
                        <ClipboardCheckIcon className="w-5 h-5 mr-2" />
                Quản lí hàng hóa 
                    </Link>
                </li>
                <li className="mb-2">
                    <Link to="/QLNCC" className="flex items-center hover:text-red-700 text-black">
                        <ClipboardCheckIcon className="w-5 h-5 mr-2" />
               Quản lí danh mục 
                    </Link>
                </li>
           {/* <li className="mb-2">
                    <Link to="/supplier/products" className="flex items-center hover:text-red-700 text-black ">
                        <CubeIcon className="w-5 h-5 mr-2" />
                        Xem tất cả sản phẩm
                    </Link>
                </li> */}
               
            </ul>
        </nav>
    );
};

export default Sidebar;
