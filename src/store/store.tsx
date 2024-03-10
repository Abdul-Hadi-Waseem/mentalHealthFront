import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./slices/UserSlice"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
  // reducer: {
  //   user: userSlice
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
