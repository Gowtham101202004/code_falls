import React, { useState } from 'react';
import './Cart.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './Payment'; // Import Payment component
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QlQd8IYoEGZruyyOknzw5y4mKzO7eDbgFAGxyLWrdMjJzcHwFbJkpbb3Q29Z9sT1wXesevjCIArcuIqOrpcEBDj001Ly5TrIC');

const Cart = ({ cart, toggleCart, handleBuy }) => {
    const [address, setAddress] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [showCODPopup, setShowCODPopup] = useState(false);

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    const handleProceedToPayment = () => {
        if (!address.trim()) {
            toast.error('Please enter your address!');
            return;
        }
        setShowPayment(true);
    };

    return (
        <div className="cart-modal">
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty! Add some items to proceed.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                    <div className="total">
                        <span>Total: ₹{totalAmount}</span>
                    </div>
                    {!showPayment ? (
                        <div className="address-form">
                            <textarea
                                placeholder="Enter your address..."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button onClick={handleProceedToPayment} className="proceed-btn">
                                Proceed to Payment
                            </button>
                        </div>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <Payment
                                setShowPayment={setShowPayment}
                                setShowCODPopup={setShowCODPopup}
                                handleBuy={handleBuy}
                                toggleCart={toggleCart}
                                totalAmount={totalAmount}
                                cartItems={cart}
                                address={address}
                            />
                        </Elements>
                    )}
                </>
            )}
            <button onClick={toggleCart} className="close-btn">Close</button>

            {/* COD Popup Modal */}
            {showCODPopup && (
                <div className="cod-popup">
                    <div className="cod-popup-content">
                        <h3>Your order will be delivered soon!</h3>
                        <p>Cash on delivery is selected. Please have the payment ready at the time of delivery.</p>
                        <button className="close-popup-btn" onClick={() => setShowCODPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Toast Notification Container */}
            <ToastContainer />
        </div>
    );
};

export default Cart;
