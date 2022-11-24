import React, { useContext } from 'react';
import Header from '../Pages/Shared/Header/Header';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';

const DashBoardLayout = ({ isAdmin }) => {
    const { user } = useContext(AuthContext);
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
                        <li><Link to={'/dashboard'}>My Product</Link></li>
                        <li><Link to={'/dashboard/allUsers'}>All Users</Link></li>
                        <li><Link to={'/dashboard/addCategory'}>Add A Category</Link></li>
                        <li><Link to={'/dashboard/addProduct'}>Add Product</Link></li>
                        <li><Link to={'/dashboard/reportItem'}>Reported Item</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;