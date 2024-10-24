import express from 'express';
import { Admin } from '../models/Admin.js';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PointerStrategy } from 'sso-pointer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const pointer = new PointerStrategy(process.env.POINTER_API_KEY);

// Hàm xác thực token chung
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ Authorization header
  if (!token) {
      console.log('Không có token');
      return res.status(403).json({ message: 'Token không hợp lệ' });
  }

  jwt.verify(token, process.env.USER_KEY, (err, decoded) => {
      if (err) {
          console.log('Token không hợp lệ hoặc đã hết hạn:', err.message);
          return res.status(403).json({ message: 'Token không hợp lệ' });
      }

      req.userId = decoded.userId;
      req.username = decoded.username;
      req.role = decoded.role || 'user';
      next();
  });
};


// Đăng nhập cho Admin và User
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra nếu là admin
        const admin = await Admin.findOne({ username });
        if (admin) {
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }
            const token = jwt.sign({ username: admin.username, role: admin.role, userId: admin._id }, process.env.ADMIN_KEY);
            res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
            return res.json({ login: true, role: admin.role, username: admin.username, userId: admin._id });
        }

        // Kiểm tra nếu là user
        const user = await User.findOne({ username });
        if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
              return res.status(401).json({ message: 'Sai mật khẩu' });
          }
          const token = jwt.sign({ username: user.username, role: 'user', userId: user._id }, process.env.USER_KEY);
          return res.json({ login: true, role: 'user', username: user.username, userId: user._id, token }); // Trả token về
      }
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
    }
});

// Xác thực Admin
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: 'Admin không hợp lệ' });
    }
    jwt.verify(token, process.env.ADMIN_KEY, (err, decoded) => {
        if (err) {
            console.log('Token không hợp lệ:', err.message);
            return res.status(403).json({ message: 'Token không hợp lệ' });
        }
        req.username = decoded.username;
        req.role = decoded.role;
        if (req.role.startsWith('admin')) {
            next();
        } else {
            return res.status(403).json({ message: 'Quyền không hợp lệ' });
        }
    });
};

// Callback sau khi nhận code từ SSO Pointer
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  console.log('Received code:', code);
  try {
      const accessTokenData = await pointer.getAccessToken(code);
      console.log('Access Token Data:', accessTokenData);

      const { id: userId, email } = accessTokenData;

      if (!userId || !email) {
          return res.status(400).json({ message: 'User ID và email là bắt buộc' });
      }

      // Kiểm tra xem người dùng đã tồn tại trong database chưa
      let user = await User.findOne({ _id: userId });

      if (!user) {
          // Tạo một username từ email nếu không có username
          const generatedUsername = email.split('@')[0]; // Lấy phần trước @ của email làm username

          const newUser = new User({
              _id: userId,
              email,
              username: generatedUsername, // Sử dụng email làm username
          });
          user = await newUser.save();
          console.log('Người dùng mới đã được tạo:', user);
      } else {
          // Cập nhật thông tin nếu cần
          user.email = email;
          await user.save();
          console.log('Người dùng đã tồn tại và đã được cập nhật:', user);
      }

      const token = jwt.sign({ username: user.username, role: 'user', userId: user._id }, process.env.USER_KEY);
      return res.json({ login: true, role: 'user', username: user.username, userId: user._id, token });
  } catch (error) {
      console.error('Error in callback:', error.message);
      return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});


// Route để xác minh người dùng
router.get('/verify', verifyToken, (req, res) => {
    return res.json({ login: true, role: req.role, username: req.username, userId: req.userId });
});

// Route để đăng xuất
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
