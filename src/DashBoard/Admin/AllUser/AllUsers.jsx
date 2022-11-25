import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/allUser', {
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


    const handleToDeleteUser = (id) => {
        const confirm = window.confirm('Went to Delete This User')
        if (confirm) {
            const url = `https://localhost:5000/users/${id}`
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'authorization': `token ${localStorage.getItem('quicksellToken')}`
                }
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
                <h3 className="text-4xl font-bold text-center">Manage Users</h3>
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
                            <th>Action</th>
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
                                        <PrimaryButton handler={() => handleToDeleteUser(user._id)}>Delete</PrimaryButton>
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

export default AllUsers;