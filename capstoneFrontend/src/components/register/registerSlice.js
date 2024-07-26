import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/store/register",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setUser: (state, action) => {
      console.log("Setting user in login:", action.payload);
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      registerApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        const temp = JSON.parse(payload);
        console.log("Register response", temp);
        console.log(temp.cart);
        state.token = temp.token;
        state.user = temp;
        state.id = temp.id;
        state.cart = temp.cart;
        window.sessionStorage.setItem("Token", temp.token);
      }
    );
  },
});

export default registerSlice.reducer;

export const { useRegisterMutation } = registerApi;

export const { setCart } = registerSlice.actions;
