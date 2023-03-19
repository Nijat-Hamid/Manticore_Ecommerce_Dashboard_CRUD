import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api/Api.jsx";
import { saveAs } from "file-saver";

const initialState = {
  jsonData: [],
  isLoading: false,
};

export const jsonDownload = createAsyncThunk(
  "jsonData/jsonDownload",
  async () => {
    const response = await Api.get("products.json", { responseType: "blob" })
    .then((response) =>{saveAs(response.data, "products.json")})
    return response.data;
  }
);



export const jsonSlice = createSlice({
    name: "json",
    initialState,
    extraReducers: {
      [jsonDownload.pending]: (state) => {
        state.isLoading = true;
      },
      [jsonDownload.fulfilled]: (state, action) => {
        state.isLoading = false;
      },
      [jsonDownload.rejected]: (state) => {
        state.isLoading = true;
      },
    },
  });
  
  export default jsonSlice.reducer;
