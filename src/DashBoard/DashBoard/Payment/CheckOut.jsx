import React, { useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';


const CheckOutForm = ({ product }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const element = useElements();
    const [cardError, setCardError] = useState();
    const [success, setSuccess] = useState();
    const [Prosessing, setProsessing] = useState(false);
    const [transitionId, setTransitionId] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const { price, buyerName, buyerEmail, productId } = product;
    const [loading, setLoading] = useState(false);

    // console.log(product)
    useEffect(() => {
        fetch(`http://localhost:5000/payment/intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('quicksellToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, [price]);

    // console.log('clint secret akhane', clientSecret);


    const handleSubmit = async (event) => {
        setLoading(true)
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
            const paymentInfo = {
                price,
                transactionId: paymentIntent.id,
                buyerEmail,
                productId: productId
            };
            fetch("http://localhost:5000/paymentsStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem('quicksellToken')}`
                },
                body: JSON.stringify(paymentInfo)
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    if (data.acknowledged) {
                        setSuccess("Congratulation! Your Payment Successful")
                        toast.success("Congratulation! Your Payment Successful")
                        setTransitionId(paymentIntent.id)
                        setLoading(false)
                        setTimeout(function () {
                            toast('Good Job! Wait for Rediract', {
                                icon: '👏',
                            });
                        }, 1000);
                        setTimeout(function () {
                            navigate('/dashboard/myOrders')
                        }, 5000);
                    }
                });
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
                        {
                            loading ? <SmallSpinner /> : "Confirm Payment"
                        }
                    </button>
                </div>
            </form>
            <p className="text-red-500 py-8">{cardError}</p>
            {
                success && <div className='py-5'>
                    <p className="text-green-500">{success}</p>
                    <p> Your Transition Id: <span className='font-bold text-red-500'>{transitionId}</span></p>
                </div>
            }
        </div>
    )
}

export default CheckOutForm