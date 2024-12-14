import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center'>
            <img src='/icon.jpeg' alt='icon' className='flex items-center space-x-2 shadow-xl h-12 w-31'/>
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            {authUser &&
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className='flex items-center space-x-2 focus:outline-none'
                >
                  <img
                    src={authUser.image || '/avatar.png'}
                    className='h-12 w-12 object-cover rounded-full border-2 border-white'
                    alt='User avatar'
                  />
                  <span className='text-white font-medium text-lg'>{authUser.name}</span>
                </button>
                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
                    <Link
                      to='/profile'
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className='mr-2' size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={() => dispatch(logout())}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
                    >
                      <LogOut className='mr-2' size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
