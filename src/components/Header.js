import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { toggleGptSearchView } from '../Utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../Utils/constants';
import { changeLanguage } from '../Utils/configSlice';

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/Browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    setShowMobileMenu(false);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-gradient-to-b from-black z-10 flex flex-row justify-between items-center">
      {/* Logo */}
      <img
        className="w-28 sm:w-36 md:w-44"
        src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt="logo"
      />

      {user && (
        <div className='flex items-center gap-2 sm:gap-3'>
          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-3'>
            {showGptSearch && (
              <select 
                className='p-2 bg-gray-900 text-white rounded text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600'
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            
            <button
              className='py-2 px-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors text-sm'
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            <img
              className="w-10 h-10 rounded"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="avatar"
            />

            <button
              onClick={handleSignOut}
              className='font-bold text-white hover:text-red-500 transition-colors text-sm'
            >
              Sign Out
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className='md:hidden p-2 text-white'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile/Tablet Dropdown Menu */}
          {showMobileMenu && (
            <div className='md:hidden absolute top-full right-4 mt-2 bg-black bg-opacity-95 rounded-lg shadow-lg py-3 px-4 min-w-[200px] border border-gray-800'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3 pb-3 border-b border-gray-700'>
                  <img
                    className="w-10 h-10 rounded"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="avatar"
                  />
                  <span className='text-white text-sm font-medium truncate max-w-[120px]'>
                    {user.displayName || user.email}
                  </span>
                </div>

                {showGptSearch && (
                  <select
                    className='p-2 bg-gray-900 text-white rounded text-sm cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-purple-600'
                    onChange={handleLanguageChange}
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang.identifier} value={lang.identifier}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  className='py-2 px-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors text-sm w-full'
                  onClick={handleGptSearchClick}
                >
                  {showGptSearch ? "Home" : "GPT Search"}
                </button>

                <button
                  onClick={handleSignOut}
                  className='py-2 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm w-full'
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;