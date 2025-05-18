// src/components/LoginModal.js
import React, { useState } from 'react';
import './LoginModal.css'; // Import CSS cho modal

function LoginModal({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Gọi API đăng nhập của bạn ở đây
    fetch('/api/login', { // Thay '/api/login' bằng endpoint thực tế
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Đã hoàn thiện dòng này
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Xử lý đăng nhập thành công
          onLoginSuccess(data.user); // Gọi hàm callback để thông báo đăng nhập thành công
        } else {
          // Xử lý lỗi đăng nhập (ví dụ: hiển thị thông báo lỗi)
          setError(data.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập:', error);
        setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      });
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Đăng Nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Đăng Nhập</button>
        {/* Có thể thêm nút đăng ký hoặc quên mật khẩu */}
      </div>
    </div>
  );
}

export default LoginModal;