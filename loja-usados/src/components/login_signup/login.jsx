import { useNavigate } from 'react-router-dom';
import { verifyUser } from "../../services/api";
import { useState } from "react";

import "./index.css";

import axios from 'axios';

export function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user.email || !user.password) {
            alert("Preencha todos os campos.");
            return;
        }

        // console.log(user)

        let response = await verifyUser(user);

        if (response) {
            navigate("/");
            localStorage.setItem("user", response);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
        } else {
            alert("Login falhou");
        }
        // console.log(response);
    };

    return (
        <form className='login-signup-form' onSubmit={handleSubmit}>
            <section>
                <label>
                    E-mail:
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="email@dominio.com" required />
                </label>

                <label>
                    Senha:
                    <div className='password-div'>
                        <input
                            type={passwordVisible ? "text" : "password"} // Alterna entre mostrar e ocultar a senha
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                        <button 
                            className='show-pass'
                            type="button" 
                            onClick={() => setPasswordVisible(!passwordVisible)} // Altera a visibilidade da senha
                        >
                            {passwordVisible ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </label>
            </section>

            <button type="submit">Login</button>
        </form>
    );
}
