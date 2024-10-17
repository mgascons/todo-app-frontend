import React from 'react';

const Navbar = ({ token, setToken }) => {
    const handleLogout = () => {
        setToken(null);
    };

    return (
        <nav>
            <h1>Gestor de Tareas</h1>
            {token && <button onClick={handleLogout}>Cerrar sesión</button>}
        </nav>
    );
};

export default Navbar;
