import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-0">
      <div className="max-w-full md:max-w-2xl lg:max-w-3xl space-y-3 sm:space-y-4 md:space-y-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white drop-shadow-2xl leading-tight">
          {title}
        </h1>
        
        {/* Overview - Hidden on mobile, visible on tablets and up */}
        <p className="hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl text-white drop-shadow-lg leading-relaxed line-clamp-3 md:line-clamp-4">
          {overview}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
          <button className="flex items-center gap-2 bg-white text-black py-2 px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-8 lg:py-4 lg:px-12 text-sm sm:text-base md:text-lg lg:text-xl font-semibold rounded hover:bg-opacity-80 transition-all duration-200 shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
          
          <button className="hidden sm:flex items-center gap-2 bg-gray-600 bg-opacity-70 text-white py-2 px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-8 lg:py-4 lg:px-12 text-sm sm:text-base md:text-lg lg:text-xl font-semibold rounded hover:bg-opacity-50 transition-all duration-200 shadow-lg">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoTitle;