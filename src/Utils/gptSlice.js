import { createSlice } from "@reduxjs/toolkit";
import GptSearch from "../components/GptSearch";

const gptSlice = createSlice(
    {
        name:'gpt',
        initialState : {
            showGptSearch : false,
           movieResults : null,
           movieNames : null,

        },
        reducers:{
            toggleGptSearchView : (state , action) => {
                state.showGptSearch = !state.showGptSearch;
            },
            addGptMovieResult : (state , action) => {
                const { movieNames , movieResults} = action.payload;
                state.movieNames = movieNames;
                state.movieResults = movieResults; 
            },
        },
    });

    export const { toggleGptSearchView , addGptMovieResult} = gptSlice.actions;


    export default gptSlice.reducer;