import React, { useState, useEffect } from 'react';
import './App.css';
import Cart from './Cart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HomePage = () => {
    const navigate = useNavigate(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(8000); // Max price in INR
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [products, setProducts] = useState([]);

    const serverPort=import.meta.env.VITE_SERVER_PORT;
    
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

        const fetchData=async()=>{
            try{
                const res=await axios.get(serverPort+"api/product/display-product-data");
                setProducts(res.data.data);
            }catch(err){
                toast.error("Unable to load products!");
            }
        }
        fetchData();
    }, []);


    // const products = [
    //     { id: 1, src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1687660671363", name: "Wireless Headphones", price: 3999, category: "electronics" },
    //     { id: 2, src: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MM2A3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1629924876000", name: "Smartphone Case", price: 499, category: "accessories" },
    //     { id: 3, src: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/alienware/peripherals/alienware-trimode-720m-wireless-mouse/assets/mouse-aw720m-bk-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=476&wid=676&qlt=100,1&resMode=sharp2&size=676,476&chrss=full", name: "Gaming Mouse", price: 2499, category: "electronics" },
    //     { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQekaSAAgz0JrVMLyLcpinyQUJ8CCCvpWOLCg&s", name: "Bluetooth Speaker", price: 1999, category: "electronics" },
    //     { id: 5, src: "https://www.jiomart.com/images/product/original/rvrgwpjvsp/bruton-trendy-sports-shoes-for-men-blue-product-images-rvrgwpjvsp-0-202209021256.jpg?im=Resize=(600,750)", name: "Running Shoes", price: 3299, category: "fashion" },
    //     { id: 6, src: "https://assets.ajio.com/medias/sys_master/root/20231220/1cl0/6581f56dafa4cf41f5dc0d08/-473Wx593H-466898451-rosegold-MODEL.jpg", name: "Men's Wristwatch", price: 4999, category: "fashion" },
    //     { id: 7, src: "https://www.cospropsensei.com/cdn/shop/products/Sad5c0b4ebfba4199923b46c40afc7332V.webp?v=1674645911", name: "Sunglasses", price: 1299, category: "fashion" },
    //     { id: 8, src: "https://images-cdn.ubuy.co.in/636465cbd8609568936e7f45-laptop-backpack-for-men-women-bagsmart.jpg", name: "Laptop Backpack", price: 1499, category: "accessories" },
    //     { id: 9, src: "https://www.ikea.com/gb/en/images/products/tertial-work-lamp-dark-grey__0609306_pe684440_s5.jpg", name: "Desk Lamp", price: 899, category: "home" },
    //     { id: 10, src: "https://cdn.jiostore.online/v2/jmd-asp/jdprod/wrkr/jioretailer/products/pictures/item/free/original/fAxNpM3Pnd-bpl-bekps00116-kettle-491903093-i-2-1200wx1200h.jpeg", name: "Electric Kettle", price: 2199, category: "home" }
    // ];

    const addToCart = (product) => {
        setCart([...cart, product]);
        toast.success(product.name+" added to cart!");
        setTimeout(()=>{},1000);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handleBuy = () => {
        console.log('Proceeding to payment...');
        setTimeout(()=>{window.location.reload();},1200);
    };

    const filteredProducts = products.filter((product) => {
        return (
            (category === 'all' || product.category === category) &&
            product.price <= priceRange &&
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="app">
            <header>
                <div className="logo">
                    <h1>Flipazon</h1>
                </div>
                <div className="user-name">
                    <span>Welcome, {userData.name}</span>
                </div>
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
                    <button>Search</button>
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
                        <option value="home">Home</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="price-range">Price Range:</label>
                    <input
                        type="range"
                        id="price-range"
                        min="0"
                        max="8000"
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
                        <img src={product.src} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p>{`₹${product.price}`}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {isCartOpen && (
                <Cart cart={cart} toggleCart={toggleCart} handleBuy={handleBuy} />
            )}
        </div>
    );
};

export default HomePage;
