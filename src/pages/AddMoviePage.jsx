import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddMoviePage() {
  const { addMovie } = useMovieContext();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    image_url: "",
    rating: "",
    genres: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.description.trim() ||
      !formValue.image_url.trim() ||
      !formValue.rating.trim() ||
      !formValue.genres.trim()
    ) {
      alert("fill all inputs");
      return;
    }

    addMovie({ ...formValue, rating: +formValue.rating });

    setFormValue({
      title: "",
      description: "",
      image_url: "",
      rating: "",
      genres: "",
    });
  };

  function handleChange(e) {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            New Movie
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              autoFocus
              value={formValue.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="description"
              value={formValue.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image_url"
              label="image_url"
              value={formValue.image_url}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>rating</InputLabel>
              <Select
                label="rating"
                name="rating"
                onChange={handleChange}
                value={formValue.rating}
              >
                <MenuItem value={"1"}>1 star</MenuItem>
                <MenuItem value={"2"}>2 star</MenuItem>
                <MenuItem value={"3"}>3 star</MenuItem>
                <MenuItem value={"4"}>4 star</MenuItem>
                <MenuItem value={"5"}>5 star</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>genres</InputLabel>
              <Select
                label="genres"
                name="genres"
                onChange={handleChange}
                value={formValue.genres}
              >
                <MenuItem value={"Historical"}>Historical</MenuItem>
                <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
                <MenuItem value={"Classics"}>Classics</MenuItem>
                <MenuItem value={"Young Adult"}>Young Adult</MenuItem>
                <MenuItem value={"Science"}>Science</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add new Movie
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
