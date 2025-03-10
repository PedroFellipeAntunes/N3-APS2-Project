import { createUser } from "../../services/api";
import { useState } from "react";
import { formatCPF, formatCEP } from "../../services/formatData";

import "./index.css";

export function SignUp( {setIsSignUp} ) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpf: "",
        cep: "",
    });

    const [errors, setErrors] = useState({
        cpf: "",
        cep: "",
    });

    const [passwordVisible, setPasswordVisible] = useState(false); // Estado para controlar a visibilidade da senha

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "cpf") {
            setUser((prevUser) => ({ ...prevUser, cpf: formatCPF(value) }));
        } else if (name === "cep") {
            setUser((prevUser) => ({ ...prevUser, cep: formatCEP(value) }));
        } else {
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        }
    };

    const validateCPF = (cpf) => {
        const formattedCPF = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos

        if (formattedCPF.length !== 11) {
            setErrors((prevErrors) => ({ ...prevErrors, cpf: "CPF inválido" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, cpf: "" }));
        }
    };

    const validateCEP = async (cep) => {
        const formattedCEP = cep.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (formattedCEP.length !== 8) {
            setErrors((prevErrors) => ({ ...prevErrors, cep: "CEP inválido" }));
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${formattedCEP}/json/`);
            const data = await response.json();

            if (data.erro) {
                setErrors((prevErrors) => ({ ...prevErrors, cep: "CEP não encontrado" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, cep: "" }));
            }
        } catch {
            setErrors((prevErrors) => ({ ...prevErrors, cep: "Erro ao buscar CEP" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user.name || !user.email || !user.password || !user.cpf || !user.cep) {
            alert("Preencha todos os campos.");
            return;
        }

        // Validação de CPF e CEP antes de enviar
        validateCPF(user.cpf);
        await validateCEP(user.cep);
    
        if (errors.cpf || errors.cep) {
            alert("Corrija os erros antes de enviar.");
            return;
        }

        let response = await createUser(user); // Agora esperamos a resposta do backend
        
        if (response.data.message) {
            alert(response.data.message);
            return;
        }
        
        if (response.status !== 200) {
            alert("Não foi possivel criar usuario");
            return;
        }

        alert("Cadastro realizado com sucesso!");
        setIsSignUp(false);
    };

    return (
        <form className="login-signup-form" onSubmit={handleSubmit}>
            <section>
                <label>
                    Nome:
                    <input type="text" name="name" value={user.name} onChange={handleChange} required />
                </label>

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
                            minLength={8}
                            maxLength={16}
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

            <section>
                <label>
                    CPF:
                    <input
                        type="text"
                        name="cpf"
                        value={user.cpf}
                        onChange={handleChange}
                        onBlur={() => validateCPF(user.cpf)}
                        maxLength={11+3}
                        placeholder="000.000.000-000"
                        required
                    />
                </label>
                {errors.cpf && <p className="error">{errors.cpf}</p>}
            </section>

            <section>
                <label>
                    CEP:
                    <input
                        type="text"
                        name="cep"
                        value={user.cep}
                        onChange={handleChange}
                        onBlur={() => validateCEP(user.cep)}
                        maxLength={8+1}
                        placeholder="00000-000"
                        required
                    />
                </label>
                {errors.cep && <p className="error">{errors.cep}</p>}
            </section>

            <button type="submit">Cadastrar</button>
        </form>
    );
}
