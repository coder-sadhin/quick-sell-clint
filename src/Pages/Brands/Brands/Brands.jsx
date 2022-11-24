import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { brandApi } from '../../../AllApi/BrandImageApi';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch(brandApi)
            .then(res => res.json())
            .then(data => setBrands(data))
    }, [])
    console.log(brands)
    return (
        <div>
            <h3 className="text-3xl text-center font-bold mt-12 mb-6">ALL YOUR FAVORITE BRANDS</h3>
            <div>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
                    {
                        brands.map(brand =>
                            <div
                                key={brand._id}
                                className="p-3 bg-slate-300 flex justify-center rounded-lg"
                            >
                                <Link to={`/brands/${brand.brandName}`}>
                                    <img className='w-32' src={brand.photoUrl} alt="" />
                                </Link>
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Brands;