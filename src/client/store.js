import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cart/cartSlice.js";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
