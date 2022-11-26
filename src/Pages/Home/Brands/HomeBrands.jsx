import React, { useEffect, useState } from 'react';
import { brandHomeApi } from '../../../AllApi/BrandImageApi';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import { Link } from 'react-router-dom';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        fetch(brandHomeApi)
            .then(res => res.json())
            .then(data => setBrands(data))
    }, [])
    // console.log(brands)


    return (
        <div>
            <h3 className="text-3xl font-bold mt-12 mb-6">Smartphone Brands For You</h3>
            <div>
                <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3'>
                    {
                        brands.map(brand =>
                            <div
                                key={brand._id}
                                className="p-3 bg-slate-300 flex justify-center rounded-lg"
                            >
                                <Link to={`/brands/${brand.brandName}`}>
                                    <img className='w-28' src={brand.photoUrl} alt="" />
                                </Link>
                            </div>)
                    }
                </div>
                <div className='flex justify-center my-5'>
                    <Link to={'/brands'}><PrimaryButton
                        classes='btn'
                    >See All Brands</PrimaryButton></Link>
                </div>
            </div>
        </div>
    );
};

export default Brands;