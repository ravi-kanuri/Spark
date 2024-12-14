import React, { useRef, useState } from 'react';  
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/userSlice'; 

const Profile = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const loading = useSelector((state) => state.user.loading);
  

  const [userDetails, setUserDetails] = useState({
    name: authUser.name || "",
    bio: authUser.bio || "",
    age: authUser.age || "",
    gender: authUser.gender || "",
    image: authUser.image || "",
});

const fileInputRef = useRef(null);

  const updateUserDetails = (key, value) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [key]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserDetails('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(userDetails));
    //console.log(userDetails);
  };

 
  
  

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header/>
      <div className='flex-grow flex flex-col justify-center py-4 px-1 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-3 text-center text-3xl font-extrabold text-gray-900'>Your Profile</h2>
        </div>
        <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* NAME */}
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <div className='mt-1'>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    required
                    value={userDetails.name}
                    onChange={(e) => updateUserDetails("name", e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm'
                  />
                </div>
              </div>

              {/* AGE */}
              <div>
                <label htmlFor='age' className='block text-sm font-medium text-gray-700'>
                  Age
                </label>
                <div className='mt-1'>
                  <input
                    id='age'
                    name='age'
                    type='number'
                    required
                    value={userDetails.age}
                    onChange={(e) => updateUserDetails("age", e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm'
                  />
                </div>
              </div>

              {/* GENDER */}
              <div>
                <span className='block text-sm font-medium text-gray-700 mb-2'>Gender</span>
                <div className='flex space-x-4'>
                  {["Male", "Female"].map((option) => (
                    <label key={option} className='inline-flex items-center'>
                      <input
                        type='radio'
                        className='form-radio text-pink-600'
                        name='gender'
                        value={option.toLowerCase()}
                        checked={userDetails.gender === option.toLowerCase()}
                        onChange={() => updateUserDetails("gender", option.toLowerCase())}
                      />
                      <span className='ml-2'>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BIO */}
              <div>
                <label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
                  Bio
                </label>
                <div className='mt-1'>
                  <textarea
                    id='bio'
                    name='bio'
                    rows={3}
                    value={userDetails.bio}
                    onChange={(e) => updateUserDetails("bio", e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm'
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>Cover Image</label>
                <div className='mt-1 flex items-center'>
                  <button
                    type='button'
                    onClick={() => fileInputRef.current.click()}
                    className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400'
                  >
                    Upload Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {userDetails.image && (
                   <div className='mt-4'>
                    <img src={userDetails.image} alt='User profile' className='w-48 h-full object-cover rounded-md' />
                     </div>
                )}

              {/* SUBMIT BUTTON */}
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400'
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
