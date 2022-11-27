import { createBrowserRouter } from "react-router-dom";
import AllUsers from "../DashBoard/Admin/AllUser/AllUsers";
import DashBoard from "../DashBoard/DashBoard/DashBoard";
import ReportedItem from "../DashBoard/Admin/ReportedItem/ReportedItem";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MainLayout from '../Layout/MainLayout';
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
import MyProduct from "../DashBoard/Seller/MyProduct/MyProduct";
import AllProducts from "../DashBoard/Admin/AllProducts/AllProducts";
import DetailsPage from "../Pages/Brands/Brand/DetailsPage";
import ProductBooking from "../Pages/Brands/Booking/ProductBooking";
import MyOrders from "../DashBoard/DashBoard/MyOrders";
import MyWishList from "../DashBoard/DashBoard/MyWishList";
import AllSeller from "../DashBoard/Admin/AllSeller/AllSeller";
import AdvertiseProduct from "../DashBoard/Admin/AdvertiseProduct/AdvertiseProduct";
import Payment from "../DashBoard/DashBoard/Payment/Payment";
import AdminRoute from "./AdminRoute/AdminRoute";

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
                loader: ({ params }) => fetch(`https://sell-dao-server.vercel.app/brand/${params.brandName}`),
                element: <PrivateRoute><Brand /></PrivateRoute>
            },
            {
                path: '/details/:id',
                loader: ({ params }) => fetch(`https://sell-dao-server.vercel.app/details/${params.id}`),
                element: <PrivateRoute><DetailsPage /></PrivateRoute>
            },
            {
                path: '/booking/:id',
                loader: ({ params }) => fetch(`https://sell-dao-server.vercel.app/details/${params.id}`),
                element: <PrivateRoute><ProductBooking /></PrivateRoute>

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
                path: '/dashboard/myOrders',
                element: <PrivateRoute><MyOrders /></PrivateRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <PrivateRoute><MyWishList /></PrivateRoute>
            },
            {
                path: '/dashboard/allUsers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: '/dashboard/allSeller',
                element: <AdminRoute><AllSeller /></AdminRoute>
            },
            {
                path: '/dashboard/reportItem',
                element: <AdminRoute><ReportedItem /></AdminRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddProduct /></SellerRoute>
            },
            {
                path: '/dashboard/myBuyer',
                element: <SellerRoute><MyBuyer /></SellerRoute>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProduct /></SellerRoute>
            },
            {
                path: '/dashboard/allProducts',
                element: <AdminRoute><AllProducts /></AdminRoute>
            },
            {
                path: '/dashboard/advertiseP',
                element: <AdminRoute><AdvertiseProduct /></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                loader: ({ params }) => fetch(`https://sell-dao-server.vercel.app/payment/${params.id}`),
                element: <PrivateRoute><Payment /></PrivateRoute>
            }

        ]
    }
])

export default router;