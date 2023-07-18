import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMovieContext } from "../contexts/MovieContext";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const Cart = ({ item }) => {
  const navigate = useNavigate();
  const { deleteMovies } = useMovieContext();
  const spans = [];
  for (let i = 1; i <= item.rating; i++) {
    spans.push(<StarIcon sx={{ color: "yellow" }} />);
  }
  return (
    <div className="cart">
      <img
        width={100}
        src={item.image_url}
        alt="Product Image"
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-title">{item.title}</h2>
        <p className="product-description">{item.description}</p>
        <div className="star-rating">{spans}</div>
        <IconButton onClick={() => navigate(`/edit/${item.id}`)}>
          <EditIcon className="edit" />
        </IconButton>
        <IconButton onClick={() => deleteMovies(item.id)}>
          <DeleteIcon className="delete" />
        </IconButton>
      </div>
    </div>
  );
};

export default Cart;
