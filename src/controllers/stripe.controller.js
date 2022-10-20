const {Router} = require('express')


const router = Router()

const stripe = require('stripe')('sk_test_51LusYfG6LsVbwrAlLeXIkvaUJDAmF6uU5dPT4rGAr0iagtRBMUTX7ZQdkGMhogpYrwM2EZMwRr2pPY83ajhPsr7s00CNPI4Jx6');

const YOUR_DOMAIN = 'http://localhost:4242';

router.post('/create-checkout-session', async (req, res) => {
    
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
});


module.exports = router