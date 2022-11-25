import { createBrowserRouter } from "react-router-dom";
import AddCategory from "../DashBoard/Admin/AddCatagory/AddCatagory";
import AllSeller from "../DashBoard/Admin/AllSeller/AllSeller";
import AllUsers from "../DashBoard/Admin/AllUser/AllUsers";
import DashBoard from "../DashBoard/DashBoard/DashBoard";
import ReportedItem from "../DashBoard/Admin/ReportedItem/ReportedItem";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MainLayout from '../Layout/MainLayout';
import About from "../Pages/About/About";
import Blogs from "../Pages/Blogs/Blogs";
import Brand from "../Pages/Brands/Brand/Brand";
import Brands from "../Pages/Brands/Brands/Brands";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SellerRoute from "./SellerRoute/SellerRoute";
import MyBuyer from "../DashBoard/Seller/MyBuyer/MyBuyer";
import AddProduct from "../DashBoard/Seller/AddProduct/AddProduct";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/brands',
                element: <Brands />
            },
            {
                path: '/brands/:brandName',
                element: <PrivateRoute><Brand /></PrivateRoute>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoardLayout /></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><DashBoard /></PrivateRoute>
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers />
            },
            {
                path: '/dashboard/allSeller',
                element: <AllSeller />
            },
            {
                path: '/dashboard/addCategory',
                element: <AddCategory />
            },
            {
                path: '/dashboard/reportItem',
                element: <ReportedItem />
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/myBuyer',
                element: <MyBuyer />
            }

        ]
    }
])

export default router;