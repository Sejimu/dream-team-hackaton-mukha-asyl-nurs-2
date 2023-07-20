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
    spans.push(<StarIcon key={i} sx={{ color: "yellow" }} />);
  }
  const handleImageError = (e) => {
    // e.target.src =
    //   "https://yandex.ru/images/search?text=default+avatar&img_url=https%3A%2F%2Fwww.gowpala.org%2Fassets%2Fuploads%2Ftestimonials%2Fdefault.jpg&pos=1&rpt=simage&stype=image&lr=10309&parent-reqid=1689756382327437-627309941162800036-balancer-l7leveler-kubr-yp-sas-23-BAL-7134&source=serp";
  };

  return (
    <div className="cart">
      <img
        src={item.image_url}
        onError={handleImageError}
        alt="Product Image"
      />
      <h1>{item.title}</h1>
      <p>{item.description.slice(0, 80)}...</p>
      <p>{item.genres}</p>
      <div className="star-rating">{spans}</div>
      <IconButton onClick={() => navigate(`/edit/${item.id}`)}>
        <EditIcon className="edit" />
      </IconButton>
      <IconButton onClick={() => deleteMovies(item.id)}>
        <DeleteIcon className="delete" />
      </IconButton>
    </div>
  );
};

export default Cart;
