import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log('Đã thêm vào giỏ hàng:', product);
    // Your logic to add to cart goes here
    navigate(`/san-pham/${product.id}`);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">Giá: {product.price} đ</p>
      <button onClick={handleAddToCart}>Mua</button>
    </div>
  );
}

export default ProductCard;