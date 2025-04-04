import stripePackage from 'stripe';
import handler from 'express-async-handler';

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const Make_Payment_UPI = handler(async (req, res) => {
    const { amount } = req.body; 

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: 'usd', 
            payment_method_types: ['google_pay'], 
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.error('Stripe Payment Intent Creation Error:', err);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
});
