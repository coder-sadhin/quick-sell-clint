import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import SingleProduct from './SingleProduct';

const Brand = () => {

    const { result, brandName } = useLoaderData();
    const products = result;
    const navigation = useNavigation();
    // console.log(result, brandName)
    if (navigation.state === "loading") {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <div className='w-11/12 mx-auto'>
                <div className='text-4xl text-center my-5 font-bold'>
                    <h2> All Product of <span className='uppercase'>{brandName}</span> </h2>
                </div>
                {
                    products.length > 0 ?
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
                                {
                                    products.map(product => <SingleProduct
                                        key={product._id}
                                        product={product}
                                    ></SingleProduct>)
                                }
                            </div>
                        </> :
                        <div className=' mx-auto h-96  flex items-center justify-center rounded-xl bg-base-200'>
                            <div className="text-6xl text-center">NO Product Found</div>
                        </div>
                }


            </div>
        </div>
    );
};

export default Brand;