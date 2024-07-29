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

    // update user
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
  }),
});

// const adminSlice = createSlice({
//   name: "product",
//   initialState: {
//     user: {},
//     token: null,
//   },
//   reducers: {
//     setCart: (state, action) => {
//       state.cart = action.payload;
//     },
//     setUser: (state, action) => {
//       console.log("Setting user in login:", action.payload);
//       state.user = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder.addMatcher(
//       productApi.endpoints.register.matchFulfilled,
//       (state, { payload }) => {
//         // const temp = JSON.parse(payload);
//         // console.log("Register response", temp);
//         // console.log(temp.cart);
//         // state.token = temp.token;
//         // state.user = temp;
//         // state.id = temp.id;
//         // state.cart = temp.cart;
//         // window.sessionStorage.setItem("Token", temp.token);
//         // window.sessionStorage.setItem("User", temp.id);
//       }
//     );
//   },
// });

// export default adminSlice.reducer;

// export const {
//   useProductMutation,
//   useDeleteProductMutation,
//   useUpdateProductMutation,
// } = productApi;

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
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
  },
});

export default adminSlice.reducer;

export const {
  useProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
export const { addProduct, removeProduct, updateProduct } = adminSlice.actions;
