// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
// import Zalo from "./assets/zalo.png";
// import Fb from "./assets/fb.png";
// import Apple from "./assets/apple.png";
// import TheThanhVien from "./assets/thethanhvien.png";
// import Footer  from './footer';

// import './index.css'
// import { Link } from 'react-router-dom';
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useUser } from './UserContext';


//   const Login = ({ setRoleVar }) => {
//     const { updateUserId } = useUser(); 
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const navigate = useNavigate()
//     axios.defaults.withCredentials = true;
//     const handleSubmit = () => {
//       axios.post('http://localhost:3004/auth/login', { username, password })
//         .then(res => {
//           if (res.data.login) {
//             setRoleVar(res.data.role)
//             updateUserId(res.data.userId);
//             console.log("User ID in Login:", res.data.userId);
//             switch (res.data.role) {
//               case 'adminPage1':
//                 navigate('/ship2');
//                 break;
//               case 'adminPage2':
//                 navigate('/Qlnhacc');
//                 break;
//               case 'adminPage3':
//                 navigate('/kho');
//                 break;
//               default:
//                 navigate('/home');
//                 break;
//             }
//           } else {
//             console.log("Đăng nhập không thành công");
//           }
//           console.log(res)
//         })
//         .catch(err => console.log(err))
//     }
  

//   return (
//     <>
     
//       <body  className="body_login">
//         <div className="container  w-full">
//           <div className="login">
//             <div className="dang_nhap">
//               <h3 className="h3_dangnhap">ĐĂNG NHẬP</h3>

//               <input
//                 type="text"
//                 placeholder="Tên đăng nhập / Số điện thoại"
//                 onChange={(e) => setUsername(e.target.value)}
//               ></input>
//               <br></br>

//               <input type="password" placeholder="Mật khẩu"   onChange={(e) => setPassword(e.target.value)}></input>
//               <br></br>
//               <div className="quenmatkhau">
//                 <FontAwesomeIcon className="icon_lockquen" icon={faLock} />
//                 <a href="#" className="quen_mat_khau">
//                   QUÊN MẬT KHẨU
//                 </a>
//               </div>

//               <br></br>
//               <button className="dangnhap" onClick={handleSubmit}>ĐĂNG NHẬP</button>
//               <p className="p_dangnhap">
//                 Liên hệ tổng đài Hỗ trợ khách hàng khi quên Tài khoản/Mật khẩu
//               </p>
//               <p className="p_dangnhap">Hotline: (028) 3622 4567</p>
//               <div className="icon_dangnhap">
//                 <img className="zalo_dangnhap" src={Zalo} alt="zalo "></img>
//                 <img className="fb_dangnhap" src={Fb} alt="fb "></img>
//                 <img className="apple_dangnhap" src={Apple} alt="apple "></img>
//               </div>
//             </div>
//             <div className="line bg-black mt-4 mb-4">
//               <hr></hr>
//             </div>
//             <div className="dang_ky">
//               <h3 className="h3_dangky">ĐĂNG KÝ</h3>
//               <div className="option_dangky">
//                 <div className="the_thanh_vien">
//                   <p className="thethanhvien">ĐÃ CÓ THẺ THÀNH VIÊN EMART</p>
//                   <img
//                     className="icon_thethanhvien"
//                     src={TheThanhVien}
//                     alt="thẻ thành viên"
//                   ></img>
//                   <p className="mota_thethanhvien">
//                     Nếu Quý khách đã có thẻ thành viên<br></br>(thẻ cứng, mã
//                     vạch 8479) được cấp<br></br>tại Siêu thị Emart, vui lòng
//                     đăng ký
//                     <br></br>thành viên bằng mã thẻ này.
//                   </p>
//                 </div>
//                 <Link to="/signup">
//                 <div className="chua_thethanhvien">
//                   <p className="chuathethanhvien">
//                     CHƯA CÓ THẺ THÀNH VIÊN EMART
//                   </p>
//                   <div className="icon_dangky">
//                     <FontAwesomeIcon className="phone" icon={faPhone} />
//                     <img className="zalo_dangky" src={Zalo} alt="zalo"></img>
//                     <img className="fb_dangky" src={Fb} alt="fb"></img>
//                     <img className="apple_dangky" src={Apple} alt="apple"></img>
//                   </div>
//                   <p className="mota_chuathethanhvien">
//                     Quý khách sẽ được cung cấp mã số<br></br>thẻ mới khi đăng ký
//                     với các hình thức<br></br>trên. Mã số thẻ này sẽ không đổi
//                     thành<br></br>thẻ cứng. Khi đến siêu thị Emart vẫn<br></br>
//                     có thể tích điểm và sử dụng điểm thành<br></br>viên khi mở
//                     Ứng dụng Emartmall và<br></br>đưa mã số thẻ cho Nhân viên
//                     thu ngân.
//                   </p>
//                 </div>
                
//                 </Link>
               
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>      
//       <Footer />
//     </>
//   );
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { updateUserInfo } = useUser();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Không có token xác thực');
        }

        const response = await axios.get('http://localhost:3004/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.login) { // Sửa để kiểm tra đúng trường `login`
          updateUserInfo(response.data.userId, response.data.username); // Cập nhật username
          console.log('Trạng thái xác thực:', response.data);
          navigate('/'); // Chuyển hướng đến trang chính
        }
      } catch (error) {
        console.error('Lỗi xác minh đăng nhập:', error.response ? error.response.data : error.message);
        setErrorMessage('Lỗi xác minh đăng nhập. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigate, updateUserInfo]);

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3004/auth/callback?code=${code}`, { withCredentials: true });
          
          // Log toàn bộ nội dung phản hồi để kiểm tra
          console.log('Nội dung phản hồi:', response.data);
          
          const { token, userId, username } = response.data; // Đảm bảo rằng bạn đang lấy đúng trường từ phản hồi
          console.log('ID người dùng:', userId);
          console.log('Tên người dùng:', username);
      
          if (token) {
            localStorage.setItem('authToken', token);
            handleLogin({ id: userId, name: username }); // Cập nhật với userId và username
            navigate('/');
          } else {
            console.error('Không thể lấy token. Vui lòng thử lại.');
            setErrorMessage('Không thể lấy token. Vui lòng thử lại.');
          }
        } catch (error) {
          console.error('Lỗi trong quá trình callback: ' + error.message);
          setErrorMessage('Lỗi trong quá trình callback. Vui lòng thử lại.');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Không có mã trong URL callback');
        setErrorMessage('Không có mã trong URL callback.');
      }
    };

    handleCallback();
  }, [navigate]);

  const handleLogin = (userData) => {
    console.log('Thực hiện đăng nhập:', userData); // Log thông tin đăng nhập
    updateUserInfo(userData.id, userData.name); // Cập nhật cả userId và username
  };

  const handleLoginRedirect = () => {
    const redirectUri = encodeURIComponent('http://localhost:5173/login'); 
    window.location.href = `https://sso-pointer.vercel.app/authorize?callbackUrl=${redirectUri}`;
  };

  return (
    <div>
      <h3>ĐĂNG NHẬP QUA SSO</h3>
      <button onClick={handleLoginRedirect}>Đăng nhập qua SSO Pointer</button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
    </div>
  );
};

export default Login;
