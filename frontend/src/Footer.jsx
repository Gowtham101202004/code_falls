import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h1>Flipazon</h1>
          <div className='about-flipazon'>
            <p>
            At <b>Flipazon</b>, enjoy top-quality products across electronics, fashion, and lifestyle essentials. Shop smart with trusted brands, great prices, and fast delivery. Your satisfaction is our priority!</p>
          </div>
        </div>
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/main/product">Products</a></li>
            <li><a href="/main/home">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/help">Help</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><strong>Phone:</strong> +91 1234567890</p>
          <p><strong>Email:</strong> flipazon@gmail.com</p>
          <p><strong>Address:</strong> Perundurai, Erode , Tamilnadu</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Flipazon | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
