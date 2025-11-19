import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ id }) => {
  const trailerVideo = useSelector((store) => store?.movies?.trailerVideo);
  useMovieTrailer({ id });

  if (!trailerVideo) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className='w-full h-full overflow-hidden'>
      <iframe
        className='w-full h-full object-cover scale-150 sm:scale-125 md:scale-110 lg:scale-100'
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;