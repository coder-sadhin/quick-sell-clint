import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';




const AdminRoute = ({ children }) => {

    const { user, loading, userSignOut } = useContext(AuthContext);
    const [isAdmin, userLoading] = useAdmin(user?.email)
    // console.log(isSeller)
    const location = useLocation();

    if (loading || userLoading) {
        return <Spinner />
    }

    if (isAdmin) {
        return children;
    }
    else {
        userSignOut()
    }
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>

};

export default AdminRoute;