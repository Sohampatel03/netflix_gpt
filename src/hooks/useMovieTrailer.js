import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../Utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../Utils/constants";

const useMovieTrailer = ({id}) => {
    const dispatch = useDispatch();

    const TrailerVideo = useSelector((store) => store.movies.TrailerVideo);
    
    const getMoviesVideos = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/"+ id +"/videos?language=en-US", API_OPTIONS);
        const json = await data.json();
        console.log(json,"video");
        const filterdata = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterdata.length ? filterdata[0] : json.results[0]; 
        dispatch(addTrailerVideo(trailer));
    }; 

    useEffect(() => {
       !TrailerVideo && getMoviesVideos();
 
    }, []);

}

export default useMovieTrailer;