const { Router } = require("express")

const express = require('express')

const {
    handleWebHook,
    payment
} = require("../controllers/payment.controller")

const router = Router()
//payment
router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;
    const endpointSecret = 'whsec_JggyuyP3MmxuV8q9ImwPLYEMu4qLFTid'
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    response.send();
})

router.post("/create-checkout-session", payment);

module.exports = router