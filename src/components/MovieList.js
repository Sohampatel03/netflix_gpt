import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title , movies}) => {
  if (movies && movies.length > 0) {
  } else {
    console.log('No movies available');
  }
 
  return (
    <div className='px-6 overflow-hidden'>
       <h1 className='text-lg md:text-3xl py-4 text-white'>{title}</h1>
        <div className='flex overflow-x-auto scrollbar-hide'>
            <div className='flex space-x-4'>
            {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))
          ) : (
            <p>No movies available</p>
          )}
            </div>
        </div> 
    </div>
  )
}

export default MovieList;