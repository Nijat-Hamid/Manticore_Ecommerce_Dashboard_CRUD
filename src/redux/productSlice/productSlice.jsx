import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api.jsx";

const initialState = {
  products: [],
  isLoading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await Api.get("products.json");
    return response.data;
  }
);

export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id,{ dispatch }) => {
    const response = await Api.delete(`products/${id}.json`).then((res)=> res);
    dispatch(fetchProducts());
  }
);

export const patchProducts = createAsyncThunk(
  "products/patchProducts",
  async(values,{dispatch}) =>{
    const response = await Api.patch(`products/${values.id}.json`,{
      id:`${values.id}`,
      image:`${values.image}`,
      name:`${values.name}`,
      category:`${values.category}`,
      config:{
        date:`${values.date}`,
        color:`${values.color}`,
        os:`${values.os}`,
        cpu:`${values.cpu}`,
        gpu:`${values.gpu}`,
        storage:`${values.storage}`,
        price:`${values.price}`,
      }
    }).then((res) => res);
    dispatch(fetchProducts());
    return response
  } 
)

export const addProducts = createAsyncThunk(
  "products/addProducts",
  async(values,{dispatch}) =>{
    const response = await Api.put(`products/${values.id}.json`,{
      category:`${values.category}`,
      id:`${values.id}`,
      name:`${values.name}`,
      config:{
        date:`${values.date}`,
        color:`${values.color}`,
        os:`${values.os}`,
        cpu:`${values.cpu}`,
        gpu:`${values.gpu}`,
        storage:`${values.storage}`,
        price:`${values.price}`,
      }
    }).then((res) => res);
    dispatch(fetchProducts());
    return response
  }
)

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    [fetchProducts.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export default productSlice.reducer;
