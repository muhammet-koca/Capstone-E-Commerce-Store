// delete user
    // deleteUser: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/api/user/users/${id}`,
    //     method: "DELETE",
    //     responseHandler: (response) => response.text(),
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // update user
    // updateUser: builder.mutation({
    //   query: ({ id, form }) => ({
    //     url: `/api/user/users/${id}`,
    //     method: "PUT",
    //     body: {
    //       firstName: form.firstName,
    //       LastName: form.LastName,
    //       email: form.email,
    //       password: form.password,
    //     },
    //     responseHandler: (response) => response.text(),
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // const userSlice = createSlice({
//   name: "users",
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       api.endpoints.getUsers.matchFulfilled,
//       (state, { payload }) => {
//         return JSON.parse(payload);
//       }
//     );
//   },
// });

// export default userSlice.reducer;