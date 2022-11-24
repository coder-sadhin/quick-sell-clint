import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="hero my-5">
                <div className="hero-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                    <div className='w-full mx-auto'>
                        <p className="text-4xl text-center lg:text-left md:text-5xl lg:text-6xl py-2 font-bold">SELL OR BUY</p>
                        <p className="text-4xl text-center lg:text-left md:text-5xl lg:text-6xl text-blue-800 py-2 font-bold">SMARTPHONE</p>
                        <p className="text-4xl text-center lg:text-left md:text-5xl lg:text-6xl py-2 font-bold">ON <span className='text-red-500'>QUICK</span><span>SELL</span>.</p>
                    </div>
                    <div className='w-full mx-auto'>
                        <img src="https://i.ibb.co/qk3FkyR/Untitled-design.png" alt=''
                            className=" rounded-lg shadow-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;