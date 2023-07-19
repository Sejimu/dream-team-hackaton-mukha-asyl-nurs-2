import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
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
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      dispatch({
        type: "movies",
        payload: sortedMovies,
      });
<<<<<<< HEAD
    } catch (e) {
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
=======
    } catch (error) {
      console.log(error);
>>>>>>> 51d43371d2c3c7f475c59ffc5e759028509dc15a
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

    }
  }

    }}
  async function addMovie(newMovie) {
    try {
      await axios.post(API, newMovie);
      navigate("/");
      notiFy("successful add");
    } catch (e) {
<<<<<<< HEAD
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
=======
      console.log(e);
>>>>>>> 51d43371d2c3c7f475c59ffc5e759028509dc15a
    }
  }

  async function editMovie(id, newMovie) {
    try {
      await axios.patch(`${API}/${id}`, newMovie);
      navigate("/");
<<<<<<< HEAD
      notiFy("successful edit");
    } catch (e) {
      notiFy(`${e.response.status}: ${e.response.statusText}`, "error");
=======
    } catch (e) {
      console.log(e);
>>>>>>> 51d43371d2c3c7f475c59ffc5e759028509dc15a
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
  };
  return (
    <movieContext.Provider value={value}>{children}</movieContext.Provider>
  );
}

export default MovieContext;
