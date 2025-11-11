import { API_OPTIONS } from '../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { addPopularMovies } from '../Utils/movieSlice';



const usePopularMovies = () => {
    
  const dispatch = useDispatch();
  const PopularMovies = useSelector((store) => store.movies.PopularMovies);
  
  const getPopularMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json = await data.json();
    console.log(json,"popular");
    dispatch(addPopularMovies(json?.results));
  };
  
  
  useEffect(() => {
    !PopularMovies && getPopularMovies();
  } , []);

  };
  
  export default usePopularMovies;