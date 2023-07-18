import React from "react";
import { ToastContainer, toast } from "react-toastify";

export function notiFy(msg, type = "success") {
  return toast.success(msg, { type: type });
}

const Toastify = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toastify;
