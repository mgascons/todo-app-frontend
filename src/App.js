import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    return (
        <Router>
            <Navbar token={token} setToken={setToken} />
            <Routes>
                <Route path="/" element={!token ? <Auth setToken={saveToken} /> : <TaskList token={token} />} />
            </Routes>
        </Router>
    );
};

export default App;

