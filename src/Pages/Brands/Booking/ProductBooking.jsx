import React, { useContext, useState } from 'react';
import { useNavigation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import Spinner from '../../../Components/Spinner/Spinner';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const ProductBooking = ({ openModal, product, setOpenModal }) => {


    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const { brand, buying, location, photoURL, price, sellerEmail, _id, productName } = product;

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
            buyerImage: user.photoURL,
            mobile,
            buyerDescription,
            location,
            brand,
            productName,
            sellerEmail,
            productId: _id,
            photoURL,
            buying,
            price,
            paying: 'Unpaid'
        }

        fetch('https://sell-dao-server.vercel.app/booking', {
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
                    toast.success('Your Booking Complete');
                    setLoading(false)
                    setOpenModal(false)
                    navigate('/dashboard/myOrders')
                }
            })

    }

    return (
        <div>
            <>
                {
                    openModal && <>

                        <input type="checkbox" id="bookingModal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="bookingModal" onClick={() => setOpenModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                <div className='flex flex-col w-full p-6 rounded-md sm:p-6 bg-gray-200 text-gray-900'>
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
                                        className='ng-untouched ng-pristine ng-valid'
                                    >
                                        <div className='space-y-4'>
                                            <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                                                <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Product Name</span>
                                                    </label>
                                                    <input value={productName} disabled type='text'
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
                                                        <span className="label-text font-bold">Product Brand</span>
                                                    </label>
                                                    <input value={brand} disabled type='text'
                                                        className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'
                                                    />
                                                </div>
                                                <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Location</span>
                                                    </label>
                                                    <input value={location} disabled type='text'
                                                        className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                                                <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Your Email</span>
                                                    </label>
                                                    <input value={user.email} disabled type='text'
                                                        className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'
                                                    />
                                                </div>
                                                <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                                    <label className="label">
                                                        <span className="label-text font-bold">Your Mobile Number</span>
                                                    </label>
                                                    <input required type='number' name='mobile'
                                                        className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'

                                                    />
                                                </div>
                                            </div>

                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text font-bold">Sort Description</span>
                                                </label>
                                                <textarea required name='description' className='w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-green-500 bg-gray-200 text-gray-900'>

                                                </textarea>
                                            </div>

                                        </div>


                                        <div className='mt-5'>
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
                        </div>
                    </>
                }
            </>
        </div>
    );
};

export default ProductBooking;