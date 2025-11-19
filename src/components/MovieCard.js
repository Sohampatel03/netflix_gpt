import React from 'react';
import { IMG_CDN } from '../Utils/constants';

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  
  return (
    <div className='flex-shrink-0 w-28 sm:w-36 md:w-44 lg:w-48 transition-transform duration-300 hover:scale-105 cursor-pointer group'>
      <div className='relative overflow-hidden rounded-md shadow-lg'>
        <img 
          alt='Movie Card'
          src={IMG_CDN + posterPath}
          className='w-full h-auto object-cover'
          loading="lazy"
        />
        {/* Hover overlay effect */}
        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300'></div>
      </div>
    </div>
  );
};

export default MovieCard;