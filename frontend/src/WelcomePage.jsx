import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './WelcomePage.css';
import { FaShippingFast, FaHeadphonesAlt, FaAward } from "react-icons/fa";
import axios from 'axios';

const images = [
  {
    src: 'https://wallpaperaccess.com/full/829212.jpg',
    title: 'SMART TV',
    topic: 'SONY BRAVIA',
    description:
      'Sony Bravia TVs deliver stunning picture quality with advanced display technologies like OLED and XR Triluminos Pro. Enjoy immersive entertainment with crystal-clear visuals, vibrant colors, and smart features.',
  },
  {
    src: 'https://cdnb.artstation.com/p/assets/images/images/022/575/753/large/pramod-bhardwaj-render-34.jpg?1575948067',
    title: 'HEADPHONES',
    topic: 'BOAT ROCKERZ 425',
    description:
      'The Boat Rockerz 425 headphones offer powerful sound with deep bass, Bluetooth 5.0 connectivity, and up to 25 hours of playback. Designed for comfort, they feature cushioned ear pads and a lightweight build for seamless audio experiences.',
  },
  {
    src: 'https://wallpapercave.com/wp/wp8535379.jpg',
    title: 'SMART WATCH',
    topic: 'NOISE CALIBER',
    description:
      'The Noise Caliber Smartwatch combines style and functionality with a vibrant display, fitness tracking, heart rate monitoring, and multiple sports modes.',
  },
  {
    src: 'https://www.hdwallpapers.in/download/nike_black_shoe_closeup_view_hd_nike-HD.jpg',
    title: 'SHOE',
    topic: 'NIKE PEGASUS',
    description:
      'The Nike Pegasus is a versatile running shoe known for its responsive cushioning, breathable mesh upper, and durable design. It provides comfort and support, making it ideal for both daily runs and casual wear.',
  },
];

function WelcomePage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [randomProducts, setRandomProducts] = useState([]);
  const serverPort = import.meta.env.VITE_SERVER_PORT;

  const handleProductClick = () => {
    navigate("/main/product");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const res = await axios.get(`${serverPort}api/product/display-product-data`);
        const randomProducts = res.data.data.sort(() => 0.5 - Math.random()).slice(0, 4); // Get random 4 products
        setRandomProducts(randomProducts);
      } catch (err) {
        console.error("Unable to fetch random products:", err);
      }
    };
    fetchRandomProducts();
  }, [serverPort]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <>
      <div className={`slider-container ${isTransitioning ? 'next' : ''}`}>
        <div className="list">
          {images.map((image, index) => (
            <div
              key={index}
              className={`item ${index === currentIndex ? 'active' : ''}`}
              onTransitionEnd={handleTransitionEnd}
            >
              <img src={image.src} alt={image.title} />
              <div className="content">
                <div className="title">{image.title}</div>
                <div className="topic">{image.topic}</div>
                <div className="des">{image.description}</div>
                <div className="buttons">
                  <button onClick={handleProductClick}>SEE MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Random Products Section */}
      <section className="random-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {randomProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img className="product-grid-img" src={product.src} alt={product.name} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <button onClick={() => navigate(`/main/product`)}>See Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="about-box-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="feature-boxes">
          <div className="box">
            <FaShippingFast className="icon" />
            <h3>Fast Delivery</h3>
            <p>Get your products delivered quickly and securely right to your doorstep.</p>
          </div>
          <div className="box">
            <FaHeadphonesAlt className="icon" />
            <h3>Premium Support</h3>
            <p>Our team is always available to assist you with any inquiries or concerns.</p>
          </div>
          <div className="box">
            <FaAward className="icon" />
            <h3>Quality Assurance</h3>
            <p>We provide top-notch products backed by excellent craftsmanship and durability.</p>
          </div>
        </div>
      </section>
    </>
  );
} 

export default WelcomePage;
