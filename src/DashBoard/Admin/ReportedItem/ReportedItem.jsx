import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import toast from 'react-hot-toast';

const ReportedItem = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/reported', {
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

    const handleToDeleteProduct = (id, productId) => {
        const info = { id, productId };
        const confirm = window.confirm('Went to Delete This Product')
        if (confirm) {
            fetch('https://localhost:5000/reportItem', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `token ${localStorage.getItem('quicksellToken')}`
                },
                body: JSON.stringify(info)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('Delete successfully')
                        refetch()
                    }
                })
        }
    }


    return (
        <div className='w-11/12 mx-auto'>
            <div className='my-5'>
                <h3 className="text-4xl font-bold text-center">Reported Items</h3>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Image</th>
                            <th>Brand</th>
                            <th>Seller Email</th>
                            <th>Roll</th>
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
                                    <td>{product.sellerEmail}</td>
                                    <td>{product.location} </td>
                                    <th>
                                        <PrimaryButton classes={'btn-sm'} handler={() => handleToDeleteProduct(product._id, product.productId)}>Delete</PrimaryButton>
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

export default ReportedItem;