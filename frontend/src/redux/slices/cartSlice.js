import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0, // ✅ Added
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // ✅ Recalculate totalItems
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      // ✅ Recalculate totalItems
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0; // ✅ Reset
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
