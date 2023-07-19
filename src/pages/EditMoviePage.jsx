import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMovieContext } from "../contexts/MovieContext";
import { useParams } from "react-router-dom";

const defaultTheme = createTheme();

export default function EditMoviePage() {
  const { editMovie, getOneMovie, movie } = useMovieContext();
  const { id } = useParams();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    image_url: "",
    rating: "",
  });

  useEffect(() => {
    getOneMovie(id);
  }, [getOneMovie, id]);

  useEffect(() => {
    if (movie) {
      setFormValue({
        title: movie.title,
        description: movie.description,
        image_url: movie.image_url,
        rating: movie.rating.toString(), // Convert rating to string
      });
    }
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.description.trim() ||
      !formValue.image_url.trim() ||
      !formValue.rating
    ) {
      alert("Please fill in all inputs");
      return;
    }

    editMovie(id, { ...formValue, rating: +formValue.rating });

    setFormValue({
      title: "",
      description: "",
      image_url: "",
      rating: "",
    });
  };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

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
            Edit Movie
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
              label="Description"
              value={formValue.description}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="image_url"
              label="Image URL"
              value={formValue.image_url}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                label="Rating"
                name="rating"
                onChange={handleChange}
                value={formValue.rating}
              >
                <MenuItem value={"1"}>1 star</MenuItem>
                <MenuItem value={"2"}>2 stars</MenuItem>
                <MenuItem value={"3"}>3 stars</MenuItem>
                <MenuItem value={"4"}>4 stars</MenuItem>
                <MenuItem value={"5"}>5 stars</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
