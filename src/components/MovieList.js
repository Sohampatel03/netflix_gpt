import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className='py-4 sm:py-6 overflow-hidden'>
      <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold py-2 sm:py-3 md:py-4 text-white'>
        {title}
      </h1>
      
      {/* Scrollable container with custom scrollbar */}
      <div className='overflow-x-auto scrollbar-hide scroll-smooth'>
        <div className='flex gap-2 sm:gap-3 md:gap-4 pb-2'>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              posterPath={movie.poster_path} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;