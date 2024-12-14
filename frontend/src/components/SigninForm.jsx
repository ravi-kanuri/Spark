import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/authSlice';

const SigninForm = () => {
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
          age: "", 
         gender: "",
         bio:"",
    });
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData));
    };
  return (
    <form onSubmit={handleSubmit}>
         <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
            />
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
             <label htmlFor="age" className="block mb-2 text-sm font-medium text-black">Age</label>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Age"
                required
                min={18}
            />
           <label className="block mb-2 text-sm font-medium text-black">Gender</label>
    <div className="flex items-center mb-4">
        <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
            className="mr-2"
        />
        <label htmlFor="male" className="mr-4">Male</label>
        <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
            className="mr-2"
        />
        <label htmlFor="female">Female</label>
    </div>
    <label htmlFor="bio" className="block mb-2 text-sm font-medium text-black h-6">Bio</label>
            <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write about you"
                required
            />
       <button
                type="submit"
                className="mt-6 px-6 py-3 w-full h-13 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                disabled={loading}
            >
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
    </form>
  );
}

export default SigninForm;
