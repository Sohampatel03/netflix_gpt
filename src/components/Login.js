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
  const password= useRef(null);

  const name= useRef(null);
  const dispatch = useDispatch();

  const handlebutton = () => {
    const validation = check(email.current.value, password.current.value);
    setErrorMessage(validation);
    if (validation) return;
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value
          }).then(() => {
            const {uid , displayName , email} = auth.currentUser;
            dispatch(addUser({uid : uid , email : email , displayName : displayName}));
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
      //sign In
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
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
    <div>
      <Header />
      <div className="absolute">
        <img src={Background_IMG} ssName="h-screen object-cover"
          alt='logo'></img>
      </div>
      <form onSubmit={(e) =>
        e.preventDefault()
      } className='w-full md:w-3/12 absolute p-12 bg-black bg-opacity-80  my-36 mx-auto left-0 right-0 rounded-lg text-white'>
        <h1 className='font-bold text-3xl py-4 rounded-lg'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
        {isSignUp && <input ref={name} type='text' placeholder='Full Name'  className="p-4 my-4 w-full bg-gray-700" />}
        <input ref={email} type='Email' placeholder='Email Address'  className="p-4 my-4 w-full bg-gray-700" />
        <input ref={password} type='Password' placeholder='Password'  className="p-4 my-4 w-full bg-gray-700" />
        <p className='text-red-600 font-bold text-lg py-2'>{ErrorMessage}</p>
        <button
        onClick={handlebutton}
         className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignUp ? "Sign Up" : "Sign In"}</button>
        {isSignUp ?
          <p onClick={toggleSignInform} className="py-4 cursor-pointer">Old User? Sign In</p> :
          <p onClick={toggleSignInform} className="py-4 cursor-pointer">New User? Sign Up</p>}
      </form>
    </div>
  );
};

export default Login;