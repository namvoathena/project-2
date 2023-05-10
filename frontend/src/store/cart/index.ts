import Cart from "@models/cart.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  data: Cart;
}

const initialState: CartState = {
  data: {
    userId: "",
    name: "",
    phone: "",
    email: "",
    totalPrice: 0,
    discount: 0,
    unitPrice: "VND",
    payment_method: "cod",
    shippingAddress: "",
    createdAt: "",
    status: "Pending",
    items: [],
  },
};

export const CartSlice = createSlice({
  name: "cart",
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
