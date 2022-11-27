import React, { useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';


const CheckOutForm = ({ product }) => {
    const stripe = useStripe();
    const element = useElements();
    const [cardError, setCardError] = useState();
    const [success, setSuccess] = useState();
    const [Prosessing, setProsessing] = useState(false);
    const [transitionId, setTransitionId] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const { price, buyerName, buyerEmail, productId } = product;

    console.log(product)
    useEffect(() => {
        fetch(`https://sell-dao-server.vercel.app/payment/intent?price=${price}`, {
            method: "POST",
            headers: {
                authorization: `bearer ${localStorage.getItem('quicksellToken')}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, [price]);

    console.log('clint secret akhane', clientSecret);


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !element) {
            console.log(39);
            return;
        }

        const card = element.getElement(CardElement);

        if (card == null) {
            console.log(45);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
        }
        console.log(61);
        setProsessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setSuccess('')
            setCardError(confirmError.message)
            return
        }

        if (paymentIntent.id) {
            // const payment = {
            //     price,
            //     transactionId: paymentIntent.id,
            //     buyerEmail,
            //     productId: productId
            // };
            // fetch("https://my-doctor-server.vercel.app/payments", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         authorization: `bearer ${localStorage.getItem('accessToken')}`
            //     },
            //     body: JSON.stringify(payment)
            // })
            //     .then((res) => res.json())
            //     .then((data) => {
            //         if (data.insertedId) {
            //             setSuccess("Congratulation! Your Payment Successful")
            //             setTransitionId(paymentIntent.id)
            //         }
            //     });
            console.log(paymentIntent.id)
        }
        setProsessing(false)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex justify-center py-5'>
                    <button className='hover:text-orange-500  btn bg-gradient-to-r from-primary to-secondary text-white' type="submit" disabled={!stripe || !clientSecret || Prosessing}>
                        Confirm Payment
                    </button>
                </div>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className="text-green-500">{success}</p>
                    <p> Your Transition Id: <span className='font-bold text-red-500'>{transitionId}</span></p>
                </div>
            }
        </div>
    )
}

export default CheckOutForm