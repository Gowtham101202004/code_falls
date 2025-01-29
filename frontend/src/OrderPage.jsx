import React, { useEffect, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
import './OrderPage.css';
import {useNavigate} from 'react-router-dom';
import Empty_Cart from './assets/empty-cart.svg';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate(null);
  const serverPort = import.meta.env.VITE_SERVER_PORT;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (!data)
    {
      toast.error("Unable to load data! Please re-login.");
      navigate('/');
      
    }
      
    
    const fetchOrderData = async () => {
      try {
        const res = await axios.get(`${serverPort}api/order/get-order-data/${data.name}`);
        setOrders(res.data.data);
        console.log(res.data.data)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, []);

  return (
    <div className="order-page-container">
      <h1 className="page-title">Order Details</h1>
      
      {/* Conditionally rendering if orders are empty */}
      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet!</h2>
          <p>Your order history is currently empty. Start shopping to place your first order.</p>
          <div className="empty-icon">
            <img src={Empty_Cart} alt="empty cart" width="150" />
          </div>
          <button className="shop-now-btn" onClick={()=>navigate('/main/product')}>Start Shopping</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h2>{order.username}'s Order</h2>
              </div>
              <div className="order-details">
                <div className="order-item">
                  <strong>Placed On:</strong>
                  <span>{order.createdAt}</span>
                </div>
                <div className="order-item">
                  <strong>Address:</strong>
                  <span>{order.address}</span>
                </div>
                <div className="order-item">
                  <strong>Products:</strong>
                  <span>{order.products}</span>
                </div>
                <div className="order-item">
                  <strong>Amount:</strong>
                  <span>₹{order.amount}</span>
                </div>
                <div className="order-item">
                  <strong>Payment Type:</strong>
                  <span>{order.type}</span>
                </div>
                <div className="order-item">
                  <strong>Expected Arrival:</strong>
                  <span>{order.arrivalDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default OrderPage;
