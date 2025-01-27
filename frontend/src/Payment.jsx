import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css';
import axios from 'axios';

const Payment = ({ setShowPayment, setShowCODPopup, handleBuy, toggleCart, totalAmount, cartItems }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isGooglePayAvailable, setIsGooglePayAvailable] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [dataUser,setDataUser]=useState();
    const serverPort = import.meta.env.VITE_SERVER_PORT;

    useEffect(() => {
        const userData=JSON.parse(localStorage.getItem('userData'));
        if(userData)
            setDataUser(userData);

        const checkGooglePayAvailability = async () => {
            if (!stripe) return;

            const paymentRequest = stripe.paymentRequest({
                country: 'US', // Set country
                currency: 'usd', // Set currency
                total: {
                    label: 'Total',
                    amount: totalAmount * 100, // Stripe expects the amount in cents
                },
            });

            const canMakePayment = await paymentRequest.canMakePayment();
            setIsGooglePayAvailable(!!canMakePayment);
        };

        checkGooglePayAvailability();
    }, [stripe, totalAmount]);

    const InsertOrderData=async(data)=>{
        try {
            const res=await axios.post("http://localhost:8080/api/order/insert-order-data",data);
            console.log(res);
        } catch (error) {
            console.log(error);
            
        }
    }
    const handlePayment = async () => {
        if (!paymentMethod) {
            toast.error('Please select a payment method!');
            return;
        }

        setIsProcessing(true); // Disable button to avoid multiple submissions

        if (paymentMethod === 'Google Pay') {
            if (!stripe || !elements) {
                setIsProcessing(false);
                return;
            }

            try {
                // Call your backend to create a payment intent for Google Pay
                const res = await fetch(serverPort + 'api/payment/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amount: totalAmount * 100 }), // Stripe expects the amount in cents
                });

                const data = await res.json();
                const clientSecret = data.clientSecret;



                // Confirm Payment via Google Pay using Stripe
                const confirmResult = await stripe.confirmPayment(clientSecret, {
                    payment_method: {
                        google_pay: elements.getElement(PaymentRequestButtonElement),
                    },
                });

                if (confirmResult.error) {
                    toast.error('Payment failed! ' + confirmResult.error.message);
                } else {
                    toast.success('Payment successful via Google Pay!');

                    console.log(`Payment Type: ${paymentMethod}`);
                    console.log(`Total Amount: $${totalAmount}`);
                    InsertOrderData({username:dataUser.name,amount:totalAmount,type:paymentMethod});
                    console.log('Products:', cartItems.map((item) => item.name).join(', '));

                    handleBuy();
                    toggleCart();
                    setShowPayment(false);
                }
            } catch (error) {
                toast.error('Error while processing payment. Please try again.');
            }
        } else if (paymentMethod === 'Cash on Delivery') {
            setShowCODPopup(true);
            setTimeout(() => {
                toast.success('Order placed successfully. Pay on delivery!');
                console.log(`Payment Type: ${paymentMethod}`);
                console.log(`Total Amount: $${totalAmount}`);
                InsertOrderData({username:dataUser.name,amount:totalAmount,type:paymentMethod});
                console.log('Products:', cartItems.map((item) => item.name).join(', '));

                handleBuy();
                toggleCart();
                setShowPayment(false);
                setShowCODPopup(false);
            }, 2000);
        }

        setIsProcessing(false); // Re-enable button after processing
    };

    return (
        <div className="payment-options">
            <h4>Select Payment Method</h4>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="Google Pay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Google Pay
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

            {paymentMethod === 'Google Pay' && isGooglePayAvailable && (
                <div className="gpay-details">
                    <PaymentRequestButtonElement
                        options={{
                            paymentRequest: stripe.paymentRequest({
                                country: 'US',
                                currency: 'usd',
                                total: {
                                    label: 'Total',
                                    amount: totalAmount * 100,
                                },
                            }),
                        }}
                    />
                </div>
            )}

            <button
                onClick={handlePayment}
                className="pay-btn"
                disabled={isProcessing} // Disable the button while payment is processing
            >
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>

            {/* Toast Notification */}
            <ToastContainer />
        </div>
    );
};

export default Payment;
