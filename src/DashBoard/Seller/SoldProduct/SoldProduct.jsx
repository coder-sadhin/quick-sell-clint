import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import NoData from '../../../Pages/NoData/NoData';


const SoldProduct = () => {

    const [loading, setLoading] = useState(false);

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://sell-dao-server.vercel.app/soldProducts', {
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
    // console.log(products)

    return (
        <div>
            {
                products.length > 0 ?
                    <>
                        <div className='w-11/12 mx-auto'>
                            <div className='my-5'>
                                <h3 className="text-4xl font-bold text-center">All Posted Product</h3>
                            </div>
                            <div className="overflow-x-auto w-full">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>
                                            </th>
                                            <th>Image</th>
                                            <th>Brand Name</th>
                                            <th>Price</th>
                                            <th>Advice</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            products.map((product, i) =>
                                                <tr key={product._id}>
                                                    <th>
                                                        <label>
                                                            {i + 1}
                                                        </label>
                                                    </th>
                                                    <td className='flex items-center'>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={product.photoURL} alt="user" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div className="font-bold">{product.brand}</div>
                                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                                        </div>
                                                    </td>
                                                    <td>${product.price}</td>

                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className='w-11/12 mt-5 mx-auto'>
                        <NoData>No Product Sold</NoData>
                    </div>
            }
        </div>
    );
};

export default SoldProduct;