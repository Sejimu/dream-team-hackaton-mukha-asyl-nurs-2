import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../utils/consts";

const movieContext = createContext();

export function useMovieContext() {
  return useContext(movieContext);
}

const init = {
  movies: [],
  movie: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.movies:
      return { ...state, movies: action.payload };

    default:
      return state;
  }
}

function MovieContext({ children }) {
  const [state, dispatch] = useReducer(reducer, init);
  const value = { state: state.movies };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}

export default MovieContext;
