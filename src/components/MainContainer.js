import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);
  
  if (movies === null) return null;
  
  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  
  return (
    <div className="relative w-full">
      {/* Video Background Container */}
      <div className="relative w-full pt-[56.25%] md:pt-0 md:h-screen bg-black">
        <div className="absolute inset-0">
          <VideoBackground id={id} />
        </div>
        
        {/* Gradient Overlays for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        
        {/* Video Title Overlay */}
        <div className="absolute inset-0">
          <VideoTitle title={original_title} overview={overview} />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;