import { configureStore } from "@reduxjs/toolkit";
import { api } from "../app/api";
import registerReducer from "../components/register/registerSlice";
import loginReducer from "../components/login/loginSlice";
import homeReducer from "../components/home/homeSlice";
import adminReducer from "../components/admin/adminSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: registerReducer,
    login: loginReducer,
    products: homeReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
