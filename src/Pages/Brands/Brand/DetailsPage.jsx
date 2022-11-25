import React, { useState } from 'react';
import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import Spinner from '../../../Components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';

const DetailsPage = () => {
    const data = useLoaderData();
    const { brand, buying, condition, description, location, mobile, name, photoURL
        , price, sellerEmail, time, _id } = data;

    const navigation = useNavigation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    if (navigation.state === "loading") {
        return <Spinner></Spinner>
    }
    // console.log(data)
    const handleWishList = (id) => {
        setLoading(true)

        fetch(`http://localhost:5000/addWish?id=${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `token ${localStorage.getItem('quicksellToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Your Mobile added successfully');
                    navigate('/brands')
                    setLoading(false)
                }
            })
    }

    const handleToReport = (id) => {
        setLoading(true)

        fetch(`http://localhost:5000/addReport?id=${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `token ${localStorage.getItem('quicksellToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success('Report added successfully');
                    navigate('/brands')
                    setLoading(false)
                }
            })
    }

    return (
        <div className="card  lg:card-side bg-base-100 my-10 shadow-xl">
            <figure className='w-full p-10'><img className='rounded-lg' src={photoURL} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="text-4xl font-bold text-center text-cyan-500">{brand}</h2>
                <div className='flex my-5 flex-col md:flex-row lg:flex-row'>
                    <p className='text-xl'>Product Condition: <span className='font-bold'> {condition}</span></p>
                    <p className='text-xl'>Price: <span className='font-bold'> ${price}</span></p>
                    <p className='text-xl'>Location: <span className='font-bold'> {location}</span></p>
                </div>
                <div>
                    <h4 className='text-xl'>About This Phone: <div className='font-bold'>{description}</div></h4>
                </div>

                <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title">Buying</div>
                        <div className="stat-value">{buying}</div>
                        <div className="stat-desc">Product Add {time}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Contact</div>
                        <div className="stat-value">{mobile}</div>

                    </div>
                    <div className="stat">
                        <div className="stat-title">Buyer Name</div>
                        <div className="stat-value">{name}</div>
                        <div className="stat-desc">{sellerEmail}</div>
                    </div>
                </div>
                <div className="card-actions justify-center my-5">
                    <PrimaryButton handler={() => handleWishList(_id)} classes={'btn'}>{loading ? <SmallSpinner /> : 'Add Wish List'}</PrimaryButton>
                    <Link to={`/booking/${_id}`}>
                        <PrimaryButton classes={'btn'}>Booking</PrimaryButton>
                    </Link>
                    <PrimaryButton handler={() => handleToReport(_id)} classes={'btn'}>{loading ? <SmallSpinner /> : 'Report This Product'}</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;