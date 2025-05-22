import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
// import LoginModal from './components/LoginModal'; // Tạm thời bỏ qua nếu LoginPage là chính
import ProductDetail from './components/ProductDetail';
import LoginPage from './components/LoginPage';
import RegisterPage from './pages/Register';
import GioiThieu from './puplic/GioiThieu';
import LienHe from './pages/LienHe';
import UserProfilePage from './components/UserProfilePage'; // Import UserProfilePage
import { AuthProvider } from './AuthContext'; // Đã loại bỏ useAuth vì không sử dụng

import { getAllProducts } from './services/productService';

function App() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Không cần thiết nếu dùng LoginPage
    const [searchResults, setSearchResults] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken')); // Trạng thái này sẽ được quản lý bởi AuthContext

    // Sử dụng useAuth để truy cập trạng thái xác thực từ AuthContext
    // const { isAuthenticated } = useAuth(); // Bạn có thể sử dụng cái này nếu cần kiểm tra trạng thái ở đây

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
            // Thay thế alert bằng một thông báo UI tốt hơn
            console.log('Không tìm thấy sản phẩm phù hợp!');
            // Ví dụ: setErrorMessage('Không tìm thấy sản phẩm phù hợp!'); và hiển thị nó trên UI
            alert('Không tìm thấy sản phẩm phù hợp!'); // Tạm thời giữ alert cho đến khi có UI
        }
    };

    // const openLoginModal = () => setIsLoginModalOpen(true); // Không cần thiết
    // const closeLoginModal = () => setIsLoginModalOpen(false); // Không cần thiết

    // const handleLoginSuccess = () => { // Logic này nên nằm hoàn toàn trong AuthContext
    //     localStorage.setItem('authToken', 'fake_token');
    //     setIsLoggedIn(true);
    //     closeLoginModal();
    // };

    return (
        // AuthProvider phải bao bọc toàn bộ ứng dụng để các component con có thể truy cập context
        <AuthProvider>
            {/* Fragment để bọc các phần tử */}
            <>
                {/* Header không cần onOpenLogin nếu chúng ta dùng LoginPage */}
                <Header onSearch={handleSearch} />
                <Banner />

                <Routes>
                    {/* Route cho trang chủ */}
                    <Route path="/" element={<ProductList searchKeyword={searchResults} gender="all" />} />
                    {/* Routes cho chi tiết sản phẩm */}
                    <Route path="/san-pham/:id" element={<ProductDetail />} />
                    <Route path="/products/:id" element={<ProductDetail />} />

                    {/* Các Route trang tĩnh */}
                    <Route path="/gioi-thieu" element={<GioiThieu />} />
                    <Route path="/lien-he" element={<LienHe />} />

                    {/* Routes liên quan đến xác thực */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* ✅ THÊM ROUTE CHO HỒ SƠ NGƯỜI DÙNG TẠI ĐÂY */}
                    <Route path="/profile" element={<UserProfilePage />} />
                </Routes>

                <Footer />
                {/* Nếu bạn vẫn muốn dùng LoginModal, hãy giữ lại phần này.
                    Nếu không, có thể xóa nó và đảm bảo Header điều hướng đến /login.
                {isLoginModalOpen && (
                    <LoginModal
                        onClose={closeLoginModal}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}
                */}
            </>
        </AuthProvider>
    );
}

export default App;
