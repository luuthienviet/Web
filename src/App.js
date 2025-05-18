// src/App.js

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Component chính
import Header from './components/Header';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import LoginModal from './components/LoginModal';

// Component phụ
import GioiThieu from './puplic/GioiThieu';
import SearchBar from './puplic/SearchBar';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState('');

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleSearch = (searchTerm) => {
    console.log('Tìm kiếm từ App:', searchTerm);
    setSearchResults(`Kết quả tìm kiếm cho: ${searchTerm}`);
    // TODO: thêm logic tìm kiếm sản phẩm thực tế ở đây
  };

  const handleLoginSuccess = (userData) => {
    console.log('Đăng nhập thành công:', userData);
    closeLoginModal();
  };

  return (
    <>
      <Header onOpenLogin={openLoginModal} />
      <Banner />
      <SearchBar onSearch={handleSearch} />
      {searchResults && <div>{searchResults}</div>}

      <Routes>
        <Route path="/" element={<ProductList gender="all" />} />
        <Route path="/san-pham/:id" element={<ProductDetail />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Thêm các route khác tại đây nếu cần */}
      </Routes>

      <Footer />

      {isLoginModalOpen && (
        <LoginModal 
          onClose={closeLoginModal} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
    </>
  );
}

export default App;
