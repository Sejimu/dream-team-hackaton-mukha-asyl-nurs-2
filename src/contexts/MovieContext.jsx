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
    case ACTIONS.movie:
      return { ...state, movie: action.payload };

    default:
      return state;
  }
}

function MovieContext({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);


  async function getMovies() {
    try {
      const { data } = await axios.get(API);
      dispatch({
        type: "movies",
        payload: data,
      });
    } catch (error) {
      // notiFy("Failed to get movies.", "error");
      console.log(error);
    }
  }

  async function deleteMovies(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getMovies();
    } catch (error) {
      // notiFy("Failed to get movies.", "error");
      console.log(error);
    }
  }

  async function getOneMovie(id) {
    try {
      const { data } = await axios(`${API}/${id}`);
      dispatch({
        type: "movie",
        payload: data,
      });
    } catch (error) {
      // notiFy("Failed to get movies.", "error");
      console.log(error);
    }}
  async function addMovie(newMovie) {
    try {
      await axios.post(API, newMovie);
      navigate("/");
    } catch (e) {
      console.log(e);

    }
  }

  const value = {

    getMovies,
    movies: state.movies,
    deleteMovies,
    getOneMovie,

    
    addMovie,

  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}

export default MovieContext;
