import React, { useContext } from 'react';
import Header from '../Pages/Shared/Header/Header';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import useUserType from '../Hooks/useUserType';
import Spinner from '../Components/Spinner/Spinner';

const DashBoardLayout = () => {
    const { user, userSignOut } = useContext(AuthContext);
    // console.log(user)
    const [isAdmin, isSeller, userLoading] = useUserType(user?.email)
    console.log('this is seller', isSeller)
    console.log('this is admin', isAdmin)
    console.log('this is userLoading', userLoading)

    if (userLoading) {
        return <Spinner />
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
                        <li><Link to={'/dashboard/myOrders'}>My Orders</Link></li>
                        {
                            !isSeller && !isAdmin && <li><Link to={'/dashboard'}>My Orders</Link></li>
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
                                <li><Link to={'/dashboard/allUsers'}>All Products</Link></li>
                                <li><Link to={'/dashboard/allUsers'}>All Users</Link></li>
                                <li><Link to={'/dashboard/allSeller'}>All Seller</Link></li>
                                <li><Link to={'/dashboard/addCategory'}>Add A Category</Link></li>
                                <li><Link to={'/dashboard/reportItem'}>Reported Items</Link></li>
                            </>
                        }
                        <li><button onClick={userSignOut}>Sign Out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;