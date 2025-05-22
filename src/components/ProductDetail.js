import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import './ProductDetail.css';

function ProductDetail({ isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProductById(id);
        console.log("Product data:", response.data); // 💥 Dòng log này giúp bạn kiểm tra dữ liệu
        setProduct(response.data);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert('Bạn cần đăng nhập để mua hàng.');
      navigate('/login');
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert('Vui lòng chọn màu sắc và kích thước.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const userId = parseJwt(token)?.userId;

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          color: selectedColor,
          size: selectedSize,
          quantity: 1,
          userId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message || 'Thêm giỏ hàng thất bại.');
      }
    } catch (err) {
      alert('Có lỗi khi gửi yêu cầu.');
      console.error(err);
    }
  };

  if (loading) return <div>Đang tải thông tin sản phẩm...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  const availableColors = product.colors || ['Xám Đỏ', 'Đen trắng', 'Xanh', 'Trắng', 'Đen'];
  const availableSizes = product.sizes || ['36', '37', '38', '39', '40', '41', '42', '43'];

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">
          {product.oldPrice && <span className="old-price">{product.oldPrice}₫</span>} {product.price}₫
        </p>

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
