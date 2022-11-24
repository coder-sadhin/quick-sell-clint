import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';



const Register = () => {
    const { createUser, updateUserProfile, verifyEmail, loading, setLoading, signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault()
        const name = event.target.name.value

        const email = event.target.email.value
        const password = event.target.password.value

        // Image Upload
        const image = event.target.image.files[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`


        return (
            <div className='flex justify-center items-center py-5'>
                <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900'>
                    <div className='mb-8 text-center'>
                        <h1 className='text-4xl font-bold'>Please Register Here</h1>
                        <p className='text-sm text-gray-400'>Create a new account</p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        noValidate=''
                        action=''
                        className='space-y-6 ng-untouched ng-pristine ng-valid'
                    >
                        <div className='space-y-4'>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    name='name'
                                    id='name'
                                    placeholder='Enter Your Name Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                    data-temp-mail-org='0'
                                />
                            </div>
                            <div>
                                <label htmlFor='image' className='block mb-2 text-sm'>
                                    Select Image:
                                </label>
                                <input
                                    required
                                    type='file'
                                    id='image'
                                    name='image'
                                    accept='image/*'
                                />
                            </div>
                            <div>
                                <label htmlFor='email' className='block mb-2 text-sm'>
                                    Email address
                                </label>
                                <input type='email' name='email' id='email' required placeholder='Enter Your Email Here'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'

                                />
                            </div>
                            <div>
                                <div className='flex justify-between'>
                                    <label htmlFor='password' className='text-sm mb-2'>
                                        Password
                                    </label>
                                </div>
                                <input type='password' name='password' id='password' required placeholder='*******'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900'
                                />
                            </div>
                        </div>

                        <div>
                            <PrimaryButton
                                type='submit'
                                classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                            >
                                {loading ? <SmallSpinner /> : 'Sign in'}
                            </PrimaryButton>
                        </div>
                    </form>
                    <div>
                        <p className='px-3 text-sm text-center my-2 dark:text-gray-400'>
                            Direct Login with social accounts
                        </p>
                    </div>
                    <div className='flex justify-center'>
                        <PrimaryButton onClick={handleGoogleSignin} type='submit'
                            classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                        >
                            {loading ? <SmallSpinner /> : <div className='flex items-center justify-around'>Continue With <FaGoogle /></div>}
                        </PrimaryButton>
                    </div>
                    <p className='px-6 py-2 text-sm text-center text-gray-400'>
                        Already Have An Account?{' '}
                        <Link to='/login' className='hover:underline text-gray-600'>
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>
        );
    };

    export default Register;



