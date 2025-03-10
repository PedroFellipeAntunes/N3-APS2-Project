import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

import { UserInfo } from '../../components/user_info/user_info';

// import jwt_decode from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';

import './index.css';

export default function Account() {
    const token = localStorage.getItem("user");
    const navigate = useNavigate();

    // Verifique se existe um token de usuário, se não existir volte para home
    useEffect(() => {
        if (!token) {
        navigate("/");
        }
    }, [token]);

    const [offers, setOffers] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        async function loadUserData() {
            const token = localStorage.getItem("user");

            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }
        }

        loadUserData();
    }, []);

    useEffect(() => {
        console.log(offers);
    }, [offers]); // Executa quando `offers` muda
    

    return (
        <>
            <Header />
            <main className='account_main'>
                <UserInfo user={user} offers={offers} setOffers={setOffers} />
            </main>
            <Footer />
        </>
    );
}
