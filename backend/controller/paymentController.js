import stripePackage from 'stripe';
import handler from 'express-async-handler';

// Initialize Stripe with your secret key
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const Make_Payment_UPI = handler(async (req, res) => {
    const { amount } = req.body; // Get amount from the frontend (in paise, e.g., 5000 for ₹50)

    try {
        // Create the payment intent for UPI
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in paise
            currency: 'usd', // Currency set to INR
            payment_method_types: ['google_pay'], // Specify UPI as the payment method type
        });

        // Send the client secret to the frontend
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.error('Stripe Payment Intent Creation Error:', err); // Improved error logging
        // Handle any errors that occur during payment intent creation
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
});
