import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice';
import matchReducer from '../features/matchesSlice';
import messageReducer from '../features/messageSlice';

const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      matches: matchReducer,
      messages: messageReducer,
    },
  });

export default store;
