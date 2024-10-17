import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
    const [isRegister, setIsRegister] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegister ? 'register' : 'login';
        try {
            const res = await axios.post(`/api/auth/${endpoint}`, { username, password });
            setToken(res.data.token);
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div>
            <h2>{isRegister ? 'Registrar' : 'Iniciar sesión'}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">{isRegister ? 'Registrar' : 'Iniciar sesión'}</button>
            </form>
            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
        </div>
    );
};

export default Auth;
