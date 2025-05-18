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
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};


// Kết nối kiểm tra DB một lần
async function connectDB() {
  try {
    await sql.connect(sqlConfig);
    console.log('✅ Đã kết nối MSSQL thành công');
  } catch (err) {
    console.error('❌ Lỗi khi kết nối DB:', err.message);
  }
}
connectDB();

// Route xử lý đăng nhập
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

    // Nếu đúng mật khẩu
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

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Backend đang chạy tại: http://localhost:${PORT}`);
});