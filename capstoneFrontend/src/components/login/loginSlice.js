import { api } from "../../app/api";
import { createSlice } from "@reduxjs/toolkit";

const TOKEN = "Token";

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/store/login",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
  }),
});

function storeToken(state, { payload }) {
  console.log(payload);

  const temp = JSON.parse(payload);
  state.token = temp.token.token;
  state.id = temp.token.id;
  state.user = temp.token;
  state.isAdmin = temp.token.isAdmin;
  window.sessionStorage.setItem("isAdmin", temp.token.isAdmin);
  window.sessionStorage.setItem(TOKEN, temp.token.token);
  window.sessionStorage.setItem("User", temp.token.id);
  window.sessionStorage.setItem("Cart", temp.token.cart.id);
}

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN),
    id: "",
    cart: {},
    isAdmin: "" || false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export default loginSlice.reducer;

export const { useLoginMutation } = loginApi;
