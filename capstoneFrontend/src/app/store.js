import { configureStore } from "@reduxjs/toolkit";
import { api } from "../app/api";
import registerReducer from "../components/register/registerSlice";
import loginReducer from "../components/login/loginSlice";
import homeReducer from "../components/home/homeSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerReducer,
    login: loginReducer,
    products: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
