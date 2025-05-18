// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>VỀ BITI'S</h4>
          <ul>
            <li>Câu chuyện Biti's</li>
            <li>Hoạt Động</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>THÔNG TIN</h4>
          <ul>
            <li>Trạng thái đơn hàng</li>
            <li>Hình thức giao hàng</li>
            <li>Hình thức thanh toán</li>
            <li>Hướng dẫn cách chọn Size</li>
            <li>Chính sách đổi Size</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách khách hàng thân thiết</li>
            <li>Chính sách bảo vệ thông tin khách hàng</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>TRỢ GIÚP</h4>
          <ul>
            <li>Tuyển Dụng</li>
            <li>Hệ thống cửa hàng</li>
            <li>Liên hệ hợp tác</li>
            <li>Q&A</li>
          </ul>
          <button className="btn-b2b">BÁN HÀNG B2B</button>
        </div>

        <div className="footer-column company-info">
          <img src="/images/logo-footer.png" alt="Biti's Logo" />
          <p><strong>CÔNG TY TNHH SẢN XUẤT HÀNG TIÊU DÙNG BÌNH TIÊN</strong></p>
          <p>Địa chỉ: 22 Lý Chiêu Hoàng, Phường 10, Quận 6, TP. Hồ Chí Minh</p>
          <p>Điện thoại: <a href="tel:02838753443">(028) 38 753 443</a></p>
          <p>Email: <a href="mailto:chamsockhachhang@bitis.com.vn">chamsockhachhang@bitis.com.vn</a></p>
          <p>Hotline: <a href="tel:0966158666">0966 158 666</a></p>
          <p>Thời gian tư vấn: 8h – 21h30 (trừ ngày Lễ, Tết)</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Copyright © 2025 Biti's. Powered by Haravan Enterprise
        </p>
        <p>
          Giấy CNĐKDN: 0301340497 được cấp ngày 20/01/1992, được sửa đổi lần thứ 25 ngày 27/01/2022 bởi Sở Kế hoạch và Đầu tư TPHCM
        </p>
      </div>
    </footer>
  );
}

export default Footer;
