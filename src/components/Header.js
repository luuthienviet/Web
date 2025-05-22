import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../puplic/SearchBar';

function Header({ onSearch }) {
  return (
    <header className="relative w-full px-6 py-4 bg-white shadow-md flex items-center justify-between h-20">
      {/* Logo */}
      <div className="text-4xl font-bold text-gray-800 whitespace-nowrap z-10">
        <span className="text-blue-800">L</span>
        <span className="text-orange-500">T</span>
        <span className="text-green-600">V</span>
      </div>

      {/* Thanh tìm kiếm căn giữa */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-0">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Menu phải */}
      <div className="flex items-center gap-4 whitespace-nowrap z-10">
        <Link to="/" className="text-black hover:text-rose-600">Trang chủ</Link>
        <Link to="/gioi-thieu" className="text-black hover:text-rose-600">Giới thiệu</Link>
        <Link to="/register" className="text-black hover:text-rose-600">Đăng Ký</Link>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Login</Link>
      </div>
    </header>
  );
}

export default Header;
