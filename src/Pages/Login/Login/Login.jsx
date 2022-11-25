import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import { setAuthToken } from '../../../AllApi/AuthToken/AuthToken';

const Login = () => {
    const [userEmail, setUserEmail] = useState('')
    const { userLogin, loading, setLoading, logInWithGoogle, resetPassword } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleSubmit = event => {
        event.preventDefault()
        const email = event.target.email.value
        const password = event.target.password.value

        // console.log(email, password)

        userLogin(email, password)
            .then(result => {
                checkUserType(result.user.email)
                // console.log(result)
            })
            .catch(err => {
                toast.error(err.message)
                console.error(err)
                setLoading(false)
            })
    }

    const checkUserType = (email) => {
        const url = `http://localhost:5000/checkuser/type?email=${email}`
        console.log(email, url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const userData = {
                    email, userType: data
                }
                console.log(data)
                setAuthToken(userData);
                setLoading(false)
                toast.success('Login Successful.....!')
                navigate(from, { replace: true })
            })


    }

    const handleGoogleSignin = () => {
        logInWithGoogle()
            .then(result => {
                // console.log(result.user)
                const userData = {
                    email: result.user.email, userType: 'user'
                }
                setAuthToken(userData);
                toast.success('Login Successful.....!')
                setLoading(false)
                navigate(from, { replace: true })
            })
    }

    // Password reset
    const handleReset = () => {
        resetPassword(userEmail)
            .then(() => {
                toast.success('Please check your email for reset link')
                setLoading(false)
            })
            .catch(err => {
                toast.error(err.message)
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div className='flex justify-center items-center py-5'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='text-4xl font-bold'>Please Sign In</h1>
                    <p className='text-sm text-gray-400'>
                        Sign in to access your account
                    </p>
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
                                Email address
                            </label>
                            <input onBlur={event => setUserEmail(event.target.value)} type='email' name='email' id='email' required placeholder='Enter Your Email Here'
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
                <div className='space-y-1'>
                    <button
                        onClick={handleReset}
                        className='text-xs hover:underline text-gray-400'
                    >
                        Forgot password?
                    </button>
                </div>
                <div>
                    <p className='px-3 text-sm text-center my-2 dark:text-gray-400'>
                        Direct Login with social accounts
                    </p>
                </div>
                <div className='flex justify-center'>
                    <PrimaryButton handler={handleGoogleSignin} type='submit'
                        classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                    >
                        {loading ? <SmallSpinner /> : <div className='flex items-center justify-around'>Continue With <FaGoogle /></div>}
                    </PrimaryButton>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don't have an account yet?{' '}
                    <Link to='/register' className='hover:underline text-gray-600'>
                        Register Now
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default Login
