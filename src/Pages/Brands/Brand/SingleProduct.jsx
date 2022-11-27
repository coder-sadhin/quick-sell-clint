import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import ProductBooking from '../Booking/ProductBooking';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const SingleProduct = ({ product }) => {
    const { photoURL, price, brand, condition, _id, sellerEmail } = product;
    const [openModal, setOpenModal] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: seller = `''` } = useQuery({
        queryKey: ['seller'],
        queryFn: async () => {
            try {
                const res = await fetch(`https://sell-dao-server.vercel.app/sellerVerify?email=${sellerEmail}`, {
                    headers: {
                        'authorization': `token ${localStorage.getItem('quicksellToken')}`
                    }
                });
                const data = await res.json();

                return data
            }
            catch (err) { }
        }
    })
    // console.log(user)
    const handleToast = () => {
        toast.error('This Product Already Booked')
    }
    const handleToModal = () => {
        if (!user) {
            const confirm = window.confirm('You are not login, Go To Login Page')
            if (confirm) {
                navigate('/login')
            }
        }
        setOpenModal(true)
    }

    return (
        <div className='mx-auto'>
            <div className="card card-compact p-5 bg-slate-200 w-80 md:w-96 lg:w-96 shadow-xl shadow-slate-400">
                <figure> <img src={photoURL} className='w-96 h-52' alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-2xl text-green-600">Brand: {brand}</h2>
                    <div className='flex justify-between'>
                        <div>
                            <h2 className="card-title font-bold">Price: ${price}</h2>
                            <h2 className="card-title font-bold">Condition: {condition}</h2>
                        </div>
                        <div className='w-14'>
                            {
                                seller && seller === "verify" && <img src="https://i.ibb.co/mJwB4QT/6874364-removebg-preview.png" alt="" />
                            }
                        </div>
                    </div>
                    <div className="card-actions mt-5">
                        {
                            !product?.paying ?
                                <>
                                    <label htmlFor="bookingModal" onClick={handleToModal} className="hover:text-xl w-full btn bg-gradient-to-r from-primary to-secondary text-white"
                                    >Book Now</label>
                                    <Link to={`/details/${_id}`} className='w-full'>
                                        <PrimaryButton classes={'btn w-full hover:text-xl'}>Details</PrimaryButton>
                                    </Link>
                                </>

                                :
                                <PrimaryButton handler={handleToast} classes={'btn w-full'}>BOOKED</PrimaryButton>
                        }
                        {
                            openModal && <ProductBooking
                                openModal={openModal}
                                product={product}
                                setOpenModal={setOpenModal}
                            ></ProductBooking>
                        }

                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingleProduct;