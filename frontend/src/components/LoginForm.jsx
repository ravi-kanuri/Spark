import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
            />
            
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
            />
            
            <button
          className="mt-6 px-6 py-3 w-full h-13 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Log In
        </button>
        </form>
    );
}

export default LoginForm;
