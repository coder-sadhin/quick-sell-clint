import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import NoData from '../../../Pages/NoData/NoData';

const MyBuyer = () => {
    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/bookingSell', {
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
    return (
        <div>
            {
                buyers?.length > 0 ? <>
                    <div className='w-11/12 mx-auto'>
                        <div className='my-5'>
                            <h3 className="text-4xl font-bold text-center">My All Buyers</h3>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Product</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        buyers.map((buyer, i) =>
                                            <tr key={buyer._id}>
                                                <th>
                                                    <label>
                                                        {i + 1}
                                                    </label>
                                                </th>
                                                <td className='flex items-center'>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                {
                                                                    buyer?.buyerImage ?
                                                                        <img src={buyer.buyerImage} alt="user" />
                                                                        :
                                                                        <img src="https://placeimg.com/192/192/people" alt='' />
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{buyer.buyerName}</div>
                                                        <div className="text-sm opacity-50">{buyer.mobile}</div>
                                                    </div>
                                                </td>
                                                <td>{buyer.buyerEmail}</td>
                                                <td>{buyer.brand}</td>
                                                <td className='font-bold'>{buyer.paying}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
                    :
                    <div className='w-11/12 mx-auto my-5'>
                        <NoData>NO ONE SELL PRODUCT</NoData>
                    </div>
            }
        </div>

    );
};

export default MyBuyer;