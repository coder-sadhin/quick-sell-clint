import React, { useContext } from 'react';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'
import useUserType from '../../Hooks/useUserType';
import { useTitle } from 'react-use';

const DashBoard = () => {
    useTitle('Dashboard - Welcome')
    const { user } = useContext(AuthContext)
    const [isAdmin, isSeller, isUser, userLoading] = useUserType(user.email)

    if (userLoading) {
        return <Spinner />
    }
    return (
        <div>
            <div className='h-screen text-gray-700 flex flex-col justify-center items-center pb-16'>
                <div className='flex justify-center items-center'>
                    <p className='text-6xl font-bold'>Welc</p>
                    <div className='w-9 h-9 border-8 border-dashed rounded-full animate-spin mt-3 border-green-400'></div>
                    <p className='text-6xl font-bold mr-2'>me</p>
                    <p className='text-6xl font-bold'>To</p>
                </div>
                <div className='flex justify-center text-gray-500 items-center mt-4'>
                    <p className='text-3xl font-medium'>{
                        (isAdmin && "Admin") || (isSeller && "Seller") || (isUser && "User")
                    } Dashboard</p>
                </div>
            </div>
        </div>
    );
};
export default DashBoard;