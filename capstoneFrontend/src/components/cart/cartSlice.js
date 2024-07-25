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

    // delete cart
    deleteCart: builder.mutation({
      query: ({ id }) => ({
        url: `/store/checkout/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),

    // update cart item
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
    // create cart
    createCart: builder.mutation({
      query: (credentials) => ({
        url: "/store/cart",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
    // add to cart
    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/store/cartItems/product/${id}`,
        method: "POST",
        body: {
          productId,
          quantity,
        },
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
  useAddToCartMutation,
} = getCartApi;
