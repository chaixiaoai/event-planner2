// store.js
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './venueSlice';
import avReducer from './avSlice';
import mealsSlice from './mealsSlice';

export default configureStore({
  reducer: {
    venue: venueReducer,
    av: avReducer,
    meal: mealsSlice,
  },
});
