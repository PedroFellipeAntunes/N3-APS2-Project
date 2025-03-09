import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getOffersByUser } from '../../services/api';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

import { UserInfo } from '../../components/user_info/user_info';

// import jwt_decode from 'jsonwebtoken';

import './index.css';

export default function Account() {
    const [offers, setOffers] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function loadUserData() {
            // const token = sessionStorage.getItem("user");
            // const decodedUser = jwt_decode(token);
            // const allOffers = getOffersByUser(user._id);

            // console.log(allOffers);
        }

        loadUserData();
    }, []);

    return (
        <>
            <Header />
            <main className='account_main'>
                <UserInfo />
            </main>
            <Footer />
        </>
    );
}
