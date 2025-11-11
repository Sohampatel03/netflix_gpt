import { API_OPTIONS } from '../Utils/constants';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { addUpComingMovies} from '../Utils/movieSlice';



const useUpComingMovies = () => {
    
  const dispatch = useDispatch();
  const UpComingMovies = useSelector((store) => store.movies.UpComingMovies);
  
  const getUpComingMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
    const json = await data.json();
    console.log(json,"upcomg");
    dispatch(addUpComingMovies(json?.results));
  };
  
  
  useEffect(() => {
    !UpComingMovies && getUpComingMovies();
  } , []);

  };
  
  export default useUpComingMovies;