import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggestion';
import { Background_IMG } from '../Utils/constants';

const GptSearch = () => {
  return (
    <div className='min-h-screen relative'>
      {/* Background Image with overlay */}
      <div className="fixed inset-0 -z-10">
        <img 
          className="w-full h-full object-cover" 
          src={Background_IMG}
          alt='background'
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className='relative pt-20 sm:pt-24 md:pt-28 px-4 sm:px-6'>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;