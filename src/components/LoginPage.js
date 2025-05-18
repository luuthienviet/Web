import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoginError('');

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            let data = {};
            try {
                data = await response.json();
            } catch (parseErr) {
                throw new Error('Server không trả về JSON hợp lệ');
            }

            if (response.ok) {
                console.log('Đăng nhập thành công:', data);
                // Nếu backend có trả token thì lưu token ở đây
                localStorage.setItem('authToken', data.token || '');
                navigate('/');
            } else {
                setLoginError(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng nhập:', error.message);
            setLoginError('Đã có lỗi xảy ra khi kết nối đến server.');
        }
    };

    return (
        <div className="login-page">
            <h2>Đăng Nhập</h2>
            {loginError && <p className="error-message">{loginError}</p>}
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
        </div>
    );
}

export default LoginPage;
