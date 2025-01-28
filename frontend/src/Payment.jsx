import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';
import axios from 'axios';

const Payment = ({ setShowPayment, setShowCODPopup, handleBuy, toggleCart, totalAmount, cartItems, address }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [userData, setUserData] = useState({});
    const serverPort = import.meta.env.VITE_SERVER_PORT;

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) setUserData(storedUserData);
    }, []);

    const insertOrderData = async (data) => {
        try {
            console.log(data);
            // const response = await axios.post(`${serverPort}/api/order/insert-order-data`, data);
            // console.log('Order inserted:', response.data);
        } catch (error) {
            console.error('Error inserting order:', error);
            toast.error('Failed to store order data.');
        }
    };

    const handleRazorpayPayment = async () => {
        setIsProcessing(true);

        try {
            // Create order on the backend
            const orderResponse = await axios.post(`${serverPort}/api/payment/create-razorpay-order`, {
                amount: totalAmount * 100, // Razorpay expects amount in paise
            });

            const { id: order_id, currency } = orderResponse.data;

            // Initialize Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay key
                amount: totalAmount * 100,
                currency: currency,
                name: 'Online Platform for Dessert Products',
                description: 'Thank you for shopping with us!',
                order_id: order_id,
                handler: async function (response) {
                    // Successful payment
                    toast.success('Payment successful!');
                    insertOrderData({
                        username: userData.name,
                        amount: totalAmount,
                        type: 'Razorpay',
                        address: address,
                        products: cartItems.map((item) => item.name).join(', '),
                        payment_id: response.razorpay_payment_id,
                    });

                    handleBuy();
                    toggleCart();
                    setShowPayment(false);
                },
                prefill: {
                    name: userData.name,
                    email: userData.email,
                    contact: userData.phone || '',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error initializing Razorpay:', error);
            toast.error('Failed to process payment.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCashOnDelivery = () => {
        setShowCODPopup(true);
        setTimeout(() => {
            toast.success('Order placed successfully. Pay on delivery!');
            insertOrderData({
                username: userData.name,
                amount: totalAmount,
                type: 'Cash on Delivery',
                address: address,
                products: cartItems.map((item) => item.name).join(', '),
            });

            handleBuy();
            toggleCart();
            setShowPayment(false);
            setShowCODPopup(false);
        }, 2000);
    };

    const handlePayment = () => {
        if (!paymentMethod) {
            toast.error('Please select a payment method!');
            return;
        }

        if (paymentMethod === 'Razorpay') {
            handleRazorpayPayment();
        } else if (paymentMethod === 'Cash on Delivery') {
            handleCashOnDelivery();
        }
    };

    return (
        <div className="payment-options">
            <h4>Select Payment Method</h4>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="Razorpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Razorpay
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
            </label>

            <button
                onClick={handlePayment}
                className="pay-btn"
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>

            <ToastContainer />
        </div>
    );
};

export default Payment;
