import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS, API, LIMIT } from "../utils/consts";
import { notiFy } from "../components/Toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const movieContext = createContext();

export function useMovieContext() {
  return useContext(movieContext);
}

const init = {
  movies: [],
  movie: null,
  totalCount: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.movies:
      return { ...state, movies: action.payload };
    case ACTIONS.movie:
      return { ...state, movie: action.payload };
    case "totalCount":
      return { ...state, totalCount: action.payload };

    default:
      return state;
  }
}

function MovieContext({ children }) {
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, init);

  async function getMovies() {
    try {
      const { data, headers } = await axios.get(
        `${API}${window.location.search}`
      );
      const totalCounta = Math.ceil(headers["x-total-count"] / LIMIT);
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      dispatch({
        type: "movies",
        payload: sortedMovies,
      });
      dispatch({
        type: "totalCount",
        payload: totalCounta,
      });
    } catch (e) {
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function deleteMovies(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getMovies();
      notiFy("successful delete");
    } catch (e) {
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function getOneMovie(id) {
    try {
      const { data } = await axios(`${API}/${id}`);
      dispatch({
        type: "movie",
        payload: data,
      });
    } catch (e) {
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function addMovie(newMovie) {
    try {
      await axios.post(API, newMovie);
      navigate("/");
      notiFy("successful add");
    } catch (e) {
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function editMovie(id, newMovie) {
    try {
      let res = await axios.patch(`${API}/${id}`, newMovie);
      console.log(res);
      navigate("/");
      getMovies();
      notiFy("successful edit");
      console.log("success");
    } catch (e) {
      console.log(e);
      // notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  const value = {
    getMovies,
    editMovie,
    getOneMovie,
    movie: state.movie,
    movies: state.movies,
    deleteMovies,
    addMovie,
    page,
    setPage,
    totalCount: state.totalCount,
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}

export default MovieContext;
