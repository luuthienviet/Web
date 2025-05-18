import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import './ProductDetail.css';
// Giả định bạn có một Context để quản lý trạng thái đăng nhập
// Ví dụ: import { AuthContext } from '../contexts/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  // Giả định bạn có một state hoặc context để kiểm tra đăng nhập
  // const { isLoggedIn } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giá trị mặc định (chưa đăng nhập) - CẦN THAY THẾ BẰNG TRẠNG THÁI THỰC TẾ

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductById(id);
        console.log('API Response:', response);
        setProduct(response.data);
        console.log('Product State:', product);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin sản phẩm...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Bạn cần đăng nhập để mua hàng.');
      // Chuyển hướng đến trang đăng nhập (nếu bạn có)
      // navigate('/login');
      return;
    }

    if (selectedColor && selectedSize) {
      alert(`Đã thêm vào giỏ hàng: ${product.name}, Màu: ${selectedColor}, Kích thước: ${selectedSize}`);
      // Thêm logic thực tế để thêm vào giỏ hàng ở đây
    } else {
      alert('Vui lòng chọn màu sắc và kích thước.');
    }
  };

  const availableColors = product?.colors || ['Xám Đỏ', 'Đen trắng', 'Xanh', 'Trắng', 'Đen'];

  const availableSizes = product?.sizes || ['36', '37', '38', '39', '40', '41', '42', '43'];

  return (
    <div className="product-detail-container">
      {/* Phần hiển thị ảnh và thông tin sản phẩm (không thay đổi) */}
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">{product.oldPrice && <span className="old-price">{product.oldPrice}₫</span>} {product.price}₫</p>
        <div className="color-selection">
          <div className="label">Màu sắc</div>
          <div className="color-options">
            {availableColors.map((color) => (
              <div
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                onClick={() => handleColorSelect(color)}
              >
                {color}
              </div>
            ))}
          </div>
        </div>
        <div className="size-selection">
          <div className="label">Kích cỡ</div>
          <div className="size-options">
            {availableSizes.map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button className="buy-button" onClick={handleAddToCart}>MUA NGAY</button>
        <div className="additional-info">
          <div className="care-instructions">Hướng dẫn bảo quản</div>
          <div className="hotline">TỔNG ĐÀI BÁN HÀNG: 097 567 1080</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;