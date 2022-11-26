import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PrimaryButton from '../../Components/Button/PrimaryButton';
import NoData from '../../Pages/NoData/NoData';


const MyWishList = () => {
    const navigate = useNavigate();

    const { data: wishList = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/wishlist', {
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


    const handleToOrder = (id) => {
        const confirm = window.confirm('Remember, If you not place booking!, Item also remove form wishlist')
        if (confirm) {
            handleToRemove(id);
            navigate(`/booking/${id}`)
        }
    }

    const handleToRemove = (id) => {

        const confirm = window.confirm('Went to Remove This Item')
        if (confirm) {
            const url = `http://localhost:5000/wishlist/${id}`
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'authorization': `token ${localStorage.getItem('quicksellToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('Remove successfully')
                        refetch()
                    }
                })
        }

    }


    return (
        <div>
            {
                wishList.length > 0 ?
                    <>
                        <div className='w-11/12 mx-auto'>
                            <div className='my-5'>
                                <h3 className="text-4xl font-bold text-center">Wish List</h3>
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
                                            <th>Remove</th>
                                            <th>Booking</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            wishList.map((order, i) =>
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
                                                    <th>
                                                        <button onClick={() => handleToRemove(order.productId)} className='btn btn-sm'>Remove</button>
                                                    </th>
                                                    <th>
                                                        <button onClick={() => handleToOrder(order.productId)} className='btn btn-sm'>Booking</button>
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
                        <NoData>YOUE NO HAVE ANY WISH</NoData>
                    </div>
            }
        </div>

    );
};

export default MyWishList;