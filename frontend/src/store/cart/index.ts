import Cart, { CartItem } from "@models/cart.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState extends Cart {}

interface UpdateCartState {
  userId?: string;
  name?: string;
  phone?: string;
  email?: string;
  totalPrice?: number;
  discount?: number;
  unitPrice?: string;
  paymentMethod?: string;
  shippingAddress?: string;
  createdAt?: string;
  status?: "Pending" | "Processing" | "Delivered" | "Cancelled";
}

const initialState: CartState = {
  userId: "",
  name: "",
  phone: "",
  email: "",
  totalPrice: 0,
  discount: 0,
  unitPrice: "VND",
  paymentMethod: "cod",
  shippingAddress: "",
  createdAt: "",
  status: "Pending",
  items: {},
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    resetCart: () => {
      return initialState;
    },
    updateCart: (state, action: PayloadAction<UpdateCartState>) => {
      state = { ...state, ...action.payload };
    },
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const itemId = action.payload.productId;
      if (!state.items[itemId]) {
        state.items[itemId] = action.payload;
        state.totalPrice =
          state.totalPrice +
          state.items[itemId].productPrice *
            state.items[itemId].productQuantity;
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: string; productQuantity: number }>
    ) => {
      const itemId = action.payload.productId;
      if (state.items[itemId]) {
        state.totalPrice -=
          state.items[itemId].productPrice *
          state.items[itemId].productQuantity;
        state.items[itemId].productQuantity = action.payload.productQuantity;
        state.totalPrice +=
          state.items[itemId].productPrice *
          state.items[itemId].productQuantity;
      }
    },
    removeCartItem: (state, action: PayloadAction<{ productId: string }>) => {
      const itemId = action.payload.productId;
      if (state.items[itemId]) {
        state.totalPrice -=
          state.items[itemId].productPrice *
          state.items[itemId].productQuantity;
        delete state.items[itemId];
      }
    },
  },
});

export const {
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  updateCart,
} = CartSlice.actions;

export default CartSlice.reducer;
