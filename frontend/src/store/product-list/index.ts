import {
  GetQueryProductList,
  GetResultProductList,
  ProductPagination,
  ProductList,
} from "@models/product.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ** Axios Imports
import { getListProduct } from "api/product";

// ** Fetch Product List:
export const fetchProductList = createAsyncThunk(
  "product-list/fetch",
  async (params: GetQueryProductList) => {
    const response: GetResultProductList = await getListProduct(params);
    return response;
  }
);

export interface ProductListState {
  data: Array<ProductList>;
  pagination: ProductPagination;
  query: GetQueryProductList;
}

const initialState: ProductListState = {
  data: [],
  pagination: {
    current_page: 1,
    last_page: 1,
    limit: 9,
    total: 0,
  },
  query: {
    page: 1,
    limit: 9,
  },
};

export const ProductListSlice = createSlice({
  name: "product-list",
  initialState: initialState,
  reducers: {
    updateQueryProductList: (
      state,
      action: PayloadAction<GetQueryProductList>
    ) => {
      state.query = action.payload;
    },
    updateProductList: (state, action) => {
      state.query = action.payload.query;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductList.fulfilled,
      (state, action: PayloadAction<GetResultProductList>) => {
        if (action.payload && action.payload.status_code == 200) {
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      }
    );
  },
});

export const { updateQueryProductList, updateProductList } =
  ProductListSlice.actions;

export default ProductListSlice.reducer;
