import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import Spinner from '../../../Components/Spinner/Spinner';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const ProductBooking = () => {
    const { user } = useContext(AuthContext)
    const data = useLoaderData();
    const [loading, setLoading] = useState(false)
    const { brand, buying, location, photoURL, price, sellerEmail, _id } = data;

    const navigation = useNavigation();
    const navigate = useNavigate();

    if (navigation.state === "loading") {
        return <Spinner></Spinner>
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const mobile = event.target.mobile.value;
        const buyerDescription = event.target.description.value;

        const bookingInfo = {
            buyerName: user.displayName,
            buyerEmail: user.email,
            mobile,
            buyerDescription,
            location,
            brand,
            sellerEmail,
            productId: _id,
            photoURL,
            buying
        }

        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `token ${localStorage.getItem('quicksellToken')}`
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Your Mobile added successfully');
                    navigate('/')
                    setLoading(false)
                }
            })



    }








    return (
        <div className='flex justify-center items-center py-5'>
            <div className='flex flex-col w-full p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='text-4xl font-bold'>{user.displayName}</h1>
                    <p className='text-sm text-gray-400'>
                        Complete Your Order
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Product Brand</span>
                                </label>
                                <input value={brand} disabled type='text'
                                    className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'
                                />
                            </div>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Price</span>
                                </label>
                                <input type='number' value={price} disabled name='price'
                                    className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'

                                />
                            </div>
                        </div>

                        <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Location</span>
                                </label>
                                <input value={location} disabled type='text'
                                    className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'
                                />
                            </div>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Your Mobile Number</span>
                                </label>
                                <input type='number' name='mobile'
                                    className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'

                                />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Sort Description</span>
                            </label>
                            <textarea name='description' className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'>

                            </textarea>
                        </div>

                    </div>


                    <div>
                        <PrimaryButton
                            type='submit'
                            classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                        >
                            {loading ? <SmallSpinner /> : 'Confirm Booking'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductBooking;