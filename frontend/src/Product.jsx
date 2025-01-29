import React, { useState, useEffect } from 'react';
import './Product.css';
import Cart from './Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toast,ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(8000);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);

    const serverPort = import.meta.env.VITE_SERVER_PORT;

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData")) || null;
        if (!data) {
            toast.error("Unauthorized access!");
            setTimeout(() => {
                navigate("/");
            });
        } else {
            setUserData(data);
        }

        const fetchData = async () => {
            try {
                const res = await axios.get(serverPort + "api/product/display-product-data");
                setProducts(res.data.data);
            } catch (err) {
                toast.error("Unable to load products!");
            }
        };
        fetchData();
    }, [navigate, serverPort]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        toast.success(product.name+" added to cart.");
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleBuy = () => {
        console.log('Proceeding to payment...');
        setTimeout(() => { window.location.reload(); }, 1200);
    };

    const filteredProducts = products.filter((product) => {
        return (
            (category === 'all' || product.category === category) &&
            product.price <= priceRange &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const getPriceClass = (currentPrice, previousPrice) => {
        if (previousPrice === 0) {
            return '';
        }
        return currentPrice > previousPrice ? 'price-increase' : 'price-decrease';
    };

    return (
        <>
        <div className="app">
            <header className="header">
                <div className="cart" onClick={toggleCart}>
                    <span>Cart: {cart.length} items</span>
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </header>

            <div className="filter-section">
                <h3>Filters</h3>
                <div className="filter-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="price-range">Price Range:</label>
                    <input
                        type="range"
                        id="price-range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                    />
                    <span>{`₹0 - ₹${priceRange}`}</span>
                </div>
            </div>

            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="product-card">
                        <img className="product-grid-img" src={product.src} alt={product.name} />
                        <div className="product-info">
                            <h4>{product.name}</h4>
                            <div className="product-price">
                                <p
                                    className={getPriceClass(product.price, product.previousPrice)}
                                >
                                    ₹{product.price}
                                </p>
                                {product.previousPrice !== 0 && (
                                    <span className="previous-price">₹{product.previousPrice}</span>
                                )}
                            </div>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            {isCartOpen && (
                <Cart cart={cart} toggleCart={toggleCart} handleBuy={handleBuy} />
            )}
            <ToastContainer/>
        </div>
        </>
        
    );
};

export default Product;
