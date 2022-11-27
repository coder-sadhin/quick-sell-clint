import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import NoData from '../../Pages/NoData/NoData';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { useTitle } from 'react-use';


const MyOrders = () => {
    useTitle('Dashboard - Orders Page')
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('https://sell-dao-server.vercel.app/booking', {
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

    const handleToPay = (id) => {
        if (!user) {
            const confirm = window.confirm('You are not login, Go To Login Page')
            if (confirm) {
                navigate('/login')
                toast.error('GO To Login Page')
            }
        }
        navigate(`/dashboard/payment/${id}`)
    }
    return (
        <div>
            {
                orders.length > 0 ?
                    <>
                        <div className='w-11/12 mx-auto'>
                            <div className='my-5'>
                                <h3 className="text-4xl font-bold text-center">All Orders</h3>
                            </div>
                            <div className="overflow-x-auto w-full">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>
                                            </th>
                                            <th>Image</th>
                                            <th>Brand</th>
                                            <th>price</th>
                                            <th>Seller Email</th>
                                            <th>Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            orders.map((order, i) =>
                                                <tr key={i}>
                                                    <th>
                                                        <label>
                                                            {i + 1}
                                                        </label>
                                                    </th>
                                                    <td className='flex items-center'>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle w-12 h-12">
                                                                    <img src={order.photoURL} alt="user" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <div className="font-bold">{order.brand}</div>
                                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                                        </div>
                                                    </td>
                                                    <td>{order.price}</td>
                                                    <td>{order.sellerEmail}</td>

                                                    <th>
                                                        <button onClick={() => handleToPay(order.productId)} className='hover:text-orange-500 btn-sm btn bg-gradient-to-r from-primary to-secondary text-white' disabled={(order.paying === 'paid' ? true : false)} >{order.paying === 'paid' ? 'Paid' : 'Pay'}</button>
                                                    </th>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    :
                    <div className='w-11/12 mx-auto mt-5'>
                        <NoData>YOUE HAVE NO ORDER</NoData>
                    </div>
            }
        </div>
    );
};

export default MyOrders;