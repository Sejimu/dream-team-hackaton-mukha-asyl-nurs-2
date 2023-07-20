import React, { useEffect } from "react";
import MovieList from "../components/MovieList";
import { Box, Pagination } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../utils/consts";

function HomePage() {
  const { getMovies, page, setPage, totalCount } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getMovies();
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({});
    setSearchParams({
      ...currentParams,
      _page: page,
      _limit: LIMIT,
    });
  }, [page]);
  return (
    <>
      <MovieList />;
      <Box sx={{ margin: "30px auto", maxWidth: "max-content" }}>
        <Pagination
          color="error"
          count={totalCount}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </>
  );
}

export default HomePage;
