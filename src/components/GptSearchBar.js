import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../Utils/languageConstant';
import { generateGeminiContent } from '../Utils/gemini';
import { API_OPTIONS } from '../Utils/constants';
import { addGptMovieResult } from '../Utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    if (!movie) return [];

    const url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(movie) +
      "&include_adult=false&language=en-US&page=1";

    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();
    return json.results || [];
  };

  const handleGptSearchClick = async () => {
    const queryText = searchText.current.value;

    if (!queryText) return;

    setIsLoading(true);

    try {
      const gptQuery =
        "Act as a Movie Recommendation system and suggest some movies for the query : " +
        queryText +
        ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptResults = await generateGeminiContent(gptQuery);
      const gptMovies = gptResults
        .split(",")
        .map((m) => m.trim())
        .filter((m) => m.length > 0);

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: tmdbResults,
        })
      );
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-6 sm:py-8 md:py-12">
      <form
        className="w-full max-w-4xl bg-black bg-opacity-80 rounded-lg p-3 sm:p-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            ref={searchText}
            type="text"
            className="flex-1 p-3 sm:p-4 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder={lang[langKey].gptSearchPlaceholder}
            disabled={isLoading}
          />
          <button
            className={`py-3 sm:py-4 px-6 sm:px-8 bg-red-700 text-white rounded-md font-semibold text-sm sm:text-base transition-all hover:bg-red-800 flex items-center justify-center gap-2 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handleGptSearchClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              lang[langKey].search
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;