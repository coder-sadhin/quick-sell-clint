import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <div className='max-w-[1440px] mx-auto'>
                <div className='w-11/12 mx-auto'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
