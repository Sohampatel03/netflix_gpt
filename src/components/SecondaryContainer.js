import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  
  return (
    <div className='bg-black'>
      <div className='mt-0 md:-mt-32 lg:-mt-52 px-4 sm:px-6 md:px-8 lg:px-12 relative z-20 pb-8 md:pb-12'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={movies.PopularMovies} />
        <MovieList title={"Top Rated"} movies={movies.TopRatedMovies} />
        <MovieList title={"Upcoming"} movies={movies.UpComingMovies} />
      </div>
    </div>
  );
}

export default SecondaryContainer;