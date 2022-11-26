import React from 'react';
import { useLoaderData, useNavigation, Link } from 'react-router-dom';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import Spinner from '../../../Components/Spinner/Spinner';
import NoData from '../../NoData/NoData';
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
                            <Link className='flex justify-center my-5' to={'/brands'}>
                                <PrimaryButton>GO Brands Page</PrimaryButton>
                            </Link>
                        </> :
                        <div>
                            <NoData>No Data Found</NoData>
                            <Link className='flex justify-center my-5' to={'/brands'}>
                                <PrimaryButton>GO Brands Page</PrimaryButton>
                            </Link>
                        </div>
                }


            </div>
        </div>
    );
};

export default Brand;