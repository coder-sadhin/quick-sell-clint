import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../Layout/MainLayout';
import Blogs from "../Pages/Blogs/Blogs";
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
            }
        ]
    }
])

export default router;