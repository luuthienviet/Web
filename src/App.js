import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProductDetail from './components/ProductDetail';
import LoginPage from './components/LoginPage';
import RegisterPage from './pages/Register'; // ✅ Thêm import
import GioiThieu from './puplic/GioiThieu'; // ✅ Kiểm tra đúng thư mục puplic
import LienHe from './pages/LienHe';
import { AuthProvider } from './AuthContext';


import { getAllProducts } from './services/productService';

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchResults(searchTerm);
    const matchedProduct = products.find(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchedProduct) {
      navigate(`/san-pham/${matchedProduct.id}`);
    } else {
      alert('Không tìm thấy sản phẩm phù hợp!');
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLoginSuccess = () => {
    localStorage.setItem('authToken', 'fake_token'); // Hoặc lấy token thật từ server
    setIsLoggedIn(true);
    closeLoginModal();
  };

  return (
    <AuthProvider>
    <>
      <Header onOpenLogin={openLoginModal} onSearch={handleSearch} />
      <Banner />

      <Routes>
        <Route path="/" element={<ProductList searchKeyword={searchResults} gender="all" />} />
        <Route path="/san-pham/:id" element={<ProductDetail isLoggedIn={isLoggedIn} />} />
        <Route path="/products/:id" element={<ProductDetail isLoggedIn={isLoggedIn} />} />

        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ Route đăng ký */}
        <Route path="/lien-he" element={<LienHe />} />
      </Routes>

      <Footer />
      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
    </AuthProvider>
  );
}

export default App;


