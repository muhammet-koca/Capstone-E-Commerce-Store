import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

// const token = useSelector((state) => state.register.token || state.login.token);
// const sessionToken = window.sessionStorage.getItem("Token");

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: "/store",
        method: "GET",
        // responseHandler: (response) => response.text(),
      }),
      //   providesTags: ["User"],
    }),

    getProductById: builder.query({
      query: ({ id }) => ({
        url: `/store/product/${id}`,
        method: "GET",
        // responseHandler: (response) => response.text(),
      }),
      //   providesTags: ["User"],
    }),
  }),
});

const homeSlice = createSlice({
  name: "products",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getProduct.matchFulfilled,
      (state, { payload }) => {
        return JSON.parse(payload);
      }
    );
  },
});

export default homeSlice.reducer;

export const { useGetProductQuery, useGetProductByIdQuery } = productsApi;
