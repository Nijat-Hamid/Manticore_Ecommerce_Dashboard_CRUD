import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardSlice/cardSlice.jsx";
import productReducer from "./productSlice/productSlice.jsx";
import jsonReducer from "./jsonSlice/jsonSlice.jsx"
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cardReducer,
    json:jsonReducer
  },
});
