import { configureStore } from "@reduxjs/toolkit";
import { api } from "../app/api";
import registerReducer from "../components/register/registerSlice";
import loginReducer from "../components/login/loginSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    //verify names
    register: registerReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
