import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import AddMoviePage from "../pages/AddMoviePage";
import EditMoviePage from "../pages/EditMoviePage";
import NotFoundPage from "../pages/NotFoundPage";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddMoviePage />} />
        <Route path="/edit/:id" element={<EditMoviePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default MainRoute;
