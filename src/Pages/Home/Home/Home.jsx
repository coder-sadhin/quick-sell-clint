import React from 'react';
import AdvertiseItem from '../AdvertiseItem/AdvertiseItem';
import Banner from '../Banner/Banner';
import Brands from '../Brands/HomeBrands';
import ContactForm from '../ContactForm/ContactForm';

const Home = () => {
    return (
        <div>
            <Banner />
            <AdvertiseItem />
            <Brands />
            <ContactForm />
        </div>
    );
};

export default Home;