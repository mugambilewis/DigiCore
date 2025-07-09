import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,         // Holds user object: { name, email, role }
  isLoggedIn: false,  // Auth state
  loading: false,     // Optional: useful for form spinners
  error: null,        // Optional: error feedback
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser
} = userSlice.actions;

export default userSlice.reducer;
