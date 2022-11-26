import React, { useContext, useState } from 'react';
import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../../Components/Button/PrimaryButton';
import Spinner from '../../../Components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import ProductBooking from '../Booking/ProductBooking';

const DetailsPage = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    // console.log(data)
    const [openModal, setOpenModal] = useState(false);
    const { brand, buying, condition, description, productName, location, mobile, name, photoURL
        , price, sellerEmail, time, _id } = data;

    const handleToModal = () => {
        setOpenModal(true)
    }


    if (navigation.state === "loading") {
        return <Spinner></Spinner>
    }
    // console.log(data)
    const handleWishList = (id) => {
        setLoading(true)

        const wishInfo = {
            mobile,
            location,
            brand,
            sellerEmail,
            productId: id,
            photoURL,
            buying,
            buyerEmail: user.email,
            price
        }

        fetch(`http://localhost:5000/addWish`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `token ${localStorage.getItem('quicksellToken')}`
            },
            body: JSON.stringify(wishInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.acknowledged) {
                    toast.success('Your Mobile added successfully');
                    navigate('/brands')
                    setLoading(false)
                }
                else {
                    toast.error(data);
                    setLoading(false)
                }
            })
    }

    const handleToReport = (id) => {
        setLoading(true)

        const reportInfo = {
            mobile,
            location,
            brand,
            sellerEmail,
            productId: id,
            photoURL,
            buying
        }

        fetch(`http://localhost:5000/addReport`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `token ${localStorage.getItem('quicksellToken')}`
            },
            body: JSON.stringify(reportInfo)
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
                <h2 className="text-4xl font-bold text-center text-cyan-500">{productName}</h2>
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
                    <label htmlFor="bookingModal" onClick={handleToModal} className="hover:text-bold btn bg-gradient-to-r from-primary to-secondary text-white"
                    >Book Now</label>
                    <PrimaryButton handler={() => handleToReport(_id)} classes={'btn'}>{loading ? <SmallSpinner /> : 'Report This Product'}</PrimaryButton>
                </div>
            </div>
            {
                openModal && <ProductBooking
                    openModal={openModal}
                    product={data}
                    setOpenModal={setOpenModal}
                ></ProductBooking>
            }
        </div>
    );
};

export default DetailsPage;