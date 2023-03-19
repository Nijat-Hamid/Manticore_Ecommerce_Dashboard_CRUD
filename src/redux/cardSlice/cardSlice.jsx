import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardItems: [],
  cardTotalAmount: 0,
  invoice: false
};

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cardItems.push(action.payload);
      state.cardTotalAmount += action.payload.total;
    },
    deleteCard(state, action) {
      const removedCard = state.cardItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cardItems = removedCard;
      action.payload.total == undefined ? "" : state.cardTotalAmount -= action.payload.total
    },
  },

});

export const { addToCart, deleteCard } = cardSlice.actions;

export default cardSlice.reducer;
