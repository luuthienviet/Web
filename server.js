// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Cấu hình kết nối SQL Server
const sqlConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true
  },
};

// Kết nối kiểm tra DB một lần
async function connectDB() {
  try {
    await sql.connect(sqlConfig);
    console.log('✅ Đã kết nối MSSQL thành công');
  } catch (err) {
    console.error('❌ Lỗi khi kết nối DB:', err);
  }
}
connectDB();


// ===========================
// 📌 ROUTE: LOGIN
// ===========================
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT id, username, password FROM Users WHERE username = @username');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
    });
  } catch (err) {
    console.error('❌ Lỗi xử lý login:', err.message);
    res.status(500).json({ message: 'Lỗi máy chủ, vui lòng thử lại sau' });
  }
});


// ===========================
// 📌 ROUTE: GET PRODUCT BY ID
// ===========================
const products = [
  { id: '1', name: 'Giày Chạy Bộ Bitis Hunter Running 2.0 Nam Màu Cam', imageUrl: '/images/giay1.png', price: 881300, description: 'A very comfortable shoe.' },
  { id: '2', name: 'Giày Thể Thao Bitis Hunter X LiteDash Nam Màu Cam', imageUrl: '/images/giay2.png', price: 799000, description: 'A stylish shoe for everyday wear.' },
  { id: '3', name: 'Giày Thể Thao Bitis Hunter Jogging Nam Màu Cam', imageUrl: '/images/giay3.png', price: 756000, description: 'Perfect for running and sports.' },
  { id: '4', name: 'Giày Chạy Bộ Bitis Hunter Running 2.0 Nam Màu Đen', imageUrl: '/images/giay4.png', price: 881300, description: 'Great for summer days.' },
  { id: '5', name: 'Giày Thể Thao Bitis Hunter X LiteDash Nam Màu Trắng', imageUrl: '/images/giay5.png', price: 1099000, description: 'Elegant shoes for formal occasions.' },
  { id: '6', name: 'Giày Thể Thao Nam Bitis Hunter Core HSM007800TRG', imageUrl: '/images/giay6.png', price: 797400, description: 'Keep your feet warm in winter.' },
  { id: '7', name: 'Giày Thể Thao Bitis Hunter Street Nam Màu Nâu', imageUrl: '/images/giay7.png', price: 580300, description: 'Lightweight and breathable.' },
  { id: '8', name: 'Giày Sneaker Unisex Under Armour Slipspeed Mega Fade', imageUrl: '/images/giay8.png', price: 4799000, description: 'Designed for performance on the court.' },
  { id: '9', name: 'Giày thể thao Chạy Bộ Nam On Cloudvista - Xám', imageUrl: '/images/giay9.png', price: 2945000, description: 'Durable and waterproof.' },
  { id: '10', name: 'Giày Bóng Rổ Nam Nike Giannis Immortality 4 Ep - Đỏ', imageUrl: '/images/giay10.png', price: 2579000, description: 'Casual and easy to wear.' },
];

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// ===========================
// 🚀 KHỞI ĐỘNG SERVER
// ===========================
app.listen(PORT, () => {
  console.log(`🚀 Backend đang chạy tại: http://localhost:${PORT}`);
});
