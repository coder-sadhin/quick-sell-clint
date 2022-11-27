import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import CheckOutForm from './CheckOut';


const Payment = () => {
    const stripePromise = loadStripe(`${process.env.REACT_APP_Stripe}`);
    const product = useLoaderData();

    return (
        <div className='bg-blue-200 mx-auto rounded-lg max-w-screen-md'>
            {
                product ? <>
                    <div className='w-11/12 mx-auto my-10'>
                        <h3 className="text-3xl text-center font-bold pt-5">Payment</h3>
                        <p className='text-xl text-center mt-3 mb-7'>Please Pay <strong>${product.price}</strong> for Buy Mobile <span className='font-bold'>{product.productName}</span>  From {product.location}</p>
                        {
                            <Elements stripe={stripePromise}>
                                <CheckOutForm product={product} />
                            </Elements>
                        }
                    </div>
                </> :
                    <div>
                        <Spinner />
                    </div>
            }
        </div>

    );
};

export default Payment;