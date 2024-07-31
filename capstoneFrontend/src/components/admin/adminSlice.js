import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    product: builder.mutation({
      query: (credentials) => ({
        url: "/store/product",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/store/product/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/store/deleteuser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, form }) => ({
        url: `/store/updateProduct/${id}`,
        method: "PUT",
        body: {
          productName: form.productName,
          image: form.image,
          price: form.price,
          publish: form.publish,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    promoteUser: builder.mutation({
      query: ({ id, form }) => ({
        url: `/store/update/user/${id}`,
        method: "PUT",
        body: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          isAdmin: form.isAdmin,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    //get all users
    getAllUsers: builder.query({
      query: () => "/store/users",
    }),
  }),
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    users: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.product.matchFulfilled,
      (state, { payload }) => {
        const newProduct = JSON.parse(payload);
        state.products.push(newProduct);
      }
    );
    builder.addMatcher(
      productApi.endpoints.deleteProduct.matchFulfilled,
      (state, { payload }) => {
        const { id } = JSON.parse(payload);
        state.products = state.products.filter((product) => product.id !== id);
      }
    );
    builder.addMatcher(
      productApi.endpoints.updateProduct.matchFulfilled,
      (state, { payload }) => {
        const updatedProduct = JSON.parse(payload);
        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      }
    );
    builder.addMatcher(
      productApi.endpoints.promoteUser.matchFulfilled,
      (state, { payload }) => {
        const updatedUser = JSON.parse(payload);
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );

        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      }
    );
    builder.addMatcher(
      productApi.endpoints.deleteUser.matchFulfilled,
      (state, { payload }) => {
        const { id } = JSON.parse(payload);
        state.users = state.users.filter((user) => user.id !== id);
      }
    );
  },
});

export default adminSlice.reducer;

export const {
  useProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  usePromoteUserMutation,
} = productApi;
export const { addProduct, removeProduct, updateProduct } = adminSlice.actions;
