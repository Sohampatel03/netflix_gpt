import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lang from '../Utils/languageConstant';
import { generateGeminiContent } from '../Utils/gemini';
import { API_OPTIONS } from '../Utils/constants';
import { addGptMovieResult } from '../Utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    if (!movie) return [];

    const url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      encodeURIComponent(movie) +
      "&include_adult=false&language=en-US&page=1";

    const data = await fetch(url, API_OPTIONS);
    const json = await data.json();

    console.log("TMDB search for:", movie, json);

    return json.results || [];
  };

  const handleGptSearchClick = async () => {
    const queryText = searchText.current.value;

    if (!queryText) return;

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      queryText +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    // 👉 Gemini se plain text string milega
    const gptResults = await generateGeminiContent(gptQuery);
    console.log("Gemini response text:", gptResults);

    // 👉 Direct string ko split karo
    const gptMovies = gptResults
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    console.log("Parsed movie names:", gptMovies);

    // 👉 Har movie ke liye TMDB call
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log("TMDB results array:", tmdbResults);

    dispatch(
      addGptMovieResult({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      })
    );
  };

  return (
    <div className="pt-[50%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
