import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceInCents = price * 100;
    const PUBLISHABLE_KEY = 'pk_test_uMLbFNjmlWmGvftiCjlVyVrA00QCC2E3YJ';

    const onToken = token => {
        console.log(token);
        console.log('Payment successful');
    }

    return(
        <StripeCheckout 
            label="Pay with Credit Card"
            name='NMS Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total value is $${price}`}
            amount={priceInCents}
            panelLabel="Pay with Credit Card"
            token={onToken}
            stripeKey={PUBLISHABLE_KEY}
        />
    )
}
export default StripeCheckoutButton;