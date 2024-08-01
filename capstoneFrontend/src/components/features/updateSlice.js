import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

// get user
const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `/store/user/${id}`,
      }),
      providesTags: ["User"],
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

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
