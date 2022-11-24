import { createBrowserRouter } from "react-router-dom";
import AddCategory from "../DashBoard/AddCatagory/AddCatagory";
import AddProduct from "../DashBoard/AddProduct/AddProduct";
import AllUsers from "../DashBoard/Admin/AllUser/AllUsers";
import DashBoard from "../DashBoard/DashBoard/DashBoard";
import ReportedItem from "../DashBoard/ReportedItem/ReportedItem";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MainLayout from '../Layout/MainLayout';
import About from "../Pages/About/About";
import Blogs from "../Pages/Blogs/Blogs";
import Brand from "../Pages/Brands/Brand/Brand";
import Brands from "../Pages/Brands/Brands/Brands";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login/Login";
import Register from "../Pages/Login/Register/Register";

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
                element: <Brand />
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
        element: <DashBoardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <DashBoard />
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers />
            },
            {
                path: '/dashboard/addCategory',
                element: <AddCategory />
            },
            {
                path: '/dashboard/addProduct',
                element: <AddProduct />
            },
            {
                path: '/dashboard/reportItem',
                element: <ReportedItem />
            }
        ]
    }
])

export default router;