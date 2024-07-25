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
  //   console.log(temp.token.email);
  state.token = temp.token.token;
  state.id = temp.token.id;
  state.cart = temp.token.cart;
  window.sessionStorage.setItem(TOKEN, temp.token);
}

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN),
    id: "",
    cart: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export default loginSlice.reducer;

export const { useLoginMutation } = loginApi;
