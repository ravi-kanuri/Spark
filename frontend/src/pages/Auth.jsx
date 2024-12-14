import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';


const Auth = () => {
    const [signIn,setSignin]=useState(true);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-700 to-blue-200">
    <h2 className="text-2xl font-bold text-white mb-4">
      {signIn ? "Create an Amoria account" : "Log into Amoria"}
    </h2>
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="text-black ">
        {signIn ? <SigninForm /> : <LoginForm />}
        </div>
        <button
            className="text-l text-gray-600 mt-6 px-10 py-3 cursor-pointer"
            onClick={() => setSignin(!signIn)}
          >
            {signIn ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
      
      </div>
    </div>
  </div>
  );
}

export default Auth;
