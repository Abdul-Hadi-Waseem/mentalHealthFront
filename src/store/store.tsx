import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/UserSlice';
// import dateTimeSlice from './slices/dateTimeSlice';
// import chartDownloadSlice from './slices/chartDownloadSlice';
// import userSlice from './slices/userSlice';
// import windowScrollSlice from './slices/windowScrollSlice';
// import inputDataSlice from './slices/inputDataSlice';

export default configureStore({
  reducer: {
    user: userSlice
    // dateTime: dateTimeSlice,   
    // chartName: chartDownloadSlice,
    // userSlice: userSlice,
    // windowScroll: windowScrollSlice,
    // inputData: inputDataSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
