import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { disconnectSocket, initializeSocket } from '../socket/socketClient';

export const signup = createAsyncThunk('auth/signup', async (signupData, { rejectWithValue }) => {
  try {
    
    const res = await axiosInstance.post('/auth/signup', signupData);
    initializeSocket(res.data.user._id);
    toast.success('Account created successfully');
    return res.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const login = createAsyncThunk('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/login', loginData);
    initializeSocket(res.data.user._id);
    toast.success('Logged in successfully');
    return res.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/auth/logout');
    disconnectSocket();
    if (res.status === 200) return true;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Something went wrong');
    return rejectWithValue(error.response?.data?.message);
  }
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/auth/profile');
    initializeSocket(res.data.user._id);
    return res.data.user;
  } catch (error) {
    toast.error('Failed to verify authentication');
    return rejectWithValue(error.response?.data?.message || 'Failed to verify authentication');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authUser: null,
    checkingAuth: true,
    loading: false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.loading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
        state.checkingAuth = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.checkingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.checkingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authUser = null;
        state.checkingAuth = false;
      });
  },
});

export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
