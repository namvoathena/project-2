import {
  GetQueryProduct,
  GetResultProduct,
  Product,
} from "@models/product.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ** Axios Imports
import { getSingleProduct } from "api/product";

// ** Fetch Product:
export const fetchProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (params: GetQueryProduct) => {
    const response = await getSingleProduct(params);
    return response;
  }
);

interface ProductSingleState {
  data: Product;
  query: GetQueryProduct;
}

const initialState: ProductSingleState = {
  data: null,
  query: null,
};

export const ProductSingleSlice = createSlice({
  name: "product-single",
  initialState: initialState,
  reducers: {
    updateQueryProductSingle: (
      state,
      action: PayloadAction<GetQueryProduct>
    ) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductSingle.fulfilled,
      (state, action: PayloadAction<GetResultProduct>) => {
        if (action.payload && action.payload.status_code == 200) {
          state.data = action.payload.data;
        }
      }
    );
  },
});

export const { updateQueryProductSingle } = ProductSingleSlice.actions;

export default ProductSingleSlice.reducer;
