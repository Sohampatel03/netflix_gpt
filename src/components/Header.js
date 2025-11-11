import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../Utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../Utils/userSlice';
import { toggleGptSearchView } from '../Utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../Utils/constants';
import { changeLanguage } from '../Utils/configSlice';

const Header = () => {
  const user = useSelector((store)=>store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
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
      const {uid , displayName , email} = user;
      dispatch(addUser({uid : uid , email : email , displayName : displayName}));
      navigate("/Browse");
    } else {
      dispatch(removeUser());
      navigate("/");
    }
  });

},[]);

const handleGptSearchClick = () => {
  dispatch(toggleGptSearchView());
};
const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
};

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
      <img 
      className = "w-44  mx-auto md:mx-0"
      src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
      alt="logo"/>
      {user && <div className='flex p-2 justify-between'>
       { showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select> }
        <button className='py-2 px-4 mx-4 my-2 bg-purple-700 text-white rounded-lg'
        onClick={handleGptSearchClick}>{showGptSearch ? "HomePage" : "GPT Search"}</button>
        <img  className=" hidden md:block w-12 h-12 " src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"></img>
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>
      }
    </div>
      
  );
}

export default Header;