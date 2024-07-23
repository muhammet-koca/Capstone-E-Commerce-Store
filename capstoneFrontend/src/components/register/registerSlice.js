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
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      registerApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        const temp = JSON.parse(payload);
        state.token = temp.token.token;
        state.email = temp.token.email;
        window.sessionStorage.setItem("Token", temp.token.token);
      }
    );
  },
});

export default registerSlice.reducer;

export const { useRegisterMutation } = registerApi;
