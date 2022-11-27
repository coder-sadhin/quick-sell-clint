import React from 'react';
import { useQuery } from '@tanstack/react-query';
import SingleProduct from '../../Brands/Brand/SingleProduct';

const AdvertiseItem = () => {

    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://sell-dao-server.vercel.app/advProduct');
                const data = await res.json();

                return data
            }
            catch (err) { }
        }
    })
    console.log(products)
    // console.log(result, brandName)


    return (
        <div>
            {
                products.length > 0 &&

                <div className='w-11/12 mx-auto'>
                    <div className='text-5xl underline text-center mb-10 mt-20 font-bold'>
                        <h2 className='uppercase'> Advertise Items</h2>
                    </div>
                    <>
                        <div className={`${products.length > 2 && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20'}
                        ${products.length < 3 && 'flex justify-between gap-5 my-20'}
                        `}>
                            {
                                products.map((product, i) => <SingleProduct
                                    key={product._id}
                                    product={product}
                                ></SingleProduct>)
                            }
                        </div>
                    </>
                </div>
            }
        </div>
    );
};

export default AdvertiseItem;