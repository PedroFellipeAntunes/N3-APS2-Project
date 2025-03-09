import { useState, useEffect } from 'react';

import { getUser } from '../../services/api';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

import { SignUp } from '../../components/login_signup/sign_up';
import { Login } from '../../components/login_signup/login';

import './index.css';

export default function LoginPage() {
    useEffect(() => {
        async function loadUser() {
            try {
                
            } catch (error) {
                console.error("Erro ao carregar usuario:", error);
            }
        }

        loadUser();
    }, []);

    return (
        <>
            <Header />
            <main className='login_main'>
                <SignUp />
                <Login />
            </main>
            <Footer />
        </>
    );
}
