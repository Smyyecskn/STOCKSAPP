import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
// import storage from 'redux-persist/lib/storage' //! defaults to localStorage
import storage from "redux-persist/lib/storage/session"; // session storage

//!uygulamayı kalıcı hale getirmek için önce persist yukleriz. Yani persister login bilgilerini session storage'da tutuyor.Sonra 4-9 ve 19. 24. satırları alıyoruz npm persistten. Sonra 42de dışarıya açtık ve app.js de 24de PersistGate komp çağırdık.

const persistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // root reducerı sadece authtda kullanmak istedik user bilgisini sessionda sakladık.
    stock: stockReducer,
  },
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
