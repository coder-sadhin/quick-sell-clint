import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';

const AllProducts = () => {
    const [loading, setLoading] = useState(false);
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://sell-dao-server.vercel.app/allProduct', {
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

    const handleToDeleteProduct = (_id) => {
        setLoading(true)
        const confirm = window.confirm('Went to Delete This User')
        if (confirm) {
            console.log(confirm)
            const url = `https://sell-dao-server.vercel.app/myProducts?id=${_id}`;
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
                        toast.success('Delete successfully')
                        refetch()
                    }
                })
        }
        setLoading(false)
    }




    return (
        <div className='w-11/12 mx-auto my-5'>
            <div className='my-5'>
                <h3 className="text-4xl font-bold text-center">All Products</h3>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Condition</th>
                            <th>Details</th>
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
                                    <td>{product.price}</td>
                                    <td>{product.condition}</td>

                                    <th>
                                        <Link to={`/details/${product._id}`}>
                                            <PrimaryButton classes={'btn btn-sm'}>Details</PrimaryButton>
                                        </Link>
                                    </th>
                                    <th>
                                        <th>
                                            <PrimaryButton classes={'btn btn-sm'} handler={() => handleToDeleteProduct(product._id)}>{loading ? <SmallSpinner /> : 'Delete'}</PrimaryButton>
                                        </th>
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;