import {
  GetResultProductFilterOptions,
  ProductFilterOptions,
} from "@models/product.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ** Axios Imports
import { getAllProductFilterOptions } from "api/product";

// ** Fetch Product List:
export const fetchProductFilterOptions = createAsyncThunk(
  "product-filter/fetch",
  async (callback: (value?: any) => void) => {
    console.log("Fetch Product Filter");
    const response: GetResultProductFilterOptions =
      await getAllProductFilterOptions();
    callback();
    console.log(response);
    return response;
  }
);

export interface ProductFilterState {
  data: ProductFilterOptions;
}

const initialState: ProductFilterState = {
  data: null,
};

export const ProductFilterSlice = createSlice({
  name: "product-filter",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchProductFilterOptions.fulfilled,
      (state, action: PayloadAction<GetResultProductFilterOptions>) => {
        if (action.payload && action.payload.status_code == 200) {
          state.data = action.payload.data;
        }
      }
    );
  },
});

export default ProductFilterSlice.reducer;
