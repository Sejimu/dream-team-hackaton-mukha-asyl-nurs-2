import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  async function addMovie(newMovie) {
    try {
      await axios.post(API, newMovie);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    state: state.movies,
    addMovie,
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}

export default MovieContext;
