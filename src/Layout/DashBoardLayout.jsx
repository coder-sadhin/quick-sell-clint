import React, { useContext } from 'react';
import Header from '../Pages/Shared/Header/Header';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useUserType from '../Hooks/useUserType';
import Spinner from '../Components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const DashBoardLayout = () => {
    const { user, userSignOut } = useContext(AuthContext);
    // console.log(user)
    const [isAdmin, isSeller, isUser, userLoading] = useUserType(user?.email)
    const navigate = useNavigate();

    if (userLoading) {
        return <Spinner />
    }
    const handleToSignOut = () => {
        userSignOut();
        navigate('/')
    }
    return (
        <div>
            <Header />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-slate-500">
                        {
                            isUser && <>
                                <li><Link to={'/dashboard/myOrders'}>My Orders</Link></li>
                                <li><Link to={'/dashboard/wishlist'}>Wish List</Link></li>
                            </>
                        }

                        {
                            isSeller && <>
                                <li><Link to={'/dashboard/myProducts'}>My Products</Link></li>
                                <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>
                                <li><Link to={'/dashboard/myBuyer'}>My Buyers</Link></li>
                            </>
                        }
                        {
                            isAdmin && <>
                                <li><Link to={'/dashboard/allProducts'}>All Products</Link></li>
                                <li><Link to={'/dashboard/allUsers'}>All Users</Link></li>
                                <li><Link to={'/dashboard/reportItem'}>Reported Items</Link></li>
                            </>
                        }
                        <li><button onClick={handleToSignOut}>Sign Out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;