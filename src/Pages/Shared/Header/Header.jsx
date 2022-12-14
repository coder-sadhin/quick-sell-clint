import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import logo from '../../../headerLogo.png'

const Header = () => {
    const navigate = useNavigate();
    const { user, userSignOut } = useContext(AuthContext)

    const handleToSignOut = () => {
        userSignOut()
        localStorage.removeItem('quicksellToken')
        navigate('/')
    }


    const menuItems = <>
        <li className='font-semibold'><Link to={'/'}>Home</Link></li>
        <li className='font-semibold'><Link to={'/brands'}>Brands</Link></li>
        <li className='font-semibold'><Link to={'/blogs'}>Blogs</Link></li>
        {
            user?.uid ?
                <>
                    <li className='font-semibold'><Link to={'/dashboard'}>Dashboard</Link></li>
                    <li className='font-semibold'><button onClick={handleToSignOut}>SignOut</button></li>
                </>
                :
                <li className='font-semibold'><Link to={'/login'}>Login</Link></li>
        }
    </>


    return (
        <div className='w-full bg-blue-200'>
            <div className='max-w-[1440px]'>

                <div className="navbar w-11/12 mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {menuItems}
                            </ul>
                        </div>
                        <Link to={'/'} ><img className='w-24 rounded-lg md:w-28 lg:40 ' src={logo} alt="" /></Link>
                    </div>
                    <div className="navbar-end hidden lg:flex ">
                        <ul className="menu menu-horizontal p-0">
                            {menuItems}
                        </ul>
                    </div>
                    <div className="navbar-end  lg:hidden">
                        <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;