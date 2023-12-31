import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import MovieContext from "./contexts/MovieContext";
import Toastify from "./components/Toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MovieContext>
      <Toastify />
      <App />
    </MovieContext>
  </BrowserRouter>
);
