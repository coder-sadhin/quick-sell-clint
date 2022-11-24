import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Layout/MainLayout';
import About from "../Pages/About/About";
import Blogs from "../Pages/Blogs/Blogs";
import Brand from "../Pages/Brands/Brand/Brand";
import Brands from "../Pages/Brands/Brands/Brands";
import Home from "../Pages/Home/Home/Home";

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
            }
        ]
    }
])

export default router;