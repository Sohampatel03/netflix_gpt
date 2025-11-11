import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { Background_IMG } from '../Utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className="fixed -z-10">
    <img className="h-screen object-cover md:h-auto" src={Background_IMG}
      alt='logo'></img>
  </div>
    <div className=''>
          <GptSearchBar/>
          <GptMovieSuggestion/>
    </div>
    </>
  );
};

export default GptSearch