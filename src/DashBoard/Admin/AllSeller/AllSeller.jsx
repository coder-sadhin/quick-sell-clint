import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import toast from 'react-hot-toast';
import NoData from '../../../Pages/NoData/NoData';
import Spinner from '../../../Components/Spinner/Spinner';

const AllSeller = () => {
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/allSeller', {
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

    if (isLoading) {
        <Spinner />
    }


    const handleToVerify = (id) => {
        const confirm = window.confirm('Do You Went To Verify This Seller')
        if (confirm) {
            fetch(`http://localhost:5000/sellerVerify/${id}`, {
                method: 'PUT',
                headers: {
                    'authorization': `token ${localStorage.getItem('quicksellToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success('Seller Verification Successfully Done')
                        refetch()
                    }
                })
        }
    }
    console.log(users)
    return (
        <div className='w-11/12 mx-auto'>
            {users?.length > 0 ?
                <>
                    <div className='my-5'>
                        <h3 className="text-4xl font-bold text-center">ALL SELLER</h3>
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
                                    <th>Roll</th>
                                    <th>Verification</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    users.map((user, i) =>
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
                                                            <img src={user.photoURL} alt="user" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="font-bold">{user.name}</div>
                                                    {/* <div className="text-sm opacity-50">United States</div> */}
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td className={(user.userType === 'seller' && 'text-red-400') || (user.userType === 'admin' && 'text-emerald-600 font-bold')}>{user.userType}</td>
                                            <th>
                                                {
                                                    user?.sellerStatus === "verify" ?
                                                        <>
                                                            <PrimaryButton classes={'btn-sm'}>Verified</PrimaryButton>
                                                        </>
                                                        :
                                                        <>
                                                            <PrimaryButton classes={'btn-sm'} handler={() => handleToVerify(user._id)}>Verify</PrimaryButton>
                                                        </>
                                                }

                                            </th>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </>
                :
                <div className='my-5'>
                    <NoData>USER NOT FOUND</NoData>
                </div>
            }
        </div>
    );
};

export default AllSeller;