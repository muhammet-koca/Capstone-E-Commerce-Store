import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const getCartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({ id }) => ({
        url: `/store/getcart/${id}`,
      }),
      providesTags: ["User"],
    }),

    // delete user
    deleteCart: builder.mutation({
      query: ({ id }) => ({
        url: `/store/checkout/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    // update user
    updateCart: builder.mutation({
      query: ({ id, form }) => ({
        url: `/store/product/cartitem/${id}`,
        method: "PUT",
        body: {
          product: form.product,
          quantity: form.quantity,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    createCart: builder.mutation({
      query: (credentials) => ({
        url: "/store/cart",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const cartSlice = createSlice({
  name: "cart",
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

export default cartSlice.reducer;

export const {
  useGetCartQuery,
  useDeleteCartMutation,
  useUpdateCartMutation,
  useCreateCartMutation,
} = getCartApi;
