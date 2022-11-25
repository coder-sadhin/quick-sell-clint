import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useSeller from '../../Hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading, userSignOut } = useContext(AuthContext);
    const [isSeller, userLoading] = useSeller(user?.email)
    // console.log(isSeller)
    const location = useLocation();

    if (loading || userLoading) {
        return <Spinner />
    }

    if (isSeller) {
        return children;
    }
    else {
        userSignOut()
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default SellerRoute;