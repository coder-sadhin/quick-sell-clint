import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PrimaryButton from '../../../Components/Button/PrimaryButton';

const SingleProduct = ({ product }) => {
    const { photoURL, price, brand, condition, _id } = product;
    // console.log(product)

    const handleToast = () => {
        toast.error('This Product Already Booked')
    }

    return (
        <div className='mx-auto'>
            <div className="card card-compact p-5 bg-slate-200 w-80 md:w-96 lg:w-96 shadow-xl shadow-slate-400">
                <figure> <img src={photoURL} className='w-96 h-52' alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold text-2xl text-green-600">Brand: {brand}</h2>
                    <div>
                        <h2 className="card-title font-bold">Price: ${price}</h2>
                        <h2 className="card-title font-bold">Condition: {condition}</h2>
                    </div>
                    <div className="card-actions mt-5">
                        {
                            !product?.paying ?
                                <Link to={`/details/${_id}`} className='w-full'>
                                    <PrimaryButton classes={'btn w-full'}>Details</PrimaryButton>
                                </Link>
                                :
                                <PrimaryButton handler={handleToast} classes={'btn w-full'}>BOOKED</PrimaryButton>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;