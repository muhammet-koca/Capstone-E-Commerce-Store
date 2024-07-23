import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => "/store",
    }),
    getProductById: builder.query({
      query: (id) => `/store/product/${id}`,
    }),
  }),
  overrideExisting: false,
});

const homeSlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {},
});

export default homeSlice.reducer;

export const { useGetProductQuery, useGetProductByIdQuery } = productsApi;
