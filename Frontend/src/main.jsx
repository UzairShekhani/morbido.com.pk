import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDbZjILZ_-8uNlUCyLvq4-ACFMDyKkw-z0";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
    <CartProvider>
      <App />
    </CartProvider>
  </LoadScript>
);
