import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  
  if (!movieNames) return null;

  return (
    <div className='mx-auto max-w-7xl'>
      <div className='bg-black bg-opacity-90 rounded-lg p-4 sm:p-6 md:p-8 mb-8 shadow-2xl'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6'>
          Recommended Movies
        </h2>
        
        <div className='space-y-6 sm:space-y-8'>
          {movieNames.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              movies={movieResults[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GptMovieSuggestion;