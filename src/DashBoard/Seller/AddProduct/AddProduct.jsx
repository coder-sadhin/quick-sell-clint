import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../Components/Spinner/Spinner';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import userImageUploadApi from '../../../AllApi/UserImageApi';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';


const AddProduct = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();


    const { data: districts = [], isLoading, error } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/geoLocation');
            const data = res.json();
            return data
        }
    })

    // this is for geo location 

    useEffect(() => {
        fetch('http://localhost:5000/brands')
            .then(res => res.json())
            .then(data => {
                setBrands(data)
            })
    }, [])




    const handleAddProduct = (data) => {
        setLoading(true)
        const productName = data.productName;
        const price = data.price;
        const condition = data.condition;
        const location = data.location;
        const brand = data.brand;
        const buying = data.buying;
        const mobile = data.mobile;
        const description = data.description;
        const time = new Date().toLocaleString();

        const productInfo = {
            productName,
            name: user.displayName,
            sellerEmail: user.email,
            price,
            condition,
            location,
            brand,
            buying,
            mobile,
            description,
            time
        }
        const image = data.image[0];
        //     // upload image
        const formData = new FormData();
        formData.append('image', image);

        fetch(userImageUploadApi, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const photoURL = imageData.data.url;
                    productInfo.photoURL = photoURL;
                    setDoctorToDB(productInfo)
                    // console.log(productInfo)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    //     // save information to the database 

    const setDoctorToDB = (productInfo) => {

        fetch('http://localhost:5000/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `token ${localStorage.getItem('quicksellToken')}`
            },
            body: JSON.stringify(productInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Your Mobile added successfully');
                    navigate('/dashboard/myProducts')
                    setLoading(false)
                }
            })
    }
    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className='flex justify-center items-center py-5 '>
            <div className='flex flex-col w-11/12  p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900'>
                <div className='mb-5 text-center'>
                    <h1 className='text-4xl font-bold'>Add Your Product</h1>
                </div>
                <form onSubmit={handleSubmit(handleAddProduct)} className='space-y-6 ng-untouched ng-pristine ng-valid' >
                    <div className='space-y-4'>
                        <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Product Name</span>
                                </label>
                                <input type="text" className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("productName", {
                                    required: "Product Name is required"
                                })} />

                            </div>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Price</span>
                                </label>
                                <input type="number"
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("price", {
                                        required: "Product Price is required"
                                    })} />
                            </div>
                        </div>
                        <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Product Condition</span>
                                </label>
                                <select defaultValue={''} name='userRoll'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("condition", {
                                        required: "Product Condition is required"
                                    })}>
                                    <option value={''} disabled selected>Product Condition</option>
                                    <option value={'Excellent'}>Excellent</option>
                                    <option value={'Good'}>Good</option>
                                    <option value={'Fair'}>Fair</option>
                                </select>

                            </div>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Seller Location</span>
                                </label>
                                <select defaultValue={''} name='userRoll'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("location", {
                                        required: "Location is required"
                                    })}>
                                    <option value={''} disabled selected>Select Your Location</option>
                                    {
                                        districts.map(district => <option
                                            key={district._id}
                                            value={district.name}
                                        >{district.name}</option>)
                                    }

                                </select>
                            </div>
                        </div>
                        <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Brand</span>
                                </label>
                                <select defaultValue={''} name='userRoll'
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("brand", {
                                        required: "Brand is required"
                                    })}>
                                    <option value={''} disabled selected>Brand Name</option>
                                    {
                                        brands.map(brand => <option
                                            key={brand._id}
                                            value={brand.brandName}
                                        >{brand.brandName}</option>)
                                    }
                                </select>

                            </div>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Buying Year</span>
                                </label>
                                <input type="number"
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("buying", {
                                        required: "Buying Year is required"
                                    })} />
                            </div>
                        </div>
                        <div className='flex md:flex-row lg:flex-row flex-col gap-3'>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Product Image</span>
                                </label>
                                <input
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("image", {
                                        required: "Image is required"
                                    })}
                                    required type='file' id='image' name='image' accept='image/*'
                                />

                            </div>
                            <div className="form-control w-full md:w-6/12 lg:w-6/12">
                                <label className="label">
                                    <span className="label-text font-bold">Mobile Number</span>
                                </label>
                                <input type="number"
                                    className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("mobile", {
                                        required: "Number is required"
                                    })} />
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Sort Description</span>
                            </label>
                            <textarea className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900' {...register("description", {
                                required: "description is required"
                            })}></textarea>
                        </div>
                    </div>
                    <div>
                        <PrimaryButton
                            type='submit'
                            classes='w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100'
                        >
                            {loading ? <SmallSpinner /> : 'Register'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;