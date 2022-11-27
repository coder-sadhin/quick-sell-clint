import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import NoData from '../../../Pages/NoData/NoData';

const AdvertiseProduct = () => {
    const [loading, setLoading] = useState(false);
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://sell-dao-server.vercel.app/allAdvertise', {
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
    console.log(products)


    const handleToDeleteProduct = (_id) => {
        setLoading(true)
        const confirm = window.confirm('Went to remove This Item')
        if (confirm) {
            console.log(confirm)
            const url = `https://sell-dao-server.vercel.app/advertise?id=${_id}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('quicksellToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Remove success')
                        refetch()
                    }
                })
        }
        setLoading(false)
    }

    return (
        <div className='w-11/12 mx-auto'>
            {
                products.length > 0 ?
                    <>

                        <div className='my-5'>
                            <h3 className="text-4xl font-bold text-center">Advertise Product</h3>
                        </div>
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th>Mobile</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                        <th>Condition</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        products.map((product, i) =>
                                            <tr key={i}>
                                                <th>
                                                    <label>
                                                        {i + 1}
                                                    </label>
                                                </th>
                                                <td>
                                                    <div>
                                                        <div className="font-bold">{product.productName}</div>
                                                        {/* <div className="text-sm opacity-50">United States</div> */}
                                                    </div>
                                                </td>
                                                <td>{product.brand}</td>
                                                <td>{product.price}</td>
                                                <td>{product.condition}</td>

                                                <th>
                                                    <th>
                                                        <PrimaryButton classes={'btn btn-sm'} handler={() => handleToDeleteProduct(product._id)}>{loading ? <SmallSpinner /> : 'Remove'}</PrimaryButton>
                                                    </th>
                                                </th>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </> :
                    <div className='mt-5 mx-auto'>
                        <NoData>No Product On Advertise</NoData>
                    </div>
            }
        </div>
    );
};

export default AdvertiseProduct;