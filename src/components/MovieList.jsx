import React, { useEffect } from "react";
import MovieItem from "./MovieItem";
import { useMovieContext } from "../contexts/MovieContext";

function MovieList() {
  const { getMovies, movies } = useMovieContext();
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="cartHolder">
      {movies.map((item, i) => {
        return <MovieItem key={i} item={item} />;
      })}
    </div>
  );
}

export default MovieList;
