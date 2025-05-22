// src/components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Your existing CSS
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate(); // Can be removed if navigation is handled by AuthContext
    const { login } = useAuth();

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
                const text = await response.text(); // Get response as text first
                if (!text) {
                    throw new Error('Server returned an empty response.');
                }
                data = JSON.parse(text); // Then try to parse as JSON
            } catch (parseErr) {
                console.error('JSON Parsing Error:', parseErr, "Response Text:", text);
                throw new Error('Server không trả về JSON hợp lệ hoặc phản hồi trống.');
            }

            if (response.ok) {
                console.log('Đăng nhập thành công:', data);
                // Assuming your backend returns user info and a token
                // For example: data = { user: { id: 1, name: "User" }, token: "yourtoken" }
                const userDataForContext = data.user || { username }; // Adjust based on your API response
                login(userDataForContext, data.token);
                // navigate('/'); // Navigation is now handled by the login function in AuthContext
            } else {
                setLoginError(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng nhập:', error.message);
            setLoginError(`Đã có lỗi xảy ra: ${error.message}`);
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
