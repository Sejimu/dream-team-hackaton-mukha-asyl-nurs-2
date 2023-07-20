import React, { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { useSearchParams } from "react-router-dom";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LIMIT } from "../utils/consts";

function FilterMovies() {
  const { setPage } = useMovieContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [genres, setGenres] = useState(searchParams.get("genres") || "all");

  const handleChange = (event, newGenres) => {
    newGenres && setGenres(newGenres);
  };

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    if (genres === "all") {
      const { _limit, _page, q } = currentParams;
      setSearchParams({
        _limit: LIMIT,
        _page: _page || 1,
        q: q || "",
      });
    } else {
      setSearchParams({
        ...currentParams,
        genres,
      });
      setPage(1);
    }
  }, [genres]);

  return (
    <Box sx={{ maxWidth: "max-content", margin: " 30px auto" }}>
      <ToggleButtonGroup
        color="primary"
        value={genres}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="Classics">Classics</ToggleButton>
        <ToggleButton value="Science">Science</ToggleButton>
        <ToggleButton value="Young Adult">Young Adult</ToggleButton>
        <ToggleButton value="Fantasy">Fantasy</ToggleButton>
        <ToggleButton value="Historical">Historical</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default FilterMovies;
