import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const getCartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({id}) => ({
        url: `/store/getCart/${id}`,
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
        url: `/store/product/cartItem/${id}`,
        method: "PUT",
        body: form,
        // {
        //   product: form.product,
        //   quantity: form.quantity,

        // },
        // responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    // create cart
    createCart: builder.mutation({
      query: (id) => ({
        url: "/store/cart",
        method: "POST",
        body: { usersId: id },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    // add to cart
    addToCart: builder.mutation({
      query: ({ id, cartId }) => ({
        url: `/store/cartItems/product/${id}`,
        method: "POST",
        body: {
          productsId: id,
          cartId: cartId,
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
