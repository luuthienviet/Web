import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import LoginModal from './components/LoginModal';
import GioiThieu from './puplic/GioiThieu';
import SearchBar from './puplic/SearchBar';
import { getAllProducts } from './services/productService'; // Đừng quên import

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState('');

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
    closeLoginModal();
    // Các xử lý sau đăng nhập nếu cần
  };

  return (
    <>
      <Header onOpenLogin={openLoginModal} onSearch={handleSearch} />
      <Banner />

      <Routes>
        <Route path="/" element={<ProductList searchKeyword={searchResults} gender="all" />} />
        <Route path="/san-pham/:id" element={<ProductDetail />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/login" element={<LoginPage />} />
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
