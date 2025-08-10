// src/redux/actions/authActions.js
import axiosInstance from '@/lib/axios';
import { loginSuccess } from '../slices/authSlice';

export const fetchLoggedInUser = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/auth/me'); // Axios already has credentials:true
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error('Failed to fetch logged-in user:', err.response?.data || err.message);
  }
};
