import React, { useRef, useState } from 'react';
import Header from './Header';
import { check } from '../Utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Utils/firebase';
import { Background_IMG } from '../Utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const Login = () => {
  const [isSignUp, setisSignUp] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const handlebutton = () => {
    const validation = check(email.current.value, password.current.value);
    setErrorMessage(validation);
    if (validation) return;
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            const { uid, displayName, email } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  const toggleSignInform = () => {
    setisSignUp(!isSignUp);
  }

  return (
    <div className="min-h-screen">
      <Header />
      {/* Background Image - Responsive */}
      <div className="fixed inset-0 -z-10">
        <img 
          src={Background_IMG} 
          className="w-full h-full object-cover"
          alt='background'
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 md:bg-opacity-40"></div>
      </div>

      {/* Form Container - Fully Responsive */}
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="w-11/12 sm:w-96 md:w-[450px] lg:w-[480px] absolute p-8 sm:p-10 md:p-12 bg-black bg-opacity-85 my-24 sm:my-28 md:my-32 lg:my-36 mx-auto left-0 right-0 rounded-lg text-white"
      >
        <h1 className='font-bold text-2xl sm:text-3xl py-3 sm:py-4'>
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        
        {isSignUp && (
          <input 
            ref={name} 
            type='text' 
            placeholder='Full Name' 
            className="p-3 sm:p-4 my-3 sm:my-4 w-full bg-gray-700 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600" 
          />
        )}
        
        <input 
          ref={email} 
          type='Email' 
          placeholder='Email Address' 
          className="p-3 sm:p-4 my-3 sm:my-4 w-full bg-gray-700 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600" 
        />
        
        <input 
          ref={password} 
          type='Password' 
          placeholder='Password' 
          className="p-3 sm:p-4 my-3 sm:my-4 w-full bg-gray-700 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600" 
        />
        
        {ErrorMessage && (
          <p className='text-red-500 font-semibold text-sm sm:text-base py-2 break-words'>
            {ErrorMessage}
          </p>
        )}
        
        <button
          onClick={handlebutton}
          className="p-3 sm:p-4 my-4 sm:my-6 bg-red-700 w-full rounded-lg font-semibold text-sm sm:text-base hover:bg-red-800 transition-colors"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        
        <p 
          onClick={toggleSignInform} 
          className="py-3 sm:py-4 cursor-pointer text-sm sm:text-base text-gray-300 hover:text-white transition-colors"
        >
          {isSignUp ? "Already have an account? Sign In" : "New to Netflix? Sign Up now"}
        </p>
      </form>
    </div>
  );
};

export default Login;