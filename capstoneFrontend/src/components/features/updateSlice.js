import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

// const token = useSelector((state) => state.register.token || state.login.token);
// const sessionToken = window.sessionStorage.getItem("Token");

// getProductById: builder.query({
//     query: (id) => `/store/product/${id}`,

// get user
const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/store/user/${id}`,
      }),
      providesTags: ["User"],
    }),

    // delete user
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/store/user/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, form }) => ({
        url: `/store/user/${id}`,
        method: "PUT",
        body: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const userSlice = createSlice({
  name: "users",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default userSlice.reducer;

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } =
  userApi;
