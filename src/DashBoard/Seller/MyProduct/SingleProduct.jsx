import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/Button/PrimaryButton';

const SingleProduct = ({ product, handleToDeleteProduct }) => {
    const { photoURL, price, brand, condition, _id } = product;

    return (
        <div className='mx-auto'>
            <div className="card card-compact p-5 bg-slate-100 w-80 shadow-xl shadow-slate-400">

                <figure> <img src={photoURL} className='w-full' alt="Shoes" /></figure>

                <div className="card-body">
                    <h2 className="card-title font-bold text-3xl text-green-600">Brand: {brand}</h2>
                    <div>
                        <h2 className="card-title font-bold">Price: ${price}</h2>
                        <h2 className="card-title font-bold">Condition: {condition}</h2>
                    </div>
                    <div className="card-actions mt-5">
                        <Link className='w-full'>
                            <PrimaryButton classes={'btn w-full'}>Advertisement</PrimaryButton>
                        </Link>
                        <PrimaryButton handler={() => handleToDeleteProduct(_id)} classes={'btn w-full text-red-400 font-bold'}> Delete</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;