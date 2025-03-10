import { useState } from 'react';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { SignUp } from '../../components/login_signup/sign_up';
import { Login } from '../../components/login_signup/login';
import './index.css';

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <>
            <Header />
            <main className='login_main'>
                {isSignUp ? (
                    <>
                        <p>Já tem uma conta? <button className='change-login' onClick={() => setIsSignUp(false)}>Fazer Login</button></p>
                        <SignUp setIsSignUp={setIsSignUp} />
                    </>
                ) : (
                    <>
                        <p>Não tem uma conta? <button className='change-login' onClick={() => setIsSignUp(true)}>Cadastre-se</button></p>
                        <Login />
                    </>
                )}
            </main>
            <Footer />
        </>
    );
}
