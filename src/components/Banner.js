import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="banner-content">
        <div className="banner-text">
          <h1>BỘ SƯU TẨM MỚI NHẤT 2025</h1>
          <h2>TẶNG NGAY VOUCHER 500K</h2>
          <p>Áp dụng đến 5/2025 tại website chính hãng</p>
          <p>Khám phá các mẫu giày mới nhất với chất lượng tốt nhất và giá cả phải chăng.</p>
        </div>
        {/* Thêm các nút hoặc nội dung khác ở đây */}
      </div>
    </div>
  );
};

export default Banner;