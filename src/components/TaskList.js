import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get('/api/tasks', { headers: { 'x-auth-token': token } });
                setTasks(res.data);
            } catch (err) {
                console.error(err.response.data.msg);
            }
        };
        fetchTasks();
    }, [token]);

    const addTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/tasks', { title: newTask }, { headers: { 'x-auth-token': token } });
            setTasks([...tasks, res.data]);
            setNewTask('');
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const res = await axios.put(`/api/tasks/${id}`, {}, { headers: { 'x-auth-token': token } });
            setTasks(tasks.map(task => task._id === id ? res.data : task));
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`, { headers: { 'x-auth-token': token } });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nueva tarea"
                    required
                />
                <button type="submit">Añadir Tarea</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task._id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.title}
                        <button onClick={() => toggleComplete(task._id)}>
                            {task.completed ? 'Desmarcar' : 'Completar'}
                        </button>
                        <button onClick={() => deleteTask(task._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
